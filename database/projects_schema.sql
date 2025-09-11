-- Projects Database Schema
-- Main projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL CHECK (length(title) >= 3 AND length(title) <= 200),
  description TEXT CHECK (length(description) <= 5000),
  type TEXT DEFAULT 'project' CHECK (type IN ('project', 'innovation')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  visibility TEXT DEFAULT 'private' CHECK (visibility IN ('private', 'public')),
  star_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  canvas_data JSONB DEFAULT '{"viewport": {"x": 0, "y": 0, "zoom": 1}, "settings": {}}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project nodes (React Flow nodes)
CREATE TABLE project_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  node_id TEXT NOT NULL,
  node_type TEXT NOT NULL DEFAULT 'default',
  position JSONB NOT NULL DEFAULT '{"x": 0, "y": 0}',
  node_data JSONB NOT NULL DEFAULT '{}',
  node_style JSONB DEFAULT '{}',
  width NUMERIC,
  height NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, node_id)
);

-- Project connections (React Flow edges)
CREATE TABLE project_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  edge_id TEXT NOT NULL,
  source_node TEXT NOT NULL,
  target_node TEXT NOT NULL,
  source_handle TEXT,
  target_handle TEXT,
  edge_type TEXT DEFAULT 'default',
  edge_data JSONB DEFAULT '{}',
  edge_style JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, edge_id)
);

-- Project stars (for innovations)
CREATE TABLE project_stars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);

-- Indexes for performance
CREATE INDEX idx_projects_creator_id ON projects(creator_id);
CREATE INDEX idx_projects_type ON projects(type);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_visibility ON projects(visibility);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_project_nodes_project_id ON project_nodes(project_id);
CREATE INDEX idx_project_connections_project_id ON project_connections(project_id);
CREATE INDEX idx_project_stars_project_id ON project_stars(project_id);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_project_nodes_updated_at BEFORE UPDATE ON project_nodes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_project_connections_updated_at BEFORE UPDATE ON project_connections 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_stars ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Users can view their own projects" ON projects
  FOR SELECT USING (creator_id = auth.uid());

CREATE POLICY "Users can view public projects" ON projects
  FOR SELECT USING (visibility = 'public' AND status = 'published');

CREATE POLICY "Users can create projects" ON projects
  FOR INSERT WITH CHECK (creator_id = auth.uid());

CREATE POLICY "Users can update their own projects" ON projects
  FOR UPDATE USING (creator_id = auth.uid());

CREATE POLICY "Users can delete their own projects" ON projects
  FOR DELETE USING (creator_id = auth.uid());

-- Project nodes policies
CREATE POLICY "Users can manage nodes in their projects" ON project_nodes
  FOR ALL USING (
    project_id IN (
      SELECT id FROM projects WHERE creator_id = auth.uid()
    )
  );

CREATE POLICY "Users can view nodes in accessible projects" ON project_nodes
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects 
      WHERE creator_id = auth.uid() 
         OR (visibility = 'public' AND status = 'published')
    )
  );

-- Project connections policies
CREATE POLICY "Users can manage connections in their projects" ON project_connections
  FOR ALL USING (
    project_id IN (
      SELECT id FROM projects WHERE creator_id = auth.uid()
    )
  );

CREATE POLICY "Users can view connections in accessible projects" ON project_connections
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects 
      WHERE creator_id = auth.uid() 
         OR (visibility = 'public' AND status = 'published')
    )
  );

-- Project stars policies
CREATE POLICY "Users can manage their own stars" ON project_stars
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can view all stars" ON project_stars
  FOR SELECT USING (true);

-- Database functions
CREATE OR REPLACE FUNCTION increment_star_count(project_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE projects 
    SET star_count = star_count + 1 
    WHERE id = project_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION decrement_star_count(project_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE projects 
    SET star_count = GREATEST(star_count - 1, 0)
    WHERE id = project_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_view_count(project_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE projects 
    SET view_count = view_count + 1 
    WHERE id = project_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;