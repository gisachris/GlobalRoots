import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MessageCircle, Send, Search, Users, UserPlus, Plus } from 'lucide-react';
import { CircleChat } from '../components/circles/CircleChat';
import { MessageList } from '../components/messaging/MessageList';
import { MessageInput } from '../components/messaging/MessageInput';
import { useMessaging } from '../context/MessagingContext';
import { useAuth } from '../context/AuthContext';
import { circlesService } from '../services/circles';

function Circle() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chatType, setChatType] = useState<'circle' | 'conversation'>('circle');
  const [circles, setCircles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { state, sendMessage, loadMessages, loadConversations } = useMessaging();
  const { user } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const [circlesData] = await Promise.all([
          circlesService.getUserCircles(user.id),
          loadConversations()
        ]);

        setCircles(circlesData);
        if (circlesData.length > 0 && !selectedChat) {
          setSelectedChat(circlesData[0].id);
          setChatType('circle');
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user?.id]);

  const handleSendMessage = async (content: string) => {
    if (!selectedChat || !user) return;

    try {
      if (chatType === 'circle') {
        await sendMessage(content, selectedChat);
      } else {
        await sendMessage(content, undefined, selectedChat);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hour${Math.floor(diffInMinutes / 60) !== 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="px-4 h-[calc(100vh-6rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B45309]"></div>
      </div>
    );
  }

  return (
    <div className="px-4 h-[calc(100vh-6rem)]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#503314] dark:text-white">My Circles</h1>
          <p className="text-[#7C2D12] dark:text-gray-300">
            {user?.role === 'mentor' ? 'Manage your circles and communicate with mentees' : 'Join circles and chat with mentors'}
          </p>
        </div>
        {user?.role === 'mentor' && (
          <Button onClick={() => setShowCreateForm(true)} className="bg-[#B45309] hover:bg-[#7C2D12]">
            <Plus className="h-4 w-4 mr-2" />
            Create Circle
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-5rem)]">
        {/* Circles List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search circles..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {circles.map(circle => (
                <div
                  key={circle.id}
                  onClick={() => {
                    setSelectedChat(circle.id);
                    setChatType('circle');
                  }}
                  className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    selectedChat === circle.id && chatType === 'circle' ? 'bg-[#B45309]/10 border-r-2 border-[#B45309]' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[#B45309] rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-[#503314] dark:text-white truncate">
                          {circle.title}
                        </h3>
                        <span className="text-xs text-[#7C2D12] dark:text-gray-300">
                          {formatTimestamp(circle.created_at)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-[#7C2D12] dark:text-gray-300 truncate">
                          {circle.category} • {circle.max_participants} members
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {state.conversations.map(conversation => (
                <div
                  key={conversation.id}
                  onClick={() => {
                    setSelectedChat(conversation.id);
                    setChatType('conversation');
                  }}
                  className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    selectedChat === conversation.id && chatType === 'conversation' ? 'bg-[#B45309]/10 border-r-2 border-[#B45309]' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-[#503314] dark:text-white truncate">
                          1-to-1 Chat
                        </h3>
                        <span className="text-xs text-[#7C2D12] dark:text-gray-300">
                          {formatTimestamp(conversation.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        {selectedChat && chatType === 'circle' ? (
          <div className="lg:col-span-2">
            <CircleChat
              circleId={selectedChat}
              circleName={circles.find(c => c.id === selectedChat)?.title || 'Circle'}
              memberCount={0}
            />
          </div>
        ) : selectedChat && chatType === 'conversation' ? (
          <Card className="lg:col-span-2 flex flex-col">
            <CardHeader className="border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#503314] dark:text-white">1-to-1 Chat</h3>
                    <p className="text-sm text-[#7C2D12] dark:text-gray-300">Direct message</p>
                  </div>
                </div>
              </div>
            </CardHeader>

            <MessageList
              messages={state.messages[selectedChat] || []}
              currentUserId={user?.id || ''}
              loading={state.loading}
            />

            <div className="p-4 border-t border-gray-200 dark:border-gray-600">
              <MessageInput
                onSendMessage={handleSendMessage}
                disabled={state.loading}
                placeholder="Type your message..."
              />
            </div>
          </Card>
        ) : (
          <Card className="lg:col-span-2 flex items-center justify-center">
            <div className="text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#503314] dark:text-white mb-2">
                {circles.length === 0 ? 'No circles yet' : 'Select a circle'}
              </h3>
              <p className="text-[#7C2D12] dark:text-gray-300">
                {circles.length === 0 
                  ? user?.role === 'mentor' 
                    ? 'Create your first circle to start mentoring'
                    : 'Join circles to connect with mentors'
                  : 'Choose a circle to start chatting'
                }
              </p>
              {user?.role === 'mentor' && circles.length === 0 && (
                <Button 
                  onClick={() => setShowCreateForm(true)} 
                  className="mt-4 bg-[#B45309] hover:bg-[#7C2D12]"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Circle
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Circle