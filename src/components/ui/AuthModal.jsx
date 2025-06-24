import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthModal = ({ isOpen, onClose, defaultMode = 'login' }) => {
  const [mode, setMode] = useState(defaultMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    setMode(defaultMode);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      agreeToTerms: false,
    });
    setErrors({});
  }, [defaultMode, isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (mode === 'register') {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(`${mode} submitted:`, formData);
      onClose();
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = (provider) => {
    console.log(`${provider} authentication`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-primary bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-background rounded-lg shadow-elevation-3 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-subtle">
          <h2 className="text-xl font-heading font-heading-semibold text-text-primary">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-smooth"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Social Authentication */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialAuth('google')}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-subtle rounded-sm hover:bg-surface transition-smooth"
            >
              <Icon name="Chrome" size={20} />
              <span className="font-body">Continue with Google</span>
            </button>
            <button
              onClick={() => handleSocialAuth('facebook')}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-subtle rounded-sm hover:bg-surface transition-smooth"
            >
              <Icon name="Facebook" size={20} />
              <span className="font-body">Continue with Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-subtle" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-text-secondary font-body">Or</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-body font-body-medium text-text-primary mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2.5 border rounded-sm font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-smooth ${
                      errors.firstName ? 'border-error' : 'border-subtle focus:border-accent'
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-error font-body">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-body font-body-medium text-text-primary mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2.5 border rounded-sm font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-smooth ${
                      errors.lastName ? 'border-error' : 'border-subtle focus:border-accent'
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-error font-body">{errors.lastName}</p>
                  )}
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-body font-body-medium text-text-primary mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2.5 border rounded-sm font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-smooth ${
                  errors.email ? 'border-error' : 'border-subtle focus:border-accent'
                }`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-error font-body">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-body font-body-medium text-text-primary mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-3 py-2.5 border rounded-sm font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-smooth ${
                  errors.password ? 'border-error' : 'border-subtle focus:border-accent'
                }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-error font-body">{errors.password}</p>
              )}
            </div>

            {mode === 'register' && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-body font-body-medium text-text-primary mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2.5 border rounded-sm font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-smooth ${
                    errors.confirmPassword ? 'border-error' : 'border-subtle focus:border-accent'
                  }`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-error font-body">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {mode === 'register' && (
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-accent border-subtle rounded focus:ring-accent focus:ring-2"
                />
                <label htmlFor="agreeToTerms" className="text-sm font-body text-text-secondary">
                  I agree to the{' '}
                  <Link to="/terms" className="text-accent hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-accent hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            )}
            {errors.agreeToTerms && (
              <p className="text-xs text-error font-body">{errors.agreeToTerms}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-background py-3 px-4 rounded-sm font-body font-body-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-accent transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                  <span>Please wait...</span>
                </div>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm font-body text-text-secondary">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-accent hover:underline font-body-medium"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
            
            {mode === 'login' && (
              <p className="mt-2 text-sm font-body text-text-secondary">
                <Link to="/forgot-password" className="text-accent hover:underline">
                  Forgot your password?
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;