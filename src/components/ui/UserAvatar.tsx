import React from 'react';

interface UserAvatarProps {
  name: string;
  role?: 'mentor' | 'youth';
  size?: 'sm' | 'md' | 'lg';
  avatarUrl?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ 
  name, 
  role = 'youth', 
  size = 'md',
  avatarUrl 
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base'
  };

  const roleColors = {
    mentor: 'bg-[#B45309] text-white',
    youth: 'bg-blue-500 text-white'
  };

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
    );
  }

  return (
    <div className={`${sizeClasses[size]} ${roleColors[role]} rounded-full flex items-center justify-center font-semibold`}>
      {getInitials(name)}
    </div>
  );
};