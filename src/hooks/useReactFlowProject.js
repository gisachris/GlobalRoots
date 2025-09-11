import { useState, useCallback, useEffect, useRef } from 'react';
import { applyNodeChanges, applyEdgeChanges, addEdge } from 'reactflow';
import { useProjects } from '../context/ProjectsContext';

export const useReactFlowProject = (projectId) => {
  const { currentProject, saveProjectCanvas } = useProjects();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [viewport, setViewport] = useState({ x: 0, y: 0, zoom: 1 });
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const autoSaveTimeoutRef = useRef(null);

  useEffect(() => {
    if (currentProject && currentProject.id === projectId) {
      setNodes(currentProject.nodes || []);
      setEdges(currentProject.edges || []);
      setViewport(currentProject.canvas?.viewport || { x: 0, y: 0, zoom: 1 });
    }
  }, [currentProject, projectId]);

  const triggerAutoSave = useCallback(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    autoSaveTimeoutRef.current = setTimeout(async () => {
      if (projectId && nodes.length >= 0 && edges.length >= 0) {
        try {
          setIsAutoSaving(true);
          await saveProjectCanvas(projectId, {
            nodes,
            edges,
            viewport,
            settings: {}
          });
        } catch (error) {
          console.error('Auto-save failed:', error);
        } finally {
          setIsAutoSaving(false);
        }
      }
    }, 2000);
  }, [projectId, nodes, edges, viewport, saveProjectCanvas]);

  const onNodesChange = useCallback((changes) => {
    setNodes(prev => {
      const updated = applyNodeChanges(changes, prev);
      triggerAutoSave();
      return updated;
    });
  }, [triggerAutoSave]);

  const onEdgesChange = useCallback((changes) => {
    setEdges(prev => {
      const updated = applyEdgeChanges(changes, prev);
      triggerAutoSave();
      return updated;
    });
  }, [triggerAutoSave]);

  const onConnect = useCallback((connection) => {
    setEdges(prev => {
      const updated = addEdge(connection, prev);
      triggerAutoSave();
      return updated;
    });
  }, [triggerAutoSave]);

  const onViewportChange = useCallback((newViewport) => {
    setViewport(newViewport);
    triggerAutoSave();
  }, [triggerAutoSave]);

  const manualSave = useCallback(async () => {
    if (projectId) {
      try {
        setIsAutoSaving(true);
        await saveProjectCanvas(projectId, {
          nodes,
          edges,
          viewport,
          settings: {}
        });
        return true;
      } catch (error) {
        console.error('Manual save failed:', error);
        return false;
      } finally {
        setIsAutoSaving(false);
      }
    }
  }, [projectId, nodes, edges, viewport, saveProjectCanvas]);

  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, []);

  return {
    nodes,
    edges,
    viewport,
    isAutoSaving,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onViewportChange,
    manualSave,
    setNodes,
    setEdges
  };
};