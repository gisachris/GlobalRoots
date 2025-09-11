import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { projectService } from '../services/projects';

const ProjectsContext = createContext();

const initialState = {
  projects: [],
  currentProject: null,
  publicProjects: [],
  risingInnovations: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    type: null,
    status: null
  }
};

function projectsReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload, loading: false };
    case 'SET_CURRENT_PROJECT':
      return { ...state, currentProject: action.payload, loading: false };
    case 'ADD_PROJECT':
      return { ...state, projects: [action.payload, ...state.projects] };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(p => 
          p.id === action.payload.id ? action.payload : p
        ),
        currentProject: state.currentProject?.id === action.payload.id 
          ? action.payload : state.currentProject
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(p => p.id !== action.payload),
        currentProject: state.currentProject?.id === action.payload 
          ? null : state.currentProject
      };
    case 'SET_PUBLIC_PROJECTS':
      return { ...state, publicProjects: action.payload };
    case 'SET_RISING_INNOVATIONS':
      return { ...state, risingInnovations: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
}

export const ProjectsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectsReducer, initialState);

  const setLoading = useCallback((loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const createProject = useCallback(async (projectData) => {
    try {
      setLoading(true);
      const project = await projectService.createProject(projectData);
      dispatch({ type: 'ADD_PROJECT', payload: project });
      return project;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }, []);

  const updateProject = useCallback(async (projectId, updates) => {
    try {
      const project = await projectService.updateProject(projectId, updates);
      dispatch({ type: 'UPDATE_PROJECT', payload: project });
      return project;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }, []);

  const loadProject = useCallback(async (projectId) => {
    try {
      setLoading(true);
      const project = await projectService.getProject(projectId);
      dispatch({ type: 'SET_CURRENT_PROJECT', payload: project });
      
      await projectService.incrementViewCount(projectId);
      
      return project;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }, []);

  const saveProjectCanvas = useCallback(async (projectId, canvasData) => {
    try {
      await projectService.saveProjectCanvas(projectId, canvasData);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }, []);

  const loadUserProjects = useCallback(async (userId, options = {}) => {
    try {
      setLoading(true);
      const projects = await projectService.getUserProjects(userId, {
        ...state.filters,
        ...options
      });
      dispatch({ type: 'SET_PROJECTS', payload: projects });
      return projects;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }, [state.filters]);

  const loadPublicProjects = useCallback(async (options = {}) => {
    try {
      const projects = await projectService.getPublicProjects(options);
      dispatch({ type: 'SET_PUBLIC_PROJECTS', payload: projects });
      return projects;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }, []);

  const loadRisingInnovations = useCallback(async (limit = 10) => {
    try {
      const innovations = await projectService.getRisingInnovations(limit);
      dispatch({ type: 'SET_RISING_INNOVATIONS', payload: innovations });
      return innovations;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }, []);

  const toggleProjectStar = useCallback(async (projectId, userId) => {
    try {
      const isStarred = await projectService.toggleProjectStar(projectId, userId);
      return isStarred;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }, []);

  const setFilters = useCallback((filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, []);

  const value = {
    ...state,
    createProject,
    updateProject,
    loadProject,
    saveProjectCanvas,
    loadUserProjects,
    loadPublicProjects,
    loadRisingInnovations,
    toggleProjectStar,
    setFilters,
    setError
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within ProjectsProvider');
  }
  return context;
};