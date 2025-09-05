import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { MessageCircle, Send, Search, Phone, Video, MoreVertical } from 'lucide-react';

export const MentorMessages: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Jean-Paul Habimana',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Thank you for the feedback on my React project!',
      timestamp: '2 min ago',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Alice Uwimana',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Can we schedule a session for next week?',
      timestamp: '1 hour ago',
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: 'Frontend Circle Group',
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop',
      lastMessage: 'Sarah: Great progress everyone! Keep it up.',
      timestamp: '3 hours ago',
      unread: 5,
      online: true,
      isGroup: true
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Jean-Paul Habimana',
      content: 'Hi Sarah! I just finished the React hooks assignment you gave me.',
      timestamp: '10:30 AM',
      isMe: false
    },
    {
      id: 2,
      sender: 'Me',
      content: 'That\'s great! How did you find working with useEffect?',
      timestamp: '10:32 AM',
      isMe: true
    },
    {
      id: 3,
      sender: 'Jean-Paul Habimana',
      content: 'It was challenging at first, but I think I understand the dependency array better now.',
      timestamp: '10:35 AM',
      isMe: false
    },
    {
      id: 4,
      sender: 'Me',
      content: 'Perfect! That\'s exactly what I wanted to see. The cleanup function is the next important concept to master.',
      timestamp: '10:37 AM',
      isMe: true
    },
    {
      id: 5,
      sender: 'Jean-Paul Habimana',
      content: 'Thank you for the feedback on my React project!',
      timestamp: '10:40 AM',
      isMe: false
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage('');
    }
  };

  return (
    <div className="px-4 h-[calc(100vh-6rem)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#503314] dark:text-white">Messages</h1>
        <p className="text-[#7C2D12] dark:text-gray-300">Communicate with your mentees</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-5rem)]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {conversations.map(conversation => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation.id)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    selectedChat === conversation.id ? 'bg-[#B45309]/10 border-r-2 border-[#B45309]' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={conversation.avatar}
                        alt={conversation.name}
                        className="w-12 h-12 rounded-full"
                      />
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-[#503314] dark:text-white truncate">
                          {conversation.name}
                        </h3>
                        <span className="text-xs text-[#7C2D12] dark:text-gray-300">
                          {conversation.timestamp}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-[#7C2D12] dark:text-gray-300 truncate">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread > 0 && (
                          <span className="bg-[#B45309] text-white text-xs rounded-full px-2 py-1 min-w-[1.25rem] text-center">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 flex flex-col">
          {/* Chat Header */}
          <CardHeader className="border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                  alt="Jean-Paul Habimana"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-[#503314] dark:text-white">Jean-Paul Habimana</h3>
                  <p className="text-sm text-green-600">Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" className="border-[#B45309] text-[#B45309]">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-[#B45309] text-[#B45309]">
                  <Video className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-[#B45309] text-[#B45309]">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isMe
                        ? 'bg-[#B45309] text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-[#503314] dark:text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.isMe ? 'text-orange-100' : 'text-[#7C2D12] dark:text-gray-400'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-600">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-[#B45309] hover:bg-[#7C2D12]"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};