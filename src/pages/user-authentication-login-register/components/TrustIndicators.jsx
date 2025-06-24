import React from 'react';
import Icon from 'components/AppIcon';

const TrustIndicators = () => {
  const benefits = [
    {
      icon: 'Package',
      title: 'Order Tracking',
      description: 'Track your orders in real-time'
    },
    {
      icon: 'Zap',
      title: 'Faster Checkout',
      description: 'Save payment & shipping info'
    },
    {
      icon: 'Star',
      title: 'Exclusive Offers',
      description: 'Member-only deals & early access'
    },
    {
      icon: 'Heart',
      title: 'Wishlist',
      description: 'Save items for later'
    }
  ];

  const securityFeatures = [
    {
      icon: 'Shield',
      text: 'SSL Encrypted'
    },
    {
      icon: 'Lock',
      text: 'Secure Payments'
    },
    {
      icon: 'Eye',
      text: 'Privacy Protected'
    }
  ];

  return (
    <div className="mt-8 space-y-6">
      {/* Account Benefits */}
      <div className="bg-surface rounded-lg p-4 border border-subtle">
        <h3 className="font-body font-body-medium text-text-primary mb-4 text-center">
          Benefits of Creating an Account
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                <Icon name={benefit.icon} size={16} className="text-accent" />
              </div>
              <div className="min-w-0">
                <h4 className="font-body font-body-medium text-text-primary text-sm">
                  {benefit.title}
                </h4>
                <p className="text-xs text-text-secondary font-body">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Indicators */}
      <div className="flex items-center justify-center space-x-6">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Icon name={feature.icon} size={16} className="text-success" />
            <span className="text-xs text-text-secondary font-body">
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      {/* Customer Support */}
      <div className="text-center">
        <p className="text-xs text-text-secondary font-body mb-2">
          Need help? Our customer support team is here for you
        </p>
        <div className="flex items-center justify-center space-x-4">
          <a 
            href="mailto:support@dacovo.com" 
            className="flex items-center space-x-1 text-xs text-accent hover:underline"
          >
            <Icon name="Mail" size={14} />
            <span>Email Support</span>
          </a>
          <a 
            href="tel:+1-800-STYLE-HUB" 
            className="flex items-center space-x-1 text-xs text-accent hover:underline"
          >
            <Icon name="Phone" size={14} />
            <span>Call Us</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;