import React from 'react';
import Icon from 'components/AppIcon';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'order',
      title: 'Order #ORD-2024-003 placed',
      description: 'Leather Boots - Size 9',
      timestamp: '2024-01-22T10:30:00Z',
      icon: 'Package',
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'wishlist',
      title: 'Item added to wishlist',
      description: 'Classic Denim Jacket',
      timestamp: '2024-01-21T15:45:00Z',
      icon: 'Heart',
      color: 'text-red-600'
    },
    {
      id: 3,
      type: 'profile',
      title: 'Profile updated',
      description: 'Phone number changed',
      timestamp: '2024-01-20T09:15:00Z',
      icon: 'User',
      color: 'text-green-600'
    },
    {
      id: 4,
      type: 'login',
      title: 'Account accessed',
      description: 'Login from Chrome on Windows',
      timestamp: '2024-01-20T08:00:00Z',
      icon: 'LogIn',
      color: 'text-gray-600'
    },
    {
      id: 5,
      type: 'order',
      title: 'Order #ORD-2024-002 shipped',
      description: 'Tracking: TRK987654321',
      timestamp: '2024-01-19T14:20:00Z',
      icon: 'Truck',
      color: 'text-blue-600'
    }
  ];

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="bg-surface rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-heading-medium text-text-primary">
          Recent Activity
        </h3>
        <button className="text-accent hover:underline font-body-medium text-sm">
          View All
        </button>
      </div>
      
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 bg-background rounded-sm">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ${activity.color}`}>
              <Icon name={activity.icon} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-body font-body-medium text-text-primary text-sm">
                {activity.title}
              </h4>
              <p className="text-text-secondary text-xs font-body mt-1">
                {activity.description}
              </p>
              <p className="text-text-secondary text-xs font-body mt-1">
                {formatTimestamp(activity.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-subtle">
        <div className="flex items-center space-x-2 text-text-secondary">
          <Icon name="Shield" size={16} />
          <span className="text-sm font-body">
            Your account activity is monitored for security
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;