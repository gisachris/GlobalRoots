import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  className?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  message = 'Loading...',
  className = ''
}) => {
  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 ${className}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-2xl border border-[#B45309]/20 max-w-sm w-full mx-4">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" color="primary" />
          <div className="text-center">
            <h3 className="text-lg font-semibold text-[#503314] dark:text-white mb-2">
              Please Wait
            </h3>
            <p className="text-[#7C2D12] dark:text-gray-300 text-sm">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};