import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}
export const Card = ({
  children,
  className = '',
  hoverable = true,
  onClick
}: CardProps) => {
  const hoverClass = hoverable ? 'hover:shadow-md hover:border-[#B45309]/30 dark:hover:border-gray-500 transform hover:-translate-y-1' : '';
  const cursorClass = onClick ? 'cursor-pointer' : '';
  return <div className={`bg-white dark:bg-gray-800 rounded-lg border border-[#B45309]/20 dark:border-gray-600 p-6 shadow-sm transition-all duration-200 ${hoverClass} ${cursorClass} ${className}`} onClick={onClick}>
      {children}
    </div>;
};
export const CardHeader = ({
  children,
  className = ''
}: CardProps) => {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};
export const CardTitle = ({
  children,
  className = ''
}: CardProps) => {
  return <h3 className={`font-heading font-semibold text-xl text-[#503314] dark:text-white ${className}`}>
      {children}
    </h3>;
};
export const CardDescription = ({
  children,
  className = ''
}: CardProps) => {
  return <p className={`text-[#7C2D12] dark:text-gray-300 mt-1 ${className}`}>
      {children}
    </p>;
};
export const CardContent = ({
  children,
  className = ''
}: CardProps) => {
  return <div className={className}>{children}</div>;
};
export const CardFooter = ({
  children,
  className = ''
}: CardProps) => {
  return <div className={`mt-4 flex items-center ${className}`}>{children}</div>;
};