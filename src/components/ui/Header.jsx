import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(3);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    setIsAccountMenuOpen(false);
  }, [location]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to catalog with search query
      console.log('Searching for:', searchQuery);
    }
  };

  const handleCartClick = () => {
    // Navigate to cart
    console.log('Navigate to cart');
  };

  const handleWishlistClick = () => {
    console.log('Navigate to wishlist');
  };

  const handleAuthAction = (action) => {
    console.log(`${action} clicked`);
    setIsAccountMenuOpen(false);
  };

  const navigationItems = [
    { label: 'Home', path: '/homepage-landing', icon: 'Home' },
    { label: 'Catalog', path: '/product-catalog-browse', icon: 'Grid3X3' },
    { label: 'Contact Us', path: '/contact', icon: 'Phone' },
    { label: 'About Us', path: '/about-us', icon: 'Info' },
    { label: 'Account', path: '/user-account-dashboard', icon: 'User' },
    { label: 'Add Cart', path: '/shopping-cart', icon: 'ShoppingBag' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b border-subtle z-navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link 
            to="/homepage-landing" 
            className="flex items-center space-x-2 transition-smooth hover:opacity-80"
          >
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-background font-heading font-heading-semibold text-sm">F</span>
            </div>
            {/* <span className="font-heading font-heading-semibold text-lg text-primary hidden sm:block">
              Fashion
            </span> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 flex-1 max-w-2xl mx-8">
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="flex-1 relative">
              <div className={`relative transition-smooth ${isSearchFocused ? 'transform scale-105' : ''}`}>
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface border border-subtle rounded-sm font-body text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-smooth"
                />
              </div>
            </form>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Account Menu */}
            <div className="relative">
              <button
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className="flex items-center space-x-1 text-text-primary hover:text-accent transition-smooth"
              >
                <Icon name="User" size={20} />
                <span className="font-body text-sm">Account</span>
                <Icon name="ChevronDown" size={16} className={`transition-smooth ${isAccountMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isAccountMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-subtle rounded-lg shadow-elevation-2 py-2 z-dropdown">
                  {isAuthenticated ? (
                    <>
                      <Link 
                        to="/user-account-dashboard" 
                        className="block px-4 py-2 text-sm text-text-primary hover:bg-surface transition-smooth"
                      >
                        Dashboard
                      </Link>
                      <button 
                        onClick={() => handleAuthAction('logout')}
                        className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-surface transition-smooth"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/user-authentication-login-register" 
                        className="block px-4 py-2 text-sm text-text-primary hover:bg-surface transition-smooth"
                      >
                        Sign In
                      </Link>
                      <Link 
                        to="/user-authentication-login-register" 
                        className="block px-4 py-2 text-sm text-text-primary hover:bg-surface transition-smooth"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={handleWishlistClick}
              className="flex items-center space-x-1 text-text-primary hover:text-accent transition-smooth"
            >
              <Icon name="Heart" size={20} />
              <span className="font-body text-sm">Wishlist</span>
            </button>

            {/* Cart */}
            <Link 
              to="/shopping-cart"
              className="flex items-center space-x-2 text-text-primary hover:text-accent transition-smooth relative"
            >
              <div className="relative">
                <Icon name="ShoppingBag" size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-background text-xs font-data font-data-normal rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="font-body text-sm">Cart</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            {/* Mobile Search */}
            <button className="text-text-primary hover:text-accent transition-smooth">
              <Icon name="Search" size={20} />
            </button>
            
            {/* Mobile Cart */}
            <Link 
              to="/shopping-cart"
              className="relative text-text-primary hover:text-accent transition-smooth"
            >
              <Icon name="ShoppingBag" size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-background text-xs font-data font-data-normal rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-text-primary hover:text-accent transition-smooth"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-subtle bg-background">
            <div className="py-4 space-y-4">
              {/* Mobile Search Bar */}
              <form onSubmit={handleSearchSubmit} className="px-4">
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={20} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                  />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-surface border border-subtle rounded-sm font-body text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-smooth"
                  />
                </div>
              </form>

              {/* Navigation Links */}
              <nav className="space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center space-x-3 px-4 py-3 text-text-primary hover:bg-surface hover:text-accent transition-smooth"
                  >
                    <Icon name={item.icon} size={20} />
                    <span className="font-body">{item.label}</span>
                  </Link>
                ))}
                
                <button
                  onClick={handleWishlistClick}
                  className="flex items-center space-x-3 px-4 py-3 text-text-primary hover:bg-surface hover:text-accent transition-smooth w-full text-left"
                >
                  <Icon name="Heart" size={20} />
                  <span className="font-body">Wishlist</span>
                </button>

                {/* Mobile Auth */}
                {isAuthenticated ? (
                  <button 
                    onClick={() => handleAuthAction('logout')}
                    className="flex items-center space-x-3 px-4 py-3 text-text-primary hover:bg-surface hover:text-accent transition-smooth w-full text-left"
                  >
                    <Icon name="LogOut" size={20} />
                    <span className="font-body">Sign Out</span>
                  </button>
                ) : (
                  <Link 
                    to="/user-authentication-login-register"
                    className="flex items-center space-x-3 px-4 py-3 text-text-primary hover:bg-surface hover:text-accent transition-smooth"
                  >
                    <Icon name="User" size={20} />
                    <span className="font-body">Sign In</span>
                  </Link>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;