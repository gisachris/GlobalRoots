import React, { useEffect, useState } from 'react';
import { MessageCircle, X, Users } from 'lucide-react';

interface NotificationPopupProps {
  message: {
    id: string;
    content: string;
    sender_name?: string;
    circle_name?: string;
    is_circle?: boolean;
  };
  onClose: () => void;
  onClick?: () => void;
}

export const NotificationPopup: React.FC<NotificationPopupProps> = ({
  message,
  onClose,
  onClick
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClick = () => {
    if (onClick) {
      onClick();
      onClose();
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-[#B45309]/20 p-4 max-w-sm cursor-pointer hover:shadow-xl transition-shadow"
        onClick={handleClick}
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            {message.is_circle ? (
              <div className="w-10 h-10 bg-[#B45309] rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-gray-600" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#503314] dark:text-white truncate">
                {message.is_circle ? message.circle_name : message.sender_name}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-[#7C2D12] dark:text-gray-300 truncate">
              {message.content}
            </p>
            {message.is_circle && message.sender_name && (
              <p className="text-xs text-[#7C2D12] dark:text-gray-400 mt-1">
                from {message.sender_name}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};