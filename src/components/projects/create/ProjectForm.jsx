import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { SaveIcon, EyeIcon, PlusIcon, XIcon } from 'lucide-react';
import { useProjects } from '../../../context/ProjectsContext';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const ProjectForm = ({ userRole }) => {
  const { createProject, loading } = useProjects();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: user?.role === 'mentor' ? 'project' : 'innovation',
    visibility: 'private',
    status: 'draft',
    technologies: [],
    teamSize: 1,
    maxTeamSize: 5,
    deadline: '',
    requirements: '',
    category: '',
    isPublic: false
  });

  const [errors, setErrors] = useState({});
  const [isPreview, setIsPreview] = useState(false);
  const [newTech, setNewTech] = useState('');

  const categories = [
    'Web Development',
    'Mobile Development',
    'AI/Machine Learning',
    'IoT',
    'Healthcare',
    'Education',
    'Agriculture',
    'E-commerce',
    'Green Tech',
    'Other'
  ];

  const handleInputChange = (field, value) => {
    if (typeof field === 'object') {
      // Handle event objects
      const { name, value: inputValue, type, checked } = field.target;
      const finalValue = type === 'checkbox' ? checked : inputValue;
      setFormData(prev => ({ ...prev, [name]: finalValue }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: null }));
      }
    } else {
      // Handle direct field/value pairs
      setFormData(prev => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: null }));
      }
    }
  };

  const addTechnology = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()]
      }));
      setNewTech('');
    }
  };

  const removeTechnology = (tech) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const projectData = {
        ...formData,
        status: 'published'
      };
      const project = await createProject(projectData);
      console.log('Project created successfully:', project);
      // Navigate back to projects list after successful creation
      const projectsPath = user?.role === 'mentor' ? '/mentor/projects' : '/projects';
      navigate(projectsPath);
    } catch (error) {
      console.error('Failed to create project:', error);
      alert('Failed to create project. Please try again.');
    }
  };

  const handleSaveDraft = async () => {
    try {
      const draftData = { ...formData, status: 'draft' };
      const project = await createProject(draftData);
      console.log('Draft saved successfully:', project);
      // Navigate back to projects list after successful save
      const projectsPath = user?.role === 'mentor' ? '/mentor/projects' : '/projects';
      navigate(projectsPath);
    } catch (error) {
      console.error('Failed to save draft:', error);
      alert('Failed to save draft. Please try again.');
    }
  };

  const entityType = userRole === 'mentor' ? 'Project' : 'Innovation';

  if (isPreview) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#503314] dark:text-white">Preview {entityType}</h2>
          <Button variant="outline" onClick={() => setIsPreview(false)}>
            <XIcon className="h-4 w-4 mr-2" />
            Back to Edit
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{formData.title || `Untitled ${entityType}`}</CardTitle>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {formData.status}
                </span>
                {formData.isPublic && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                    Public
                  </span>
                )}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {formData.description || 'No description provided'}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Category</h4>
                <p className="text-sm text-gray-600">{formData.category || 'Not specified'}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Team Size</h4>
                <p className="text-sm text-gray-600">{formData.teamSize}/{formData.maxTeamSize} members</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Deadline</h4>
                <p className="text-sm text-gray-600">{formData.deadline || 'Not set'}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-1">
                  {(formData.technologies || []).map(tech => (
                    <span key={tech} className="px-2 py-1 bg-[#B45309]/10 text-[#B45309] text-xs rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {formData.requirements && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Requirements</h4>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{formData.requirements}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#503314] dark:text-white mb-2">
          Create New {entityType}
        </h2>
        <p className="text-[#7C2D12] dark:text-gray-300">
          {userRole === 'mentor' 
            ? 'Set up a new project for your mentees to collaborate on'
            : 'Share your innovative idea with the community'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {entityType} Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#B45309] focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-[#B45309]/20'
                }`}
                placeholder={`Enter ${entityType.toLowerCase()} title`}
                maxLength={200}
              />
              {errors.title && <span className="text-red-500 text-sm mt-1">{errors.title}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#B45309] focus:border-transparent ${
                  errors.description ? 'border-red-500' : 'border-[#B45309]/20'
                }`}
                placeholder={`Describe your ${entityType.toLowerCase()}`}
                maxLength={5000}
              />
              {errors.description && <span className="text-red-500 text-sm mt-1">{errors.description}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Visibility</label>
                <select
                  value={formData.visibility}
                  onChange={(e) => handleInputChange('visibility', e.target.value)}
                  className="w-full px-3 py-2 border border-[#B45309]/20 rounded-md focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                >
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-[#B45309]/20 rounded-md focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team & Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Current Team Size</label>
                <input
                  type="number"
                  name="teamSize"
                  value={formData.teamSize || 1}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 border border-[#B45309]/20 rounded-md focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Max Team Size</label>
                <input
                  type="number"
                  name="maxTeamSize"
                  value={formData.maxTeamSize || 5}
                  onChange={handleInputChange}
                  min={formData.teamSize || 1}
                  className="w-full px-3 py-2 border border-[#B45309]/20 rounded-md focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#B45309]/20 rounded-md focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technologies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                placeholder="Add technology"
                className="flex-1 px-3 py-2 border border-[#B45309]/20 rounded-md focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
              />
              <Button type="button" onClick={addTechnology} variant="outline">
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {(formData.technologies || []).map(tech => (
                <span
                  key={tech}
                  className="inline-flex items-center px-3 py-1 bg-[#B45309]/10 text-[#B45309] rounded-full text-sm"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(tech)}
                    className="ml-2 text-[#B45309] hover:text-[#92400E]"
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Requirements & Skills Needed</label>
              <textarea
                name="requirements"
                value={formData.requirements || ''}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-[#B45309]/20 rounded-md focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                placeholder="Describe the skills and requirements for team members"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isPublic"
                checked={formData.isPublic || false}
                onChange={handleInputChange}
                className="h-4 w-4 text-[#B45309] focus:ring-[#B45309] border-gray-300 rounded"
              />
              <label className="ml-2 text-sm">
                Make this {entityType.toLowerCase()} public (visible to all users)
              </label>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              const projectsPath = user?.role === 'mentor' ? '/mentor/projects' : '/projects';
              navigate(projectsPath);
            }}
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleSaveDraft}
            disabled={loading}
            className="flex items-center"
          >
            <SaveIcon className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button type="submit" variant="primary" className="flex items-center" disabled={loading}>
            <SaveIcon className="h-4 w-4 mr-2" />
            {loading ? 'Creating...' : `Publish ${entityType}`}
          </Button>
          <Button type="button" variant="outline" onClick={() => setIsPreview(true)}>
            <EyeIcon className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </form>
    </div>
  );
};