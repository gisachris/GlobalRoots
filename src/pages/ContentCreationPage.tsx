import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BookOpenIcon, FileTextIcon, VideoIcon, UploadIcon, TagIcon, EyeIcon } from 'lucide-react';

export const ContentCreationPage = () => {
  const [contentType, setContentType] = useState('article');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    tags: [],
    difficulty: 'beginner',
    estimatedTime: ''
  });

  return (
    <div className="min-h-screen bg-[#F5F5F0]/50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-[#503314] dark:text-white">Create Learning Content</h1>
          <p className="text-[#7C2D12] dark:text-gray-300">
            Share your knowledge with the community through articles, videos, and guides
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#503314] dark:text-white">Content Details</CardTitle>
                <CardDescription>Create educational content for the community</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#503314] dark:text-white">Content Type</label>
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-md flex items-center ${
                          contentType === 'article' ? 'bg-[#B45309] text-white' : 'bg-gray-200 dark:bg-gray-700 text-[#503314] dark:text-gray-300'
                        }`}
                        onClick={() => setContentType('article')}
                      >
                        <FileTextIcon className="h-4 w-4 mr-2" />
                        Article
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-md flex items-center ${
                          contentType === 'video' ? 'bg-[#B45309] text-white' : 'bg-gray-200 dark:bg-gray-700 text-[#503314] dark:text-gray-300'
                        }`}
                        onClick={() => setContentType('video')}
                      >
                        <VideoIcon className="h-4 w-4 mr-2" />
                        Video
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-md flex items-center ${
                          contentType === 'guide' ? 'bg-[#B45309] text-white' : 'bg-gray-200 dark:bg-gray-700 text-[#503314] dark:text-gray-300'
                        }`}
                        onClick={() => setContentType('guide')}
                      >
                        <BookOpenIcon className="h-4 w-4 mr-2" />
                        Guide
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-[#503314] dark:text-white">Title</label>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="Enter a descriptive title for your content"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-[#503314] dark:text-white">Description</label>
                    <textarea
                      className="input w-full h-24"
                      placeholder="Brief description of what learners will gain from this content"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>

                  {contentType === 'article' || contentType === 'guide' ? (
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#503314] dark:text-white">Content</label>
                      <textarea
                        className="input w-full h-64"
                        placeholder="Write your content here. You can use markdown formatting."
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#503314] dark:text-white">Video Upload</label>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                        <UploadIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 mb-2">Drag and drop your video file here</p>
                        <Button variant="outline">Choose File</Button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#503314] dark:text-white">Difficulty Level</label>
                      <select
                        className="input w-full"
                        value={formData.difficulty}
                        onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#503314] dark:text-white">Estimated Time</label>
                      <input
                        type="text"
                        className="input w-full"
                        placeholder="e.g. 15 minutes"
                        value={formData.estimatedTime}
                        onChange={(e) => setFormData({...formData, estimatedTime: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-[#503314] dark:text-white">Tags</label>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="Add tags separated by commas (e.g. React, JavaScript, Frontend)"
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button variant="outline">
                      <EyeIcon className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline">Save as Draft</Button>
                    <Button variant="primary" className="bg-[#B45309] hover:bg-[#92400E]">
                      Publish
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#503314] dark:text-white">Publishing Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <TagIcon className="h-4 w-4 text-[#B45309] mr-2 mt-0.5" />
                    <span className="text-[#503314] dark:text-gray-300">Use clear, descriptive titles</span>
                  </div>
                  <div className="flex items-start">
                    <TagIcon className="h-4 w-4 text-[#B45309] mr-2 mt-0.5" />
                    <span className="text-[#503314] dark:text-gray-300">Include practical examples</span>
                  </div>
                  <div className="flex items-start">
                    <TagIcon className="h-4 w-4 text-[#B45309] mr-2 mt-0.5" />
                    <span className="text-[#503314] dark:text-gray-300">Add relevant tags for discoverability</span>
                  </div>
                  <div className="flex items-start">
                    <TagIcon className="h-4 w-4 text-[#B45309] mr-2 mt-0.5" />
                    <span className="text-[#503314] dark:text-gray-300">Set appropriate difficulty level</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#503314] dark:text-white">Content Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-[#503314] dark:text-gray-300">
                  <p>• Keep content focused and actionable</p>
                  <p>• Include step-by-step instructions</p>
                  <p>• Provide code examples when applicable</p>
                  <p>• Respect intellectual property</p>
                  <p>• Use inclusive language</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};