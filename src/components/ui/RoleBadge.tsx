import React from 'react';

interface RoleBadgeProps {
  role: 'mentor' | 'youth';
  size?: 'sm' | 'md';
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role, size = 'sm' }) => {
  const roleConfig = {
    mentor: {
      label: 'MENTOR',
      className: 'bg-[#B45309] text-white'
    },
    youth: {
      label: 'YOUTH',
      className: 'bg-blue-500 text-white'
    }
  };

  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-1 text-sm'
  };

  const config = roleConfig[role];

  return (
    <span className={`${config.className} ${sizeClasses[size]} rounded font-semibold`}>
      {config.label}
    </span>
  );
};