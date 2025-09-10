import React from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

interface ConnectionStatusProps {
  isConnected: boolean;
  onRetry?: () => void;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ 
  isConnected, 
  onRetry 
}) => {
  if (isConnected) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <WifiOff className="h-4 w-4 text-red-600" />
          <span className="text-sm text-red-800">Connection issues detected</span>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-red-600 hover:text-red-800 p-1"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        )}
      </div>
      <p className="text-xs text-red-600 mt-1">
        Messages are being synchronized automatically
      </p>
    </div>
  );
};