import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import RecentActivity from './components/RecentActivity';
import QuickActionCard from './components/QuickActionCard';
import OrderHistoryCard from './components/OrderHistoryCard';
import WishlistItem from './components/WishlistItem';
import AddressCard from './components/AddressCard';
import PaymentMethodCard from './components/PaymentMethodCard';

const UserAccountDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    memberSince: '2022-03-15',
    totalOrders: 24,
    totalSpent: 1847.50,
    loyaltyPoints: 2450,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  });

  const [quickActions] = useState([
    {
      id: 1,
      title: 'Recent Orders',
      count: 3,
      icon: 'Package',
      color: 'bg-blue-50 text-blue-600',
      link: '#orders'
    },
    {
      id: 2,
      title: 'Wishlist Items',
      count: 12,
      icon: 'Heart',
      color: 'bg-red-50 text-red-600',
      link: '#wishlist'
    },
    {
      id: 3,
      title: 'Loyalty Points',
      count: user.loyaltyPoints,
      icon: 'Star',
      color: 'bg-yellow-50 text-yellow-600',
      link: '#rewards'
    },
    {
      id: 4,
      title: 'Saved Addresses',
      count: 2,
      icon: 'MapPin',
      color: 'bg-green-50 text-green-600',
      link: '#addresses'
    }
  ]);

  const [recentOrders] = useState([
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 129.99,
      items: 3,
      trackingNumber: 'TRK123456789',
      estimatedDelivery: '2024-01-18',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop'
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-20',
      status: 'shipped',
      total: 89.50,
      items: 2,
      trackingNumber: 'TRK987654321',
      estimatedDelivery: '2024-01-25',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=80&h=80&fit=crop'
    },
    {
      id: 'ORD-2024-003',
      date: '2024-01-22',
      status: 'processing',
      total: 199.99,
      items: 1,
      trackingNumber: null,
      estimatedDelivery: '2024-01-28',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=80&h=80&fit=crop'
    }
  ]);

  const [wishlistItems] = useState([
    {
      id: 1,
      name: 'Classic Denim Jacket',
      price: 89.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=200&h=200&fit=crop',
      inStock: true,
      priceDropped: true,
      brand: "Da'covo"
    },
    {
      id: 2,
      name: 'Silk Blouse',
      price: 65.00,
      originalPrice: 65.00,
      image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=200&h=200&fit=crop',
      inStock: false,
      priceDropped: false,
      brand: 'Elegant'
    },
    {
      id: 3,
      name: 'Leather Boots',
      price: 149.99,
      originalPrice: 179.99,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop',
      inStock: true,
      priceDropped: true,
      brand: 'Urban'
    }
  ]);

  const [addresses] = useState([
    {
      id: 1,
      type: 'home',
      name: 'Home Address',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      isDefault: true
    },
    {
      id: 2,
      type: 'work',
      name: 'Work Address',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'United States',
      isDefault: false
    }
  ]);

  const [paymentMethods] = useState([
    {
      id: 1,
      type: 'card',
      brand: 'visa',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    },
    {
      id: 2,
      type: 'card',
      brand: 'mastercard',
      last4: '8888',
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false
    }
  ]);

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'orders', label: 'Order History', icon: 'Package' },
    { id: 'wishlist', label: 'Wishlist', icon: 'Heart' },
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'addresses', label: 'Addresses', icon: 'MapPin' },
    { id: 'payments', label: 'Payment Methods', icon: 'CreditCard' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage-landing' },
    { label: 'Account Dashboard', path: '/user-account-dashboard' }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setIsSidebarOpen(false);
  };

  const renderOverviewSection = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-background">
        <div className="flex items-center space-x-4">
          <Image
            src={user.avatar}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-16 h-16 rounded-full object-cover border-2 border-background"
          />
          <div>
            <h1 className="text-2xl font-heading font-heading-semibold">
              Welcome back, {user.firstName}!
            </h1>
            <p className="text-background opacity-90 font-body">
              Member since {new Date(user.memberSince).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-data font-data-normal">{user.totalOrders}</div>
            <div className="text-sm opacity-90">Total Orders</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-data font-data-normal">${user.totalSpent.toFixed(2)}</div>
            <div className="text-sm opacity-90">Total Spent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-data font-data-normal">{user.loyaltyPoints}</div>
            <div className="text-sm opacity-90">Loyalty Points</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-heading font-heading-semibold text-text-primary mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <QuickActionCard
              key={action.id}
              action={action}
              onClick={() => handleSectionChange(action.link.replace('#', ''))}
            />
          ))}
        </div>
      </div>

      {/* Recent Orders Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-heading-semibold text-text-primary">
            Recent Orders
          </h2>
          <button
            onClick={() => handleSectionChange('orders')}
            className="text-accent hover:underline font-body-medium"
          >
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentOrders.slice(0, 2).map((order) => (
            <OrderHistoryCard key={order.id} order={order} />
          ))}
        </div>
      </div>

      {/* Recommended Products */}
      <div>
        <h2 className="text-xl font-heading font-heading-semibold text-text-primary mb-4">
          Recommended for You
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <Link
              key={item}
              to="/product-detail"
              className="bg-surface rounded-lg p-4 hover:shadow-elevation-2 transition-smooth"
            >
              <Image
                src={`https://images.unsplash.com/photo-${1540518614846 + item}-e08b4cac3105?w=200&h=200&fit=crop`}
                alt={`Recommended Product ${item}`}
                className="w-full h-32 object-cover rounded-sm mb-3"
              />
              <h3 className="font-body font-body-medium text-text-primary text-sm mb-1">
                Product {item}
              </h3>
              <p className="font-data text-accent">${(29.99 + item * 10).toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOrdersSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading font-heading-semibold text-text-primary">
          Order History
        </h2>
        <div className="flex items-center space-x-4">
          <select className="px-3 py-2 border border-subtle rounded-sm font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent">
            <option>All Orders</option>
            <option>Delivered</option>
            <option>Shipped</option>
            <option>Processing</option>
          </select>
        </div>
      </div>
      <div className="space-y-4">
        {recentOrders.map((order) => (
          <OrderHistoryCard key={order.id} order={order} detailed />
        ))}
      </div>
    </div>
  );

  const renderWishlistSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading font-heading-semibold text-text-primary">
          My Wishlist
        </h2>
        <p className="text-text-secondary font-body">
          {wishlistItems.length} items
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <WishlistItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );

  const renderProfileSection = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-heading font-heading-semibold text-text-primary">
        Profile Information
      </h2>
      
      <div className="bg-surface rounded-lg p-6">
        <div className="flex items-center space-x-6 mb-6">
          <Image
            src={user.avatar}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-heading font-heading-medium text-text-primary">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-text-secondary font-body">{user.email}</p>
            <button className="text-accent hover:underline font-body-medium mt-1">
              Change Photo
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-body font-body-medium text-text-primary mb-2">
              First Name
            </label>
            <input
              type="text"
              value={user.firstName}
              className="w-full px-3 py-2 border border-subtle rounded-sm font-body focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-body font-body-medium text-text-primary mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={user.lastName}
              className="w-full px-3 py-2 border border-subtle rounded-sm font-body focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-body font-body-medium text-text-primary mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={user.email}
              className="w-full px-3 py-2 border border-subtle rounded-sm font-body focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-body font-body-medium text-text-primary mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={user.phone}
              className="w-full px-3 py-2 border border-subtle rounded-sm font-body focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button className="bg-primary text-background px-6 py-2 rounded-sm font-body font-body-medium hover:bg-opacity-90 transition-smooth">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const renderAddressesSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading font-heading-semibold text-text-primary">
          Saved Addresses
        </h2>
        <button className="bg-primary text-background px-4 py-2 rounded-sm font-body font-body-medium hover:bg-opacity-90 transition-smooth">
          Add New Address
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <AddressCard key={address.id} address={address} />
        ))}
      </div>
    </div>
  );

  const renderPaymentsSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading font-heading-semibold text-text-primary">
          Payment Methods
        </h2>
        <button className="bg-primary text-background px-4 py-2 rounded-sm font-body font-body-medium hover:bg-opacity-90 transition-smooth">
          Add New Card
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentMethods.map((method) => (
          <PaymentMethodCard key={method.id} method={method} />
        ))}
      </div>
    </div>
  );

  const renderSettingsSection = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-heading font-heading-semibold text-text-primary">
        Account Settings
      </h2>
      
      <div className="space-y-6">
        {/* Password Change */}
        <div className="bg-surface rounded-lg p-6">
          <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-4">
            Change Password
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-body font-body-medium text-text-primary mb-2">
                Current Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-subtle rounded-sm font-body focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-body font-body-medium text-text-primary mb-2">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-subtle rounded-sm font-body focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-body font-body-medium text-text-primary mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-subtle rounded-sm font-body focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <button className="bg-primary text-background px-6 py-2 rounded-sm font-body font-body-medium hover:bg-opacity-90 transition-smooth">
              Update Password
            </button>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-surface rounded-lg p-6">
          <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-4">
            Notification Preferences
          </h3>
          <div className="space-y-4">
            {[
              { id: 'email-orders', label: 'Order updates via email', checked: true },
              { id: 'email-promotions', label: 'Promotional emails', checked: false },
              { id: 'sms-orders', label: 'Order updates via SMS', checked: true },
              { id: 'push-notifications', label: 'Push notifications', checked: true }
            ].map((pref) => (
              <div key={pref.id} className="flex items-center justify-between">
                <label className="font-body text-text-primary">{pref.label}</label>
                <input
                  type="checkbox"
                  defaultChecked={pref.checked}
                  className="w-4 h-4 text-accent border-subtle rounded focus:ring-accent"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'orders':
        return renderOrdersSection();
      case 'wishlist':
        return renderWishlistSection();
      case 'profile':
        return renderProfileSection();
      case 'addresses':
        return renderAddressesSection();
      case 'payments':
        return renderPaymentsSection();
      case 'settings':
        return renderSettingsSection();
      default:
        return renderOverviewSection();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb customItems={breadcrumbItems} />
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="flex items-center space-x-2 w-full bg-surface border border-subtle rounded-sm px-4 py-3 font-body hover:bg-opacity-80 transition-smooth"
              >
                <Icon name="Menu" size={20} />
                <span>Account Menu</span>
                <Icon name="ChevronDown" size={16} className={`ml-auto transition-smooth ${isSidebarOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Sidebar */}
            <div className={`lg:w-64 lg:flex-shrink-0 ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-surface rounded-lg p-4 sticky top-24">
                <nav className="space-y-2">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSectionChange(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-sm font-body transition-smooth ${
                        activeSection === item.id
                          ? 'bg-primary text-background' :'text-text-primary hover:bg-background'
                      }`}
                    >
                      <Icon name={item.icon} size={20} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountDashboard;