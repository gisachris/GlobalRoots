import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { BookOpen, Upload, FileText, Video, Link, Download, Eye, Trash2, Plus } from 'lucide-react';

export const MentorResources: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const resources = [
    {
      id: 1,
      title: 'React Fundamentals Guide',
      type: 'document',
      format: 'PDF',
      size: '2.4 MB',
      uploadDate: '2024-12-10',
      downloads: 45,
      circles: ['Frontend Development Mastery'],
      isPublic: true,
      url: '#'
    },
    {
      id: 2,
      title: 'JavaScript Interview Questions',
      type: 'document',
      format: 'DOCX',
      size: '1.8 MB',
      uploadDate: '2024-12-08',
      downloads: 32,
      circles: ['Frontend Development Mastery', 'Career Transition Bootcamp'],
      isPublic: false,
      url: '#'
    },
    {
      id: 3,
      title: 'Building Your First React App',
      type: 'video',
      format: 'MP4',
      size: '156 MB',
      uploadDate: '2024-12-05',
      downloads: 28,
      circles: ['Frontend Development Mastery'],
      isPublic: true,
      url: '#'
    },
    {
      id: 4,
      title: 'Useful Development Tools',
      type: 'link',
      format: 'URL',
      size: '-',
      uploadDate: '2024-12-03',
      downloads: 67,
      circles: ['All Circles'],
      isPublic: true,
      url: 'https://example.com'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'link':
        return <Link className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const filteredResources = resources.filter(resource => {
    if (activeTab === 'all') return true;
    return resource.type === activeTab;
  });

  return (
    <div className="px-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#503314] dark:text-white">Resources</h1>
          <p className="text-[#7C2D12] dark:text-gray-300">Manage learning materials and resources</p>
        </div>
        <Button className="bg-[#B45309] hover:bg-[#7C2D12]">
          <Plus className="h-4 w-4 mr-2" />
          Upload Resource
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {[
          { id: 'all', label: 'All Resources' },
          { id: 'document', label: 'Documents' },
          { id: 'video', label: 'Videos' },
          { id: 'link', label: 'Links' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 text-[#B45309] shadow-sm'
                : 'text-[#7C2D12] dark:text-gray-300 hover:text-[#B45309]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Upload Area */}
      <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600">
        <CardContent className="p-8 text-center">
          <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-[#503314] dark:text-white mb-2">
            Upload New Resource
          </h3>
          <p className="text-[#7C2D12] dark:text-gray-300 mb-4">
            Drag and drop files here, or click to browse
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="border-[#B45309] text-[#B45309]">
              <FileText className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
            <Button variant="outline" className="border-[#B45309] text-[#B45309]">
              <Video className="h-4 w-4 mr-2" />
              Upload Video
            </Button>
            <Button variant="outline" className="border-[#B45309] text-[#B45309]">
              <Link className="h-4 w-4 mr-2" />
              Add Link
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resources List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredResources.map(resource => (
          <Card key={resource.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="p-3 bg-[#B45309]/10 rounded-lg text-[#B45309]">
                    {getIcon(resource.type)}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#503314] dark:text-white mb-1">
                      {resource.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-[#7C2D12] dark:text-gray-300 mb-2">
                      <span>{resource.format}</span>
                      {resource.size !== '-' && <span>{resource.size}</span>}
                      <span>Uploaded {resource.uploadDate}</span>
                      <span>{resource.downloads} downloads</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm text-[#7C2D12] dark:text-gray-300">Used in:</span>
                      {resource.circles.map((circle, index) => (
                        <span key={index} className="px-2 py-1 bg-[#B45309]/10 text-[#B45309] text-xs rounded">
                          {circle}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        resource.isPublic 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {resource.isPublic ? 'Public' : 'Private'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" className="border-[#B45309] text-[#B45309]">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-[#B45309] text-[#B45309]">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-500 text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};