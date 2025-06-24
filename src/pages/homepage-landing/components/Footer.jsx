import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Shop",
      links: [
        { label: "Women\'s Fashion", href: "/product-catalog-browse?category=women" },
        { label: "Men\'s Fashion", href: "/product-catalog-browse?category=men" },
        { label: "Accessories", href: "/product-catalog-browse?category=accessories" },
        { label: "Shoes", href: "/product-catalog-browse?category=shoes" },
        { label: "Sale", href: "/product-catalog-browse?category=sale" }
      ]
    },
    {
      title: "Customer Service",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "Size Guide", href: "/size-guide" },
        { label: "Shipping Info", href: "/shipping" },
        { label: "Returns & Exchanges", href: "/returns" },
        { label: "FAQ", href: "/faq" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" },
        { label: "Sustainability", href: "/sustainability" },
        { label: "Store Locator", href: "/stores" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Accessibility", href: "/accessibility" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", href: "https://facebook.com/stylehub" },
    { name: "Instagram", icon: "Instagram", href: "https://instagram.com/stylehub" },
    { name: "Twitter", icon: "Twitter", href: "https://twitter.com/stylehub" },
    { name: "Pinterest", icon: "PinIcon", href: "https://pinterest.com/stylehub" },
    { name: "YouTube", icon: "Youtube", href: "https://youtube.com/stylehub" }
  ];

  const paymentMethods = [
    { name: "Visa", icon: "CreditCard" },
    { name: "Mastercard", icon: "CreditCard" },
    { name: "American Express", icon: "CreditCard" },
    { name: "PayPal", icon: "Wallet" },
    { name: "Apple Pay", icon: "Smartphone" },
    { name: "Google Pay", icon: "Smartphone" }
  ];

  return (
    <footer className="bg-primary text-background">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/homepage-landing" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
                <span className="text-background font-heading font-heading-semibold text-sm">S</span>
              </div>
              <span className="font-heading font-heading-semibold text-xl text-background">
                Da'covo
              </span>
            </Link>
            <p className="text-gray-300 font-body text-sm mb-6 max-w-xs">
              Your destination for fashion-forward clothing and accessories. Discover your style with our curated collections.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full flex items-center justify-center transition-smooth"
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={16} className="text-background" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="font-heading font-heading-medium text-background mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-accent font-body text-sm transition-smooth"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-white border-opacity-10 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h3 className="font-heading font-heading-medium text-background mb-2">
                Stay Updated
              </h3>
              <p className="text-gray-300 font-body text-sm">
                Subscribe to our newsletter for exclusive offers and style tips.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-sm text-background placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-smooth"
              />
              <button className="bg-accent text-background px-6 py-2 rounded-sm font-body font-body-medium hover:bg-opacity-90 transition-smooth whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white border-opacity-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 mb-4 sm:mb-0">
              <p className="text-gray-300 font-body text-sm">
                © {currentYear} StyleHub. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <Link
                  to="/privacy"
                  className="text-gray-300 hover:text-accent font-body text-sm transition-smooth"
                >
                  Privacy
                </Link>
                <Link
                  to="/terms"
                  className="text-gray-300 hover:text-accent font-body text-sm transition-smooth"
                >
                  Terms
                </Link>
                <Link
                  to="/cookies"
                  className="text-gray-300 hover:text-accent font-body text-sm transition-smooth"
                >
                  Cookies
                </Link>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-300 font-body text-sm mr-2">We accept:</span>
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="w-8 h-6 bg-white bg-opacity-10 rounded flex items-center justify-center"
                  title={method.name}
                >
                  <Icon name={method.icon} size={12} className="text-background" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;