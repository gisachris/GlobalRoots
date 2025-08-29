import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BriefcaseIcon, MapPinIcon, ClockIcon, DollarSignIcon, CheckIcon } from 'lucide-react';

export const PostJobPage = () => {
  const [jobType, setJobType] = useState('job');
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'full-time',
    salary: '',
    description: '',
    requirements: ''
  });

  return (
    <div className="min-h-screen bg-[#F5F5F0]/50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-[#503314] dark:text-white">Post Job Opportunity</h1>
          <p className="text-[#7C2D12] dark:text-gray-300">
            Share job opportunities with Rwanda's tech talent community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#503314] dark:text-white">Job Details</CardTitle>
                <CardDescription>Provide information about the position</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#503314] dark:text-white">Opportunity Type</label>
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-md ${
                          jobType === 'job' ? 'bg-[#B45309] text-white' : 'bg-gray-200 dark:bg-gray-700 text-[#503314] dark:text-gray-300'
                        }`}
                        onClick={() => setJobType('job')}
                      >
                        Full-time Job
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-md ${
                          jobType === 'internship' ? 'bg-[#B45309] text-white' : 'bg-gray-200 dark:bg-gray-700 text-[#503314] dark:text-gray-300'
                        }`}
                        onClick={() => setJobType('internship')}
                      >
                        Internship
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#503314] dark:text-white">Job Title</label>
                      <input
                        type="text"
                        className="input w-full"
                        placeholder="e.g. Senior Frontend Developer"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#503314] dark:text-white">Company</label>
                      <input
                        type="text"
                        className="input w-full"
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-[#503314] dark:text-white">Job Description</label>
                    <textarea
                      className="input w-full h-32"
                      placeholder="Describe the role and responsibilities..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button variant="outline">Save as Draft</Button>
                    <Button variant="primary" className="bg-[#B45309] hover:bg-[#92400E]">
                      Post Job
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-[#503314] dark:text-white">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-[#503314] dark:text-white">
                    {formData.title || 'Job Title'}
                  </h3>
                  <p className="text-[#B45309]">{formData.company || 'Company Name'}</p>
                  <div className="flex items-center text-sm text-[#7C2D12] dark:text-gray-300">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {formData.location || 'Location'}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};