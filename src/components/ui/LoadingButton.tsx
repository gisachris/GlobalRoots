import React from 'react';
import { Button } from './Button';
import { LoadingSpinner } from './LoadingSpinner';

interface LoadingButtonProps {
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  loadingText?: string;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  disabled = false,
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  loadingText
}) => {
  const isDisabled = loading || disabled;

  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      disabled={isDisabled}
      onClick={onClick}
      className={`relative ${className} ${loading ? 'cursor-not-allowed' : ''}`}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner 
            size={size === 'lg' ? 'md' : 'sm'} 
            color={variant === 'outline' ? 'primary' : 'white'} 
            className="mr-2"
          />
          {loadingText && (
            <span className={variant === 'outline' ? 'text-[#B45309]' : 'text-white'}>
              {loadingText}
            </span>
          )}
        </div>
      )}
      <span className={loading ? 'invisible' : 'visible'}>
        {children}
      </span>
    </Button>
  );
};