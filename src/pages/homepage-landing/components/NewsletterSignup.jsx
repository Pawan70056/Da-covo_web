import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubscribed(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: "Tag",
      title: "Exclusive Offers",
      description: "Get first access to sales and special promotions"
    },
    {
      icon: "Sparkles",
      title: "New Arrivals",
      description: "Be the first to know about our latest collections"
    },
    {
      icon: "Gift",
      title: "Birthday Rewards",
      description: "Receive special discounts on your birthday"
    }
  ];

  if (isSubscribed) {
    return (
      <section className="bg-accent py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-background rounded-lg p-8 shadow-elevation-2">
            <Icon name="CheckCircle" size={64} className="mx-auto text-success mb-4" />
            <h2 className="text-2xl font-heading font-heading-semibold text-text-primary mb-4">
              Welcome to StyleHub!
            </h2>
            <p className="text-text-secondary font-body mb-6">
              Thank you for subscribing to our newsletter. You'll receive your first exclusive offer within 24 hours.
            </p>
            <button
              onClick={() => setIsSubscribed(false)}
              className="text-accent hover:underline font-body font-body-medium"
            >
              Subscribe another email
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-accent py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-background rounded-lg p-8 sm:p-12 shadow-elevation-2">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-heading font-heading-semibold text-text-primary mb-4">
              Stay in Style
            </h2>
            <p className="text-lg text-text-secondary font-body max-w-2xl mx-auto">
              Join our newsletter and be the first to know about new collections, exclusive offers, and style tips.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name={benefit.icon} size={24} className="text-accent" />
                </div>
                <h3 className="font-heading font-heading-medium text-text-primary mb-2">
                  {benefit.title}
                </h3>
                <p className="text-text-secondary font-body text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-subtle rounded-sm font-body text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-smooth"
                  disabled={isLoading}
                />
                {error && (
                  <p className="mt-2 text-error text-sm font-body">{error}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary text-background px-6 py-3 rounded-sm font-body font-body-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-accent transition-smooth disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    <span>Subscribing...</span>
                  </div>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
          </form>

          <p className="text-center text-text-secondary text-sm font-body mt-4">
            By subscribing, you agree to our{' '}
            <a href="/privacy" className="text-accent hover:underline">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="/terms" className="text-accent hover:underline">
              Terms of Service
            </a>
            . You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;