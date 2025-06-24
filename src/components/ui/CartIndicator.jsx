import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const CartIndicator = ({ 
  itemCount = 0, 
  showDropdown = false, 
  className = "",
  size = "default" 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Classic White T-Shirt",
      price: 29.99,
      quantity: 2,
      image: "/assets/images/product-1.jpg",
      size: "M"
    },
    {
      id: 2,
      name: "Denim Jacket",
      price: 89.99,
      quantity: 1,
      image: "/assets/images/product-2.jpg",
      size: "L"
    }
  ]);

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } else {
      setCartItems(prev => 
        prev.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const sizeClasses = {
    small: "w-4 h-4 text-xs",
    default: "w-5 h-5 text-xs",
    large: "w-6 h-6 text-sm"
  };

  const iconSizes = {
    small: 16,
    default: 20,
    large: 24
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.cart-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <div className={`relative cart-dropdown ${className}`}>
      {showDropdown ? (
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 text-text-primary hover:text-accent transition-smooth relative"
        >
          <div className="relative">
            <Icon name="ShoppingBag" size={iconSizes[size]} />
            {itemCount > 0 && (
              <span className={`absolute -top-2 -right-2 bg-accent text-background font-data font-data-normal rounded-full flex items-center justify-center ${sizeClasses[size]}`}>
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </div>
          <span className="font-body text-sm hidden sm:block">Cart</span>
          <Icon name="ChevronDown" size={16} className={`transition-smooth hidden sm:block ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
      ) : (
        <Link 
          to="/shopping-cart"
          className="flex items-center space-x-2 text-text-primary hover:text-accent transition-smooth relative"
        >
          <div className="relative">
            <Icon name="ShoppingBag" size={iconSizes[size]} />
            {itemCount > 0 && (
              <span className={`absolute -top-2 -right-2 bg-accent text-background font-data font-data-normal rounded-full flex items-center justify-center ${sizeClasses[size]}`}>
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </div>
          <span className="font-body text-sm hidden sm:block">Cart</span>
        </Link>
      )}

      {/* Dropdown Menu */}
      {showDropdown && isDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-background border border-subtle rounded-lg shadow-elevation-2 z-dropdown">
          <div className="p-4">
            <h3 className="font-heading font-heading-medium text-text-primary mb-4">
              Shopping Cart ({itemCount} items)
            </h3>
            
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="ShoppingBag" size={48} className="mx-auto text-text-secondary mb-4" />
                <p className="text-text-secondary font-body">Your cart is empty</p>
                <Link 
                  to="/product-catalog-browse"
                  className="inline-block mt-4 text-accent hover:underline font-body-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-surface rounded-sm">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-sm"
                        onError={(e) => {
                          e.target.src = "/assets/images/no_image.png";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-body font-body-medium text-text-primary text-sm truncate">
                          {item.name}
                        </h4>
                        <p className="text-text-secondary text-xs font-body">
                          Size: {item.size}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="font-data text-sm text-text-primary">
                            ${item.price.toFixed(2)}
                          </span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center bg-background border border-subtle rounded text-text-secondary hover:text-text-primary transition-smooth"
                            >
                              <Icon name="Minus" size={12} />
                            </button>
                            <span className="font-data text-sm w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center bg-background border border-subtle rounded text-text-secondary hover:text-text-primary transition-smooth"
                            >
                              <Icon name="Plus" size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-text-secondary hover:text-error transition-smooth"
                      >
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="border-t border-subtle pt-4 mt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-body font-body-medium text-text-primary">
                      Total:
                    </span>
                    <span className="font-data font-data-normal text-lg text-text-primary">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <Link
                      to="/shopping-cart"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block w-full text-center py-2 px-4 border border-subtle rounded-sm font-body hover:bg-surface transition-smooth"
                    >
                      View Cart
                    </Link>
                    <button className="w-full bg-primary text-background py-2 px-4 rounded-sm font-body font-body-medium hover:bg-opacity-90 transition-smooth">
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartIndicator;