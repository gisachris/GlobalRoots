import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Globe, 
  Users, 
  Calendar, 
  Clock, 
  BookOpen, 
  Target,
  Plus,
  X,
  Upload,
  CheckCircle
} from 'lucide-react';

interface CircleFormData {
  title: string;
  description: string;
  category: string;
  maxParticipants: number;
  duration: string;
  schedule: {
    days: string[];
    time: string;
    timezone: string;
  };
  objectives: string[];
  prerequisites: string;
  isPublic: boolean;
  resources: File[];
}

export const CreateCircle: React.FC = () => {
  const [formData, setFormData] = useState<CircleFormData>({
    title: '',
    description: '',
    category: '',
    maxParticipants: 10,
    duration: '8',
    schedule: {
      days: [],
      time: '',
      timezone: 'CAT'
    },
    objectives: [''],
    prerequisites: '',
    isPublic: true,
    resources: []
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);

  const categories = [
    'Web Development',
    'Mobile Development', 
    'Data Science',
    'UI/UX Design',
    'DevOps',
    'Career Development',
    'Entrepreneurship',
    'Product Management'
  ];

  const weekDays = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleScheduleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [field]: value
      }
    }));
  };

  const addObjective = () => {
    setFormData(prev => ({
      ...prev,
      objectives: [...prev.objectives, '']
    }));
  };

  const updateObjective = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.map((obj, i) => i === index ? value : obj)
    }));
  };

  const removeObjective = (index: number) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index)
    }));
  };

  const handleDayToggle = (day: string) => {
    const days = formData.schedule.days.includes(day)
      ? formData.schedule.days.filter(d => d !== day)
      : [...formData.schedule.days, day];
    
    handleScheduleChange('days', days);
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      setFormData(prev => ({
        ...prev,
        resources: [...prev.resources, ...Array.from(files)]
      }));
    }
  };

  const handleCreateCircle = async () => {
    setIsCreating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsCreating(false);
      // Redirect to circle management or show success
    }, 2000);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
          Circle Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
          placeholder="e.g., Frontend Development Mastery"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
          placeholder="Describe what participants will learn and achieve..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
            Max Participants *
          </label>
          <input
            type="number"
            value={formData.maxParticipants}
            onChange={(e) => handleInputChange('maxParticipants', parseInt(e.target.value))}
            min="2"
            max="50"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
          Duration (weeks) *
        </label>
        <select
          value={formData.duration}
          onChange={(e) => handleInputChange('duration', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
        >
          <option value="4">4 weeks</option>
          <option value="6">6 weeks</option>
          <option value="8">8 weeks</option>
          <option value="12">12 weeks</option>
        </select>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-[#503314] dark:text-white mb-3">
          Meeting Days *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {weekDays.map(day => (
            <button
              key={day}
              type="button"
              onClick={() => handleDayToggle(day)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                formData.schedule.days.includes(day)
                  ? 'bg-[#B45309] text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-[#503314] dark:text-white hover:bg-[#B45309]/10'
              }`}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
            Meeting Time *
          </label>
          <input
            type="time"
            value={formData.schedule.time}
            onChange={(e) => handleScheduleChange('time', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
            Timezone
          </label>
          <select
            value={formData.schedule.timezone}
            onChange={(e) => handleScheduleChange('timezone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
          >
            <option value="CAT">CAT (Central Africa Time)</option>
            <option value="EAT">EAT (East Africa Time)</option>
            <option value="UTC">UTC</option>
            <option value="EST">EST (Eastern Standard Time)</option>
            <option value="PST">PST (Pacific Standard Time)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#503314] dark:text-white mb-3">
          Learning Objectives *
        </label>
        <div className="space-y-3">
          {formData.objectives.map((objective, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={objective}
                onChange={(e) => updateObjective(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                placeholder="e.g., Master React hooks and state management"
              />
              {formData.objectives.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeObjective(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addObjective}
            className="flex items-center text-[#B45309] hover:text-[#7C2D12] text-sm font-medium"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Objective
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
          Prerequisites
        </label>
        <textarea
          value={formData.prerequisites}
          onChange={(e) => handleInputChange('prerequisites', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
          placeholder="What should participants know before joining? (Optional)"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-[#503314] dark:text-white mb-3">
          Circle Visibility
        </label>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              checked={formData.isPublic}
              onChange={() => handleInputChange('isPublic', true)}
              className="mr-3 text-[#B45309] focus:ring-[#B45309]"
            />
            <div>
              <div className="font-medium text-[#503314] dark:text-white">Public Circle</div>
              <div className="text-sm text-[#7C2D12] dark:text-gray-300">Anyone can discover and request to join</div>
            </div>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={!formData.isPublic}
              onChange={() => handleInputChange('isPublic', false)}
              className="mr-3 text-[#B45309] focus:ring-[#B45309]"
            />
            <div>
              <div className="font-medium text-[#503314] dark:text-white">Private Circle</div>
              <div className="text-sm text-[#7C2D12] dark:text-gray-300">Invitation only</div>
            </div>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#503314] dark:text-white mb-3">
          Upload Resources (Optional)
        </label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-[#7C2D12] dark:text-gray-300 mb-2">
            Upload course materials, slides, or resources
          </p>
          <input
            type="file"
            multiple
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
            id="file-upload"
            accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 bg-[#B45309] text-white rounded-lg hover:bg-[#7C2D12] cursor-pointer"
          >
            <Upload className="h-4 w-4 mr-2" />
            Choose Files
          </label>
        </div>
        {formData.resources.length > 0 && (
          <div className="mt-3 space-y-2">
            {formData.resources.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <span className="text-sm text-[#503314] dark:text-white">{file.name}</span>
                <button
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    resources: prev.resources.filter((_, i) => i !== index)
                  }))}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-[#F5F5F0] dark:bg-gray-800 rounded-lg p-6">
        <h4 className="font-semibold text-[#503314] dark:text-white mb-4">Circle Summary</h4>
        <div className="space-y-2 text-sm">
          <div><strong>Title:</strong> {formData.title || 'Not set'}</div>
          <div><strong>Category:</strong> {formData.category || 'Not set'}</div>
          <div><strong>Duration:</strong> {formData.duration} weeks</div>
          <div><strong>Max Participants:</strong> {formData.maxParticipants}</div>
          <div><strong>Schedule:</strong> {formData.schedule.days.join(', ')} at {formData.schedule.time}</div>
          <div><strong>Objectives:</strong> {formData.objectives.filter(obj => obj.trim()).length} defined</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#503314] dark:text-white mb-2">
          Create New Mentorship Circle
        </h1>
        <p className="text-[#7C2D12] dark:text-gray-300">
          Set up a structured learning environment for your mentees
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step
                  ? 'bg-[#B45309] text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > step ? <CheckCircle className="h-4 w-4" /> : step}
              </div>
              <div className="ml-2 text-sm font-medium text-[#503314] dark:text-white">
                {step === 1 && 'Basic Info'}
                {step === 2 && 'Schedule & Goals'}
                {step === 3 && 'Resources & Review'}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 mx-4 ${
                  currentStep > step ? 'bg-[#B45309]' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2 text-[#B45309]" />
            Step {currentStep}: {
              currentStep === 1 ? 'Basic Information' :
              currentStep === 2 ? 'Schedule & Learning Goals' :
              'Resources & Final Review'
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="border-[#B45309] text-[#B45309]"
            >
              Previous
            </Button>
            
            {currentStep < 3 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="bg-[#B45309] hover:bg-[#7C2D12]"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={handleCreateCircle}
                disabled={isCreating}
                className="bg-[#B45309] hover:bg-[#7C2D12]"
              >
                {isCreating ? 'Creating Circle...' : 'Create Circle'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};