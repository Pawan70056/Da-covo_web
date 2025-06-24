import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <Icon name="AlertCircle" size={64} className="mx-auto text-text-secondary mb-4" />
          <h1 className="text-4xl font-heading font-heading-semibold text-text-primary mb-2">
            404
          </h1>
          <h2 className="text-xl font-heading font-heading-medium text-text-primary mb-4">
            Page Not Found
          </h2>
          <p className="text-text-secondary font-body mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/homepage-landing"
            className="inline-flex items-center justify-center space-x-2 w-full bg-primary text-background py-3 px-6 rounded-sm font-body font-body-medium hover:bg-opacity-90 transition-smooth"
          >
            <Icon name="Home" size={20} />
            <span>Go Home</span>
          </Link>
          
          <Link
            to="/product-catalog-browse"
            className="inline-flex items-center justify-center space-x-2 w-full border border-subtle text-text-primary py-3 px-6 rounded-sm font-body hover:bg-surface transition-smooth"
          >
            <Icon name="Grid3X3" size={20} />
            <span>Browse Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;