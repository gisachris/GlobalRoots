import { supabase } from '../lib/supabase-client';

export class ProjectService {
  async createProject(projectData) {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user?.user?.id) {
      throw new Error('User not authenticated');
    }
    
    const projectToInsert = {
      title: projectData.title,
      description: projectData.description || '',
      type: projectData.type || 'project',
      status: projectData.status || 'draft',
      visibility: projectData.visibility || 'private',
      creator_id: user.user.id,
    };
    
    console.log('Creating project with data:', projectToInsert);
    
    const { data, error } = await supabase
      .from('projects')
      .insert(projectToInsert)
      .select('*')
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    console.log('Project created successfully:', data);
    return data;
  }

  async updateProject(projectId, updates) {
    const { data, error } = await supabase
      .from('projects')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', projectId)
      .select('*')
      .single();

    if (error) throw error;
    return data;
  }

  async getProject(projectId) {
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();

    if (projectError) throw projectError;

    const { data: nodes, error: nodesError } = await supabase
      .from('project_nodes')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at');

    if (nodesError) throw nodesError;

    const { data: connections, error: connectionsError } = await supabase
      .from('project_connections')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at');

    if (connectionsError) throw connectionsError;

    const reactFlowNodes = nodes.map(node => ({
      id: node.node_id,
      type: node.node_type,
      position: node.position,
      data: node.node_data,
      style: node.node_style,
      width: node.width,
      height: node.height
    }));

    const reactFlowEdges = connections.map(conn => ({
      id: conn.edge_id,
      source: conn.source_node,
      target: conn.target_node,
      sourceHandle: conn.source_handle,
      targetHandle: conn.target_handle,
      type: conn.edge_type,
      data: conn.edge_data,
      style: conn.edge_style
    }));

    return {
      ...project,
      nodes: reactFlowNodes,
      edges: reactFlowEdges,
      canvas: project.canvas_data || { viewport: { x: 0, y: 0, zoom: 1 } }
    };
  }

  async getUserProjects(userId, options = {}) {
    const { type = null, status = null, limit = 20, offset = 0, search = null } = options;

    let query = supabase
      .from('projects')
      .select(`
        *,
        project_nodes(node_id, node_data)
      `)
      .eq('creator_id', userId);

    if (type) query = query.eq('type', type);
    if (status) query = query.eq('status', status);
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data, error } = await query
      .order('updated_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    
    // Transform the data to include nodes info
    return data.map(project => ({
      ...project,
      nodes: project.project_nodes || []
    }));
  }

  async saveProjectCanvas(projectId, canvasData) {
    const { nodes, edges, viewport } = canvasData;

    try {
      console.log('Saving canvas data:', { projectId, nodesCount: nodes?.length || 0, edgesCount: edges?.length || 0 });
      
      // Update canvas viewport data
      await supabase
        .from('projects')
        .update({
          canvas_data: { viewport: viewport || { x: 0, y: 0, zoom: 1 }, settings: canvasData.settings || {} }
        })
        .eq('id', projectId);

      // Sync nodes
      if (nodes && nodes.length > 0) {
        await this.syncProjectNodes(projectId, nodes);
      } else {
        await this.clearProjectNodes(projectId);
      }

      // Sync edges
      if (edges && edges.length > 0) {
        await this.syncProjectConnections(projectId, edges);
      } else {
        await this.clearProjectConnections(projectId);
      }

      // Update timestamp
      await supabase
        .from('projects')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', projectId);

      console.log('Canvas data saved successfully');
    } catch (error) {
      console.error('Error saving canvas:', error);
      throw error;
    }
  }

  async syncProjectNodes(projectId, nodes) {
    const nodeIds = nodes.map(n => n.id);
    if (nodeIds.length > 0) {
      await supabase
        .from('project_nodes')
        .delete()
        .eq('project_id', projectId)
        .not('node_id', 'in', `(${nodeIds.map(id => `"${id}"`).join(',')})`);
    }

    const nodeData = nodes.map(node => ({
      project_id: projectId,
      node_id: node.id,
      node_type: node.type || 'default',
      position: node.position,
      node_data: node.data || {},
      node_style: node.style || {},
      width: node.width,
      height: node.height
    }));

    const { error } = await supabase
      .from('project_nodes')
      .upsert(nodeData, {
        onConflict: 'project_id,node_id',
        ignoreDuplicates: false
      });

    if (error) throw error;
  }

  async syncProjectConnections(projectId, edges) {
    const edgeIds = edges.map(e => e.id);
    if (edgeIds.length > 0) {
      await supabase
        .from('project_connections')
        .delete()
        .eq('project_id', projectId)
        .not('edge_id', 'in', `(${edgeIds.map(id => `"${id}"`).join(',')})`);
    }

    const edgeData = edges.map(edge => ({
      project_id: projectId,
      edge_id: edge.id,
      source_node: edge.source,
      target_node: edge.target,
      source_handle: edge.sourceHandle,
      target_handle: edge.targetHandle,
      edge_type: edge.type || 'default',
      edge_data: edge.data || {},
      edge_style: edge.style || {}
    }));

    const { error } = await supabase
      .from('project_connections')
      .upsert(edgeData, {
        onConflict: 'project_id,edge_id',
        ignoreDuplicates: false
      });

    if (error) throw error;
  }

  async getPublicProjects(options = {}) {
    const { type = null, search = null, limit = 20, offset = 0, orderBy = 'created_at' } = options;

    let query = supabase
      .from('projects')
      .select('*')
      .eq('visibility', 'public')
      .eq('status', 'published');

    if (type) query = query.eq('type', type);
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data, error } = await query
      .order(orderBy, { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  }

  async getRisingInnovations(limit = 10) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('type', 'innovation')
      .eq('visibility', 'public')
      .eq('status', 'published')
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      .order('star_count', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }

  async toggleProjectStar(projectId, userId) {
    const { data: existing } = await supabase
      .from('project_stars')
      .select('id')
      .eq('project_id', projectId)
      .eq('user_id', userId)
      .single();

    if (existing) {
      await supabase
        .from('project_stars')
        .delete()
        .eq('project_id', projectId)
        .eq('user_id', userId);

      await supabase.rpc('decrement_star_count', { project_id: projectId });
      return false;
    } else {
      await supabase
        .from('project_stars')
        .insert({ project_id: projectId, user_id: userId });

      await supabase.rpc('increment_star_count', { project_id: projectId });
      return true;
    }
  }

  async incrementViewCount(projectId) {
    await supabase.rpc('increment_view_count', { project_id: projectId });
  }

  async clearProjectNodes(projectId) {
    await supabase
      .from('project_nodes')
      .delete()
      .eq('project_id', projectId);
  }

  async clearProjectConnections(projectId) {
    await supabase
      .from('project_connections')
      .delete()
      .eq('project_id', projectId);
  }
}

export const projectService = new ProjectService();