export const addNotification = (title, message, fullMessage = null) => {
  const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
  
  const newNotification = {
    id: Date.now(),
    title,
    message,
    fullMessage,
    timestamp: new Date().toISOString(),
    read: false
  };
  
  const updatedNotifications = [newNotification, ...notifications];
  localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  
  return newNotification;
};

// Initialize with sample notifications if none exist
export const initializeNotifications = () => {
  const existing = localStorage.getItem('notifications');
  if (!existing) {
    const sampleNotifications = [
      {
        id: 1,
        title: 'Project Application Update',
        message: 'Your application for E-commerce Platform has been reviewed.',
        fullMessage: 'Your application for the E-commerce Platform project has been reviewed by the project lead. They are impressed with your React and Node.js experience and would like to schedule an interview. Please check your calendar for available slots.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false
      },
      {
        id: 2,
        title: 'New Mentorship Opportunity',
        message: 'A new mentor is available in your field of interest.',
        fullMessage: 'Sarah Johnson, a Senior Software Engineer at Google, is now available for mentorship sessions. She specializes in React, TypeScript, and system design. Book a session to accelerate your career growth.',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        read: false
      },
      {
        id: 3,
        title: 'Community Event Reminder',
        message: 'Tech Talk: Building Scalable Applications - Tomorrow 6 PM',
        fullMessage: 'Don\'t forget about tomorrow\'s tech talk on "Building Scalable Applications with Microservices". The session will be led by industry experts and includes a Q&A session. Join us at 6 PM EAT.',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        read: true
      }
    ];
    
    localStorage.setItem('notifications', JSON.stringify(sampleNotifications));
  }
};