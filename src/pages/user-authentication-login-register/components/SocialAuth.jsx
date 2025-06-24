import React from 'react';
import Icon from 'components/AppIcon';

const SocialAuth = ({ isLoading }) => {
  const handleSocialAuth = (provider) => {
    console.log(`${provider} authentication initiated`);
    // In a real app, this would redirect to the OAuth provider
  };

  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'text-red-600',
      bgColor: 'hover:bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      name: 'Apple',
      icon: 'Apple',
      color: 'text-gray-900',
      bgColor: 'hover:bg-gray-50',
      borderColor: 'border-gray-200'
    }
  ];

  return (
    <div className="space-y-3">
      {socialProviders.map((provider) => (
        <button
          key={provider.name}
          onClick={() => handleSocialAuth(provider.name.toLowerCase())}
          disabled={isLoading}
          className={`w-full flex items-center justify-center space-x-3 py-3 px-4 border rounded-sm font-body transition-smooth disabled:opacity-50 disabled:cursor-not-allowed ${provider.bgColor} ${provider.borderColor} hover:shadow-elevation-1`}
        >
          <Icon 
            name={provider.icon} 
            size={20} 
            className={provider.color}
          />
          <span className="text-text-primary">
            Continue with {provider.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SocialAuth;