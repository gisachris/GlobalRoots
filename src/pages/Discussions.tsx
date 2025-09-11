import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { 
  MessageSquare, 
  ThumbsUp, 
  Send, 
  Search,
  Filter,
  Plus,
  Clock,
} from 'lucide-react';

export const Discussions = () => {
  const { user } = useAuth();
  const [selectedDiscussion, setSelectedDiscussion] = useState<any>(null);
  const [newComment, setNewComment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock discussions data
  const discussions = [
    {
      id: 1,
      title: 'Best resources for learning React in Rwanda?',
      content: "I'm looking for Rwanda-specific resources for learning React. Any recommendations for local bootcamps or mentors? I've been self-learning but would love some structured guidance.",
      author: 'John Mugabo',
      authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      circle: 'Rwanda Web Developers',
      createdAt: '2 hours ago',
      replies: 12,
      likes: 8,
      comments: [
        {
          id: 1,
          author: 'Sarah Uwimana',
          authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
          content: 'I recommend checking out the coding bootcamp at Carnegie Mellon University Africa. They have excellent React courses.',
          createdAt: '1 hour ago',
          likes: 3
        },
        {
          id: 2,
          author: 'David Nkusi',
          authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
          content: 'Also, join the local React meetups. They happen monthly at Impact Hub Kigali.',
          createdAt: '45 minutes ago',
          likes: 2
        }
      ]
    },
    {
      id: 2,
      title: 'Relocating back to Kigali - housing advice needed',
      content: "After 5 years abroad, I'm moving back to Kigali next month. Any tips on finding tech-friendly housing? Looking for areas with good internet and close to tech hubs.",
      author: 'John Rwema',
      authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      circle: 'Diaspora Returnees',
      createdAt: '4 hours ago',
      replies: 8,
      likes: 5,
      comments: [
        {
          id: 1,
          author: 'Marie Mukamana',
          authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
          content: 'Kimihurura and Remera are great areas. Close to tech companies and excellent fiber internet.',
          createdAt: '3 hours ago',
          likes: 4
        }
      ]
    },
    {
      id: 3,
      title: 'Mentorship opportunities for junior developers',
      content: 'Are there any structured mentorship programs for junior devs in Rwanda? Especially interested in backend development guidance.',
      author: 'Grace Nkusi',
      authorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
      circle: 'Women in Tech Rwanda',
      createdAt: '1 day ago',
      replies: 15,
      likes: 12,
      comments: []
    }
  ];

  const filteredDiscussions = discussions.filter(discussion =>
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.circle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddComment = () => {
    if (newComment.trim() && selectedDiscussion) {
      const comment = {
        id: Date.now(),
        author: user?.name || 'Current User',
        authorImage: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=40&h=40&fit=crop&crop=face',
        content: newComment,
        createdAt: 'Just now',
        likes: 0
      };
      
      selectedDiscussion.comments.push(comment);
      selectedDiscussion.replies += 1;
      setNewComment('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#503314] dark:text-white mb-2">
            Community Discussions
          </h1>
          <p className="text-[#7C2D12] dark:text-gray-300">
            Join conversations, share knowledge, and connect with the community
          </p>
        </div>

        {/* Search and Actions */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search discussions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#B45309]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B45309]/20"
            />
          </div>
          <Button variant="outline" className="border-[#B45309]/20">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          {user?.role==='diaspora'&&<Button className="bg-[#6b350c] hover:bg-[#7C2D12] text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Discussion
          </Button>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Discussions List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredDiscussions.map(discussion => (
              <Card 
                key={discussion.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedDiscussion?.id === discussion.id ? 'ring-2 ring-[#B45309]/20' : ''
                }`}
                onClick={() => setSelectedDiscussion(discussion)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={discussion.authorImage} 
                      alt={discussion.author}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-[#503314] dark:text-white">
                          {discussion.title}
                        </h3>
                        <span className="text-xs px-2 py-1 bg-[#B45309]/10 text-[#B45309] rounded-full">
                          {discussion.circle}
                        </span>
                      </div>
                      
                      <p className="text-[#7C2D12] dark:text-gray-300 text-sm mb-3 line-clamp-2">
                        {discussion.content}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span>By {discussion.author}</span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {discussion.createdAt}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            {discussion.replies}
                          </span>
                          <span className="flex items-center">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {discussion.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Discussion Detail */}
          <div className="lg:col-span-1">
            {selectedDiscussion ? (
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-[#503314] dark:text-white">
                    {selectedDiscussion.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Original Post */}
                  <div className="pb-4 border-b border-[#B45309]/20">
                    <div className="flex items-start space-x-3 mb-3">
                      <img 
                        src={selectedDiscussion.authorImage} 
                        alt={selectedDiscussion.author}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-[#503314] dark:text-white text-sm">
                          {selectedDiscussion.author}
                        </p>
                        <p className="text-xs text-gray-500">{selectedDiscussion.createdAt}</p>
                      </div>
                    </div>
                    <p className="text-[#7C2D12] dark:text-gray-300 text-sm">
                      {selectedDiscussion.content}
                    </p>
                  </div>

                  {/* Comments */}
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {selectedDiscussion.comments.map((comment: any) => (
                      <div key={comment.id} className="flex items-start space-x-3">
                        <img 
                          src={comment.authorImage} 
                          alt={comment.author}
                          className="w-6 h-6 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="font-medium text-[#503314] dark:text-white text-xs">
                              {comment.author}
                            </p>
                            <p className="text-xs text-gray-500">{comment.createdAt}</p>
                          </div>
                          <p className="text-[#7C2D12] dark:text-gray-300 text-xs">
                            {comment.content}
                          </p>
                          <button className="flex items-center text-xs text-gray-500 mt-1 hover:text-[#B45309]">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {comment.likes}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Comment */}
                  <div className="pt-4 border-t border-[#B45309]/20">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1 px-3 py-2 text-sm border border-[#B45309]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B45309]/20"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                      />
                      <Button 
                        size="sm" 
                        onClick={handleAddComment}
                        className="bg-[#B45309] hover:bg-[#7C2D12]"
                      >
                        <Send className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="sticky top-4">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="font-medium text-[#503314] dark:text-white mb-2">
                    Select a Discussion
                  </h3>
                  <p className="text-[#7C2D12] dark:text-gray-300 text-sm">
                    Choose a discussion from the list to read and participate
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};