import React, { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';

interface Message {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
  sender_name?: string;
  sender_role?: 'mentor' | 'youth';
  sender_avatar?: string;
}

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  loading?: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
  loading = false
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading && messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B45309]"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4">
        {messages.map((message, index) => {
          const prevMessage = messages[index - 1];
          const showSenderInfo = !prevMessage || prevMessage.sender_id !== message.sender_id;
          
          return (
            <MessageBubble
              key={message.id}
              content={message.content}
              timestamp={formatTimestamp(message.created_at)}
              isMe={message.sender_id === currentUserId}
              senderName={message.sender_name}
              senderRole={message.sender_role}
              senderAvatar={message.sender_avatar}
              showSenderInfo={showSenderInfo}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};