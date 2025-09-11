import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { Button } from './Button';
import { XIcon, UsersIcon, GlobeIcon, SendIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase-client';

export const ShareModal = ({ isOpen, onClose, project, user }) => {
  const [circles, setCircles] = useState([]);
  const [selectedCircles, setSelectedCircles] = useState([]);
  const [shareMessage, setShareMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user?.id) {
      loadUserCircles();
      setShareMessage(`Check out this ${project?.type || 'project'}: ${project?.title || 'Untitled'}`);
    }
  }, [isOpen, user?.id, project]);

  const loadUserCircles = async () => {
    try {
      // Get circles where user is creator
      const { data: createdCircles, error: createdError } = await supabase
        .from('circles')
        .select('id, name, description, member_count')
        .eq('creator_id', user.id);

      if (createdError) throw createdError;

      // Get circles where user is a member
      const { data: memberCircles, error: memberError } = await supabase
        .from('circle_members')
        .select(`
          circle_id,
          circles!inner(
            id,
            name,
            description,
            member_count
          )
        `)
        .eq('user_id', user.id);

      if (memberError) throw memberError;

      // Combine and deduplicate circles
      const allCircles = [...(createdCircles || [])];
      
      if (memberCircles) {
        memberCircles.forEach(member => {
          if (member.circles && !allCircles.find(c => c.id === member.circles.id)) {
            allCircles.push(member.circles);
          }
        });
      }

      console.log('Loaded circles:', allCircles);
      setCircles(allCircles);
    } catch (error) {
      console.error('Failed to load circles:', error);
      setCircles([]);
    }
  };

  const handleCircleToggle = (circleId) => {
    setSelectedCircles(prev => 
      prev.includes(circleId) 
        ? prev.filter(id => id !== circleId)
        : [...prev, circleId]
    );
  };

  const handleShareInCircles = async () => {
    if (selectedCircles.length === 0) {
      alert('Please select at least one circle to share with.');
      return;
    }

    setLoading(true);
    try {
      // Create share entries for each selected circle
      const shareData = selectedCircles.map(circleId => ({
        project_id: project.id,
        circle_id: circleId,
        shared_by: user.id,
        message: shareMessage,
        created_at: new Date().toISOString()
      }));

      const { error } = await supabase
        .from('project_shares')
        .insert(shareData);

      if (error) throw error;

      alert(`Project shared with ${selectedCircles.length} circle(s) successfully!`);
      onClose();
    } catch (error) {
      console.error('Failed to share project:', error);
      alert('Failed to share project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMakePublicPost = () => {
    alert('Public post feature coming soon! This will create a public post visible to all users.');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Share Project</CardTitle>
            <Button variant="outline" size="sm" onClick={onClose}>
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Project Info */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-sm">{project?.title}</h3>
            <p className="text-xs text-gray-600 mt-1">{project?.description}</p>
          </div>

          {/* Share Message */}
          <div>
            <label className="block text-sm font-medium mb-2">Share Message</label>
            <textarea
              value={shareMessage}
              onChange={(e) => setShareMessage(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
              placeholder="Add a message..."
            />
          </div>

          {/* Share Options */}
          <div className="space-y-4">
            {/* Share in Circles */}
            <div>
              <div className="flex items-center mb-3">
                <UsersIcon className="h-5 w-5 text-[#B45309] mr-2" />
                <h3 className="font-medium">Share in Circles</h3>
              </div>
              
              {circles.length > 0 ? (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {circles.map(circle => (
                    <label key={circle.id} className="flex items-center p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={selectedCircles.includes(circle.id)}
                        onChange={() => handleCircleToggle(circle.id)}
                        className="mr-3 h-4 w-4 text-[#B45309] focus:ring-[#B45309] border-gray-300 rounded"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{circle.name}</div>
                        <div className="text-xs text-gray-500">{circle.member_count} members</div>
                      </div>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No circles available. Join or create circles to share projects.</p>
              )}
              
              <Button 
                variant="primary" 
                className="w-full mt-3"
                onClick={handleShareInCircles}
                disabled={loading || selectedCircles.length === 0}
              >
                <SendIcon className="h-4 w-4 mr-2" />
                {loading ? 'Sharing...' : `Share with ${selectedCircles.length} Circle(s)`}
              </Button>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Make Public Post */}
            <div>
              <div className="flex items-center mb-3">
                <GlobeIcon className="h-5 w-5 text-[#B45309] mr-2" />
                <h3 className="font-medium">Make Public Post</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">Share this project publicly for everyone to see</p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleMakePublicPost}
              >
                <GlobeIcon className="h-4 w-4 mr-2" />
                Create Public Post
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};