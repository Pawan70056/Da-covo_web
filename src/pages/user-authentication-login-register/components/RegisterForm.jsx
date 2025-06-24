import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const RegisterForm = ({ onSuccess, isLoading, setIsLoading }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const userData = {
        id: Date.now(),
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        subscribeNewsletter: formData.subscribeNewsletter
      };
      
      onSuccess(userData);
    } catch (error) {
      setErrors({
        general: 'An error occurred during registration. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* General Error */}
      {errors.general && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-sm">
          <p className="text-sm text-error font-body">{errors.general}</p>
        </div>
      )}

      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-body font-body-medium text-text-primary mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`w-full px-3 py-3 border rounded-sm font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-smooth ${
              errors.firstName ? 'border-error' : 'border-subtle focus:border-accent'
            }`}
            placeholder="Pawan"
            autoComplete="given-name"
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-error font-body">{errors.firstName}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-body font-body-medium text-text-primary mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`w-full px-3 py-3 border rounded-sm font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-smooth ${
              errors.lastName ? 'border-error' : 'border-subtle focus:border-accent'
            }`}
            placeholder="Doe"
            autoComplete="family-name"
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-error font-body">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-body font-body-medium text-text-primary mb-2">
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-3 border rounded-sm font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-smooth ${
              errors.email ? 'border-error' : 'border-subtle focus:border-accent'
            }`}
            placeholder="john@example.com"
            autoComplete="email"
          />
          <Icon 
            name="Mail" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-xs text-error font-body">{errors.email}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-body font-body-medium text-text-primary mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-12 py-3 border rounded-sm font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-smooth ${
              errors.password ? 'border-error' : 'border-subtle focus:border-accent'
            }`}
            placeholder="Create a strong password"
            autoComplete="new-password"
          />
          <Icon 
            name="Lock" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-smooth"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-error font-body">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-body font-body-medium text-text-primary mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-12 py-3 border rounded-sm font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-smooth ${
              errors.confirmPassword ? 'border-error' : 'border-subtle focus:border-accent'
            }`}
            placeholder="Confirm your password"
            autoComplete="new-password"
          />
          <Icon 
            name="Lock" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-smooth"
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-error font-body">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Terms Agreement */}
      <div className="space-y-3">
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className="mt-1 w-4 h-4 text-accent border-subtle rounded focus:ring-accent focus:ring-2"
          />
          <span className="text-sm font-body text-text-secondary">
            I agree to the{' '}
            <Link to="/terms" className="text-accent hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-accent hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="text-xs text-error font-body">{errors.agreeToTerms}</p>
        )}

        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            name="subscribeNewsletter"
            checked={formData.subscribeNewsletter}
            onChange={handleInputChange}
            className="mt-1 w-4 h-4 text-accent border-subtle rounded focus:ring-accent focus:ring-2"
          />
          <span className="text-sm font-body text-text-secondary">
            Subscribe to our newsletter for exclusive offers and style updates
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-background py-3 px-4 rounded-sm font-body font-body-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-accent transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
            <span>Creating account...</span>
          </div>
        ) : (
          'Create Account'
        )}
      </button>

      {/* Password Requirements */}
      <div className="mt-4 p-3 bg-surface border border-subtle rounded-sm">
        <p className="text-xs font-body font-body-medium text-text-primary mb-2">
          Password Requirements:
        </p>
        <ul className="text-xs text-text-secondary font-body space-y-1">
          <li className="flex items-center space-x-2">
            <Icon 
              name={formData.password.length >= 8 ? 'Check' : 'X'} 
              size={12} 
              className={formData.password.length >= 8 ? 'text-success' : 'text-text-secondary'} 
            />
            <span>At least 8 characters</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon 
              name={/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) ? 'Check' : 'X'} 
              size={12} 
              className={/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) ? 'text-success' : 'text-text-secondary'} 
            />
            <span>Upper and lowercase letters</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon 
              name={/(?=.*\d)/.test(formData.password) ? 'Check' : 'X'} 
              size={12} 
              className={/(?=.*\d)/.test(formData.password) ? 'text-success' : 'text-text-secondary'} 
            />
            <span>At least one number</span>
          </li>
        </ul>
      </div>
    </form>
  );
};

export default RegisterForm;