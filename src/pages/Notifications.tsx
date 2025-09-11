import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BellIcon, CheckIcon, XIcon } from 'lucide-react';

export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const savedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    setNotifications(savedNotifications);
    
    // Check if we need to open a specific notification
    const openId = searchParams.get('open');
    if (openId) {
      const notification = savedNotifications.find(n => n.id === parseInt(openId));
      if (notification) {
        setSelectedNotification(notification);
        markAsRead(notification.id);
        // Remove the parameter from URL
        setSearchParams({});
      }
    }
  }, [searchParams, setSearchParams]);

  const markAsRead = (id) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#503314] dark:text-white">Notifications</h1>
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckIcon className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>

        <div className="space-y-4">
          {notifications.map(notification => (
            <Card 
              key={notification.id} 
              className={`cursor-pointer hover:shadow-lg transition-shadow ${
                !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
              onClick={() => {
                setSelectedNotification(notification);
                markAsRead(notification.id);
              }}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{notification.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <BellIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              No notifications
            </h3>
            <p className="text-gray-500">You're all caught up!</p>
          </div>
        )}

        {/* Notification Detail Modal */}
        {selectedNotification && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold">{selectedNotification.title}</h2>
                  <Button variant="outline" size="sm" onClick={() => setSelectedNotification(null)}>
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {selectedNotification.fullMessage || selectedNotification.message}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(selectedNotification.timestamp).toLocaleString()}
                  </p>
                </div>

                <div className="flex justify-end">
                  <Button variant="primary" onClick={() => setSelectedNotification(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};