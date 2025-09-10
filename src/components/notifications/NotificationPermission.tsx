import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Bell, BellOff } from 'lucide-react';

export const NotificationPermission: React.FC = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
      setShowPrompt(Notification.permission === 'default');
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      setShowPrompt(false);
    }
  };

  if (!showPrompt || permission !== 'default') return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Bell className="h-5 w-5 text-blue-600" />
          <div>
            <h4 className="font-medium text-blue-900">Enable Notifications</h4>
            <p className="text-sm text-blue-700">Get notified when you receive new messages</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowPrompt(false)}
          >
            Later
          </Button>
          <Button
            size="sm"
            onClick={requestPermission}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Enable
          </Button>
        </div>
      </div>
    </div>
  );
};