import React, { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { SendIcon, VideoIcon, PhoneIcon, SmileIcon, PaperclipIcon, MoreVerticalIcon, UserIcon } from 'lucide-react';
interface Message {
  id: string;
  sender: string;
  senderType: 'user' | 'mentor';
  content: string;
  timestamp: Date;
}
interface ChatProps {
  mentorId?: string;
  mentorName?: string;
  mentorImage?: string;
  userId?: string;
  userName?: string;
  userImage?: string;
}
export const ChatInterface = ({
  mentorId = 'mentor-1',
  mentorName = 'David Mutabazi',
  mentorImage = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  userId = 'user-1',
  userName = 'Jean-Paul Habimana',
  userImage = 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
}: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    sender: mentorName,
    senderType: 'mentor',
    content: 'Hello! How can I help you with your tech career today?',
    timestamp: new Date(Date.now() - 3600000)
  }, {
    id: '2',
    sender: userName,
    senderType: 'user',
    content: "Hi, I'm interested in learning more about frontend development opportunities in Rwanda.",
    timestamp: new Date(Date.now() - 3400000)
  }, {
    id: '3',
    sender: mentorName,
    senderType: 'mentor',
    content: "That's great! There's a growing demand for frontend developers here. Have you worked with React or Vue before?",
    timestamp: new Date(Date.now() - 3200000)
  }]);
  const [newMessage, setNewMessage] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    // Scroll to bottom of chat when messages change
    const chatContainer = document.getElementById('chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const message: Message = {
      id: Date.now().toString(),
      sender: userName,
      senderType: 'user',
      content: newMessage,
      timestamp: new Date()
    };
    setMessages([...messages, message]);
    setNewMessage('');
    // Simulate mentor response
    setTimeout(() => {
      const responses = ["That's interesting! Let me think about that.", "Great question! In my experience, it's best to approach it this way...", "I've worked on similar projects before. The key is to focus on...", 'Have you considered trying this approach?', "I'd recommend looking into these resources to learn more about that topic."];
      const mentorResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: mentorName,
        senderType: 'mentor',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, mentorResponse]);
    }, 2000);
  };
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  return <Card className="flex flex-col h-[600px] max-w-3xl mx-auto">
      {/* Chat Header */}
      <CardHeader className="border-b border-primary-200 dark:border-dark-600 px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={mentorImage} alt={mentorName} className="w-full h-full object-cover" />
              </div>
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            </div>
            <div className="ml-3">
              <CardTitle className="text-base font-medium text-[#503314]">
                {mentorName}
              </CardTitle>
              <p className="text-xs text-[#7C2D12]">
                {isOnline ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-full hover:bg-[#F5F5F0]">
              <PhoneIcon className="h-5 w-5 text-[#B45309]" />
            </button>
            <button className="p-2 rounded-full hover:bg-[#F5F5F0]">
              <VideoIcon className="h-5 w-5 text-[#B45309]" />
            </button>
            <button className="p-2 rounded-full hover:bg-[#F5F5F0]">
              <MoreVerticalIcon className="h-5 w-5 text-[#7C2D12]" />
            </button>
          </div>
        </div>
      </CardHeader>
      {/* Chat Messages */}
      <CardContent className="flex-1 overflow-y-auto p-4" id="chat-messages">
        <div className="space-y-4">
          {messages.map(message => <div key={message.id} className={`flex ${message.senderType === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.senderType === 'mentor' && <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                  <img src={mentorImage} alt={mentorName} className="w-full h-full object-cover" />
                </div>}
              <div className={`max-w-[70%] rounded-lg p-3 ${message.senderType === 'user' ? 'bg-[#B45309] text-white rounded-br-none' : 'bg-[#F5F5F0] text-[#503314] rounded-bl-none'}`}>
                <p className="text-sm">{message.content}</p>
                <div className={`text-xs mt-1 ${message.senderType === 'user' ? 'text-white/70' : 'text-[#7C2D12]/70'}`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
              {message.senderType === 'user' && <div className="w-8 h-8 rounded-full overflow-hidden ml-2 flex-shrink-0">
                  <img src={userImage} alt={userName} className="w-full h-full object-cover" />
                </div>}
            </div>)}
        </div>
      </CardContent>
      {/* Chat Input */}
      <CardFooter className="border-t border-primary-200 dark:border-dark-600 p-3">
        <div className="flex items-center w-full bg-[#F5F5F0] rounded-lg">
          <button className="p-2 text-[#7C2D12]">
            <SmileIcon className="h-5 w-5" />
          </button>
          <textarea value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyDown={handleKeyPress} placeholder="Type a message..." className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-2 px-3 text-[#503314] placeholder-[#7C2D12]/50 max-h-32" rows={1} />
          <button className="p-2 text-[#7C2D12]">
            <PaperclipIcon className="h-5 w-5" />
          </button>
          <button onClick={sendMessage} className="p-2 rounded-full bg-[#B45309] text-white ml-2" disabled={!newMessage.trim()}>
            <SendIcon className="h-5 w-5" />
          </button>
        </div>
      </CardFooter>
    </Card>;
};