import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const LoginForm = ({ onSuccess, isLoading, setIsLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Mock credentials for testing
  const mockCredentials = {
    email: 'kingnone70056@gmail.com',
    password: '123'
  };

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
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      
      // Check mock credentials
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        const userData = {
          id: 1,
          email: formData.email,
          firstName: 'John',
          lastName: 'Doe',
          rememberMe: formData.rememberMe
        };
        
        onSuccess(userData);
      } else {
        setErrors({
          general: `Invalid credentials. Use email: ${mockCredentials.email} and password: ${mockCredentials.password}`
        });
      }
    } catch (error) {
      setErrors({
        general: 'An error occurred during login. Please try again.'
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
            placeholder="Enter your email"
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
            placeholder="Enter your password"
            autoComplete="current-password"
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

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="w-4 h-4 text-accent border-subtle rounded focus:ring-accent focus:ring-2"
          />
          <span className="text-sm font-body text-text-secondary">Remember me</span>
        </label>
        
        <Link 
          to="/forgot-password" 
          className="text-sm font-body text-accent hover:underline"
        >
          Forgot password?
        </Link>
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
            <span>Signing in...</span>
          </div>
        ) : (
          'Sign In'
        )}
      </button>

      {/* Mock Credentials Helper */}
      <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-sm">
        <p className="text-xs text-text-secondary font-body mb-1">
          <strong>Demo Credentials:</strong>
        </p>
        <p className="text-xs text-text-secondary font-body">
          Email: {mockCredentials.email}
        </p>
        <p className="text-xs text-text-secondary font-body">
          Password: {mockCredentials.password}
        </p>
      </div>
    </form>
  );
};

export default LoginForm;