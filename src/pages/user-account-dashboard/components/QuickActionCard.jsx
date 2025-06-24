import React from 'react';
import Icon from 'components/AppIcon';

const QuickActionCard = ({ action, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-surface rounded-lg p-4 hover:shadow-elevation-2 transition-smooth text-left w-full"
    >
      <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
        <Icon name={action.icon} size={24} />
      </div>
      <h3 className="font-body font-body-medium text-text-primary text-sm mb-1">
        {action.title}
      </h3>
      <p className="text-2xl font-data font-data-normal text-text-primary">
        {typeof action.count === 'number' && action.count > 999 
          ? `${(action.count / 1000).toFixed(1)}k` 
          : action.count}
      </p>
    </button>
  );
};

export default QuickActionCard;