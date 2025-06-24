import React, { useState, useEffect } from 'react';

import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import CartSummary from './components/CartSummary';
import RecommendedProducts from './components/RecommendedProducts';
import EmptyCart from './components/EmptyCart';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Classic White Cotton T-Shirt",
      brand: "Da'covo Essentials",
      price: 29.99,
      originalPrice: 39.99,
      quantity: 2,
      size: "M",
      color: "White",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      inStock: true,
      maxQuantity: 10,
      sku: "TSH-WHT-M-001"
    },
    {
      id: 2,
      name: "Premium Denim Jacket",
      brand: "Urban Collection",
      price: 89.99,
      originalPrice: 119.99,
      quantity: 1,
      size: "L",
      color: "Dark Blue",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
      inStock: true,
      maxQuantity: 5,
      sku: "JKT-DNM-L-002"
    },
    {
      id: 3,
      name: "Casual Summer Dress",
      brand: "Feminine Touch",
      price: 59.99,
      originalPrice: 79.99,
      quantity: 1,
      size: "S",
      color: "Floral Print",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
      inStock: false,
      maxQuantity: 0,
      sku: "DRS-FLR-S-003"
    }
  ]);

  const [savedItems, setSavedItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [isPromoLoading, setIsPromoLoading] = useState(false);
  const [removedItem, setRemovedItem] = useState(null);
  const [showUndoTimer, setShowUndoTimer] = useState(false);

  const validPromoCodes = {
    'SAVE10': { discount: 10, type: 'percentage', description: '10% off your order' },
    'WELCOME20': { discount: 20, type: 'percentage', description: '20% off for new customers' },
    'FREESHIP': { discount: 0, type: 'shipping', description: 'Free shipping on this order' }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shipping = appliedPromo?.type === 'shipping' ? 0 : (subtotal > 75 ? 0 : 9.99);
  const discount = appliedPromo ? 
    (appliedPromo.type === 'percentage' ? subtotal * (appliedPromo.discount / 100) : appliedPromo.discount) : 0;
  const total = subtotal + tax + shipping - discount;

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage-landing' },
    { label: 'Shopping Cart', path: '/shopping-cart' }
  ];

  useEffect(() => {
    let timer;
    if (showUndoTimer) {
      timer = setTimeout(() => {
        setShowUndoTimer(false);
        setRemovedItem(null);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showUndoTimer]);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveItem(itemId);
      return;
    }

    setCartItems(prev => 
      prev.map(item => {
        if (item.id === itemId) {
          const validQuantity = Math.min(newQuantity, item.maxQuantity);
          return { ...item, quantity: validQuantity };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (itemId) => {
    const itemToRemove = cartItems.find(item => item.id === itemId);
    setRemovedItem(itemToRemove);
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    setShowUndoTimer(true);
  };

  const handleUndoRemove = () => {
    if (removedItem) {
      setCartItems(prev => [...prev, removedItem]);
      setRemovedItem(null);
      setShowUndoTimer(false);
    }
  };

  const handleSaveForLater = (itemId) => {
    const itemToSave = cartItems.find(item => item.id === itemId);
    setSavedItems(prev => [...prev, itemToSave]);
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleMoveToCart = (itemId) => {
    const itemToMove = savedItems.find(item => item.id === itemId);
    setCartItems(prev => [...prev, itemToMove]);
    setSavedItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    
    setIsPromoLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const promo = validPromoCodes[promoCode.toUpperCase()];
    if (promo) {
      setAppliedPromo({ ...promo, code: promoCode.toUpperCase() });
      setPromoCode('');
    } else {
      alert('Invalid promo code. Try SAVE10, WELCOME20, or FREESHIP');
    }
    
    setIsPromoLoading(false);
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  if (cartItems.length === 0 && savedItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16 sm:pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb customItems={breadcrumbItems} />
            <EmptyCart />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 sm:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb customItems={breadcrumbItems} />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-heading font-heading-semibold text-text-primary mb-2">
              Shopping Cart
            </h1>
            <p className="text-text-secondary font-body">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          {/* Undo Notification */}
          {showUndoTimer && removedItem && (
            <div className="mb-6 p-4 bg-surface border border-subtle rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Trash2" size={20} className="text-text-secondary" />
                <span className="font-body text-text-primary">
                  "{removedItem.name}" removed from cart
                </span>
              </div>
              <button
                onClick={handleUndoRemove}
                className="text-accent hover:underline font-body-medium"
              >
                Undo
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Active Cart Items */}
              {cartItems.length > 0 && (
                <div className="bg-background border border-subtle rounded-lg p-6">
                  <h2 className="text-lg font-heading font-heading-medium text-text-primary mb-6">
                    Cart Items
                  </h2>
                  
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-subtle last:border-b-0 last:pb-0">
                        {/* Product Image */}
                        <div className="w-full sm:w-24 h-48 sm:h-24 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 space-y-3">
                          <div>
                            <h3 className="font-body font-body-medium text-text-primary">
                              {item.name}
                            </h3>
                            <p className="text-sm text-text-secondary font-body">
                              {item.brand}
                            </p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-sm text-text-secondary font-body">
                                Size: {item.size}
                              </span>
                              <span className="text-sm text-text-secondary font-body">
                                Color: {item.color}
                              </span>
                            </div>
                          </div>

                          {/* Stock Status */}
                          {!item.inStock && (
                            <div className="flex items-center space-x-2">
                              <Icon name="AlertCircle" size={16} className="text-error" />
                              <span className="text-sm text-error font-body">
                                Out of stock
                              </span>
                            </div>
                          )}

                          {/* Price and Quantity Controls */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center space-x-2">
                              <span className="font-data text-lg text-text-primary">
                                ${item.price.toFixed(2)}
                              </span>
                              {item.originalPrice > item.price && (
                                <span className="font-data text-sm text-text-secondary line-through">
                                  ${item.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center space-x-4">
                              {/* Quantity Controls */}
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  disabled={!item.inStock}
                                  className="w-8 h-8 flex items-center justify-center bg-surface border border-subtle rounded hover:bg-background transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <Icon name="Minus" size={14} />
                                </button>
                                <span className="font-data text-sm w-12 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  disabled={!item.inStock || item.quantity >= item.maxQuantity}
                                  className="w-8 h-8 flex items-center justify-center bg-surface border border-subtle rounded hover:bg-background transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <Icon name="Plus" size={14} />
                                </button>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleSaveForLater(item.id)}
                                  className="text-text-secondary hover:text-accent transition-smooth"
                                  title="Save for later"
                                >
                                  <Icon name="Heart" size={18} />
                                </button>
                                <button
                                  onClick={() => handleRemoveItem(item.id)}
                                  className="text-text-secondary hover:text-error transition-smooth"
                                  title="Remove item"
                                >
                                  <Icon name="Trash2" size={18} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Items */}
              {savedItems.length > 0 && (
                <div className="bg-background border border-subtle rounded-lg p-6">
                  <h2 className="text-lg font-heading font-heading-medium text-text-primary mb-6">
                    Saved for Later ({savedItems.length})
                  </h2>
                  
                  <div className="space-y-4">
                    {savedItems.map((item) => (
                      <div key={`saved-${item.id}`} className="flex items-center gap-4 p-4 bg-surface rounded-lg">
                        <div className="w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-body font-body-medium text-text-primary text-sm">
                            {item.name}
                          </h4>
                          <p className="text-xs text-text-secondary font-body">
                            {item.brand} • Size: {item.size}
                          </p>
                          <span className="font-data text-sm text-text-primary">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <button
                          onClick={() => handleMoveToCart(item.id)}
                          className="px-3 py-1.5 text-sm bg-primary text-background rounded font-body hover:bg-opacity-90 transition-smooth"
                        >
                          Move to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <CartSummary
                subtotal={subtotal}
                tax={tax}
                shipping={shipping}
                discount={discount}
                total={total}
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                appliedPromo={appliedPromo}
                isPromoLoading={isPromoLoading}
                onApplyPromo={handleApplyPromo}
                onRemovePromo={handleRemovePromo}
                itemCount={cartItems.length}
                hasOutOfStockItems={cartItems.some(item => !item.inStock)}
              />
            </div>
          </div>

          {/* Recommended Products */}
          <div className="mt-12">
            <RecommendedProducts />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShoppingCart;