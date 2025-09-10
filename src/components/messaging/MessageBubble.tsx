import React from 'react';

interface MessageBubbleProps {
  content: string;
  timestamp: string;
  isMe: boolean;
  senderName?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  content,
  timestamp,
  isMe,
  senderName
}) => {
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isMe
            ? 'bg-[#B45309] text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-[#503314] dark:text-white'
        }`}
      >
        {!isMe && senderName && (
          <p className="text-xs font-semibold mb-1 text-[#7C2D12] dark:text-gray-300">
            {senderName}
          </p>
        )}
        <p className="text-sm">{content}</p>
        <p className={`text-xs mt-1 ${
          isMe ? 'text-orange-100' : 'text-[#7C2D12] dark:text-gray-400'
        }`}>
          {timestamp}
        </p>
      </div>
    </div>
  );
};