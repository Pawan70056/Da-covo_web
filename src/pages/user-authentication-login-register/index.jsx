import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialAuth from './components/SocialAuth';
import TrustIndicators from './components/TrustIndicators';

const UserAuthenticationLoginRegister = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get intended destination from location state
  const from = location.state?.from?.pathname || '/user-account-dashboard';

  useEffect(() => {
    // Check if user is already authenticated (mock check)
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [navigate, from]);

  const handleAuthSuccess = (userData) => {
    // Mock authentication success
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Navigate to intended destination
    navigate(from, { replace: true });
  };

  const handleGuestCheckout = () => {
    navigate('/shopping-cart');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Header */}
      <header className="bg-background border-b border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to="/homepage-landing" 
              className="flex items-center space-x-2 transition-smooth hover:opacity-80"
            >
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-background font-heading font-heading-semibold text-sm">S</span>
              </div>
              <span className="font-heading font-heading-semibold text-lg text-primary">
                StyleHub
              </span>
            </Link>

            {/* Cart Icon */}
            <Link 
              to="/shopping-cart"
              className="flex items-center space-x-2 text-text-primary hover:text-accent transition-smooth"
            >
              <Icon name="ShoppingBag" size={20} />
              <span className="font-body text-sm hidden sm:block">Cart</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Hero Content (Hidden on mobile) */}
            <div className="hidden lg:block">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop"
                  alt="Fashion Shopping Experience"
                  className="w-full h-[600px] object-cover rounded-lg shadow-elevation-2"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent rounded-lg" />
                <div className="absolute bottom-8 left-8 right-8 text-background">
                  <h1 className="text-3xl font-heading font-heading-semibold mb-4">
                    Welcome to StyleHub
                  </h1>
                  <p className="text-lg font-body opacity-90 mb-6">
                    Discover the latest fashion trends and create your perfect style with our curated collection of premium clothing.
                  </p>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Icon name="Shield" size={20} />
                      <span className="font-body text-sm">Secure Shopping</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Truck" size={20} />
                      <span className="font-body text-sm">Free Shipping</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="RotateCcw" size={20} />
                      <span className="font-body text-sm">Easy Returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Authentication Forms */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              {/* Mobile Hero */}
              <div className="lg:hidden text-center mb-8">
                <h1 className="text-2xl font-heading font-heading-semibold text-text-primary mb-2">
                  Welcome to StyleHub
                </h1>
                <p className="text-text-secondary font-body">
                  Sign in to access your account and enjoy personalized shopping
                </p>
              </div>

              {/* Tab Navigation */}
              <div className="bg-surface rounded-lg p-1 mb-6">
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => setActiveTab('login')}
                    className={`py-3 px-4 rounded-md font-body font-body-medium text-sm transition-smooth ${
                      activeTab === 'login' ?'bg-background text-text-primary shadow-elevation-1' :'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setActiveTab('register')}
                    className={`py-3 px-4 rounded-md font-body font-body-medium text-sm transition-smooth ${
                      activeTab === 'register' ?'bg-background text-text-primary shadow-elevation-1' :'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              {/* Social Authentication */}
              <SocialAuth isLoading={isLoading} />

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-subtle" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-text-secondary font-body">
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Authentication Forms */}
              <div className="bg-background">
                {activeTab === 'login' ? (
                  <LoginForm 
                    onSuccess={handleAuthSuccess}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                ) : (
                  <RegisterForm 
                    onSuccess={handleAuthSuccess}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                )}
              </div>

              {/* Guest Checkout Option */}
              <div className="mt-6 p-4 bg-surface rounded-lg border border-subtle">
                <div className="text-center">
                  <h3 className="font-body font-body-medium text-text-primary mb-2">
                    Don't want to create an account?
                  </h3>
                  <p className="text-sm text-text-secondary font-body mb-4">
                    You can continue as a guest and create an account later
                  </p>
                  <button
                    onClick={handleGuestCheckout}
                    className="w-full py-2.5 px-4 border border-subtle rounded-sm font-body text-text-primary hover:bg-background transition-smooth"
                  >
                    Continue as Guest
                  </button>
                </div>
              </div>

              {/* Trust Indicators */}
              <TrustIndicators />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-subtle mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-text-secondary font-body">
              <Link to="/privacy" className="hover:text-accent transition-smooth">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-accent transition-smooth">
                Terms of Service
              </Link>
              <Link to="/support" className="hover:text-accent transition-smooth">
                Support
              </Link>
            </div>
            <p className="text-sm text-text-secondary font-body">
              © {new Date().getFullYear()} StyleHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserAuthenticationLoginRegister;