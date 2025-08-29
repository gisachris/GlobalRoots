import React, { useState } from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
  loading?: boolean;
}
export const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  disabled = false,
  loading = false,
  onClick,
  ...props
}: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const baseClasses = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45309] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] hover:scale-[1.02]';
  const variantClasses = {
    primary: 'bg-[#B45309] text-white hover:bg-[#92400E] shadow-sm hover:shadow',
    secondary: 'bg-[#7C2D12] text-white hover:bg-[#503314] shadow-sm hover:shadow',
    outline: 'border border-[#B45309] bg-transparent hover:bg-[#B45309]/10 dark:hover:bg-[#B45309]/20 text-[#B45309] hover:border-[#92400E]',
    ghost: 'bg-transparent hover:bg-[#F5F5F0] dark:hover:bg-gray-700 text-[#503314] dark:text-gray-300'
  };
  const sizeClasses = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base'
  };
  const widthClass = fullWidth ? 'w-full' : '';
  const pressedClass = isPressed ? 'scale-95' : '';
  const loadingClass = loading ? 'opacity-80 cursor-wait' : '';
  const handleClick = e => {
    if (loading || disabled) return;
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);
    onClick && onClick(e);
  };
  return <button className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${pressedClass} ${loadingClass} ${className}`} disabled={disabled || loading} onClick={handleClick} {...props}>
      {loading ? <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {children}
        </div> : children}
    </button>;
};