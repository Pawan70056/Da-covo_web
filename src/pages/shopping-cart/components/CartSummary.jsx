import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const CartSummary = ({
  subtotal,
  tax,
  shipping,
  discount,
  total,
  promoCode,
  setPromoCode,
  appliedPromo,
  isPromoLoading,
  onApplyPromo,
  onRemovePromo,
  itemCount,
  hasOutOfStockItems
}) => {
  const handlePromoSubmit = (e) => {
    e.preventDefault();
    onApplyPromo();
  };

  return (
    <div className="bg-background border border-subtle rounded-lg p-6 sticky top-24">
      <h2 className="text-lg font-heading font-heading-medium text-text-primary mb-6">
        Order Summary
      </h2>

      {/* Order Details */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="font-body text-text-secondary">
            Subtotal ({itemCount} items)
          </span>
          <span className="font-data text-text-primary">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center text-success">
            <span className="font-body">
              Discount ({appliedPromo.code})
            </span>
            <span className="font-data">
              -${discount.toFixed(2)}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="font-body text-text-secondary">
            Estimated Tax
          </span>
          <span className="font-data text-text-primary">
            ${tax.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <span className="font-body text-text-secondary">Shipping</span>
            {shipping === 0 && (
              <span className="text-xs bg-success text-background px-2 py-0.5 rounded font-body">
                FREE
              </span>
            )}
          </div>
          <span className="font-data text-text-primary">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        {subtotal > 0 && subtotal < 75 && shipping > 0 && (
          <div className="text-xs text-text-secondary font-body bg-surface p-3 rounded">
            <Icon name="Truck" size={16} className="inline mr-1" />
            Add ${(75 - subtotal).toFixed(2)} more for free shipping
          </div>
        )}

        <div className="border-t border-subtle pt-4">
          <div className="flex justify-between items-center">
            <span className="font-heading font-heading-medium text-text-primary">
              Total
            </span>
            <span className="font-data text-xl font-data-normal text-text-primary">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Promo Code Section */}
      <div className="mb-6">
        {appliedPromo ? (
          <div className="flex items-center justify-between p-3 bg-success bg-opacity-10 border border-success rounded">
            <div className="flex items-center space-x-2">
              <Icon name="Tag" size={16} className="text-success" />
              <span className="font-body text-sm text-success">
                {appliedPromo.description}
              </span>
            </div>
            <button
              onClick={onRemovePromo}
              className="text-success hover:text-opacity-80 transition-smooth"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        ) : (
          <form onSubmit={handlePromoSubmit} className="space-y-3">
            <div className="flex space-x-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="flex-1 px-3 py-2 border border-subtle rounded font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-smooth"
              />
              <button
                type="submit"
                disabled={!promoCode.trim() || isPromoLoading}
                className="px-4 py-2 bg-secondary text-background rounded font-body text-sm hover:bg-opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPromoLoading ? (
                  <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Apply'
                )}
              </button>
            </div>
            <p className="text-xs text-text-secondary font-body">
              Try: SAVE10, WELCOME20, or FREESHIP
            </p>
          </form>
        )}
      </div>

      {/* Checkout Button */}
      <div className="space-y-4">
        <button
          disabled={itemCount === 0 || hasOutOfStockItems}
          className="w-full bg-primary text-background py-3 px-4 rounded font-body font-body-medium hover:bg-opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {hasOutOfStockItems ? 'Remove Out of Stock Items' : 'Proceed to Checkout'}
        </button>

        <Link
          to="/product-catalog-browse"
          className="block w-full text-center py-3 px-4 border border-subtle rounded font-body text-text-primary hover:bg-surface transition-smooth"
        >
          Continue Shopping
        </Link>
      </div>

      {/* Security Badges */}
      <div className="mt-6 pt-6 border-t border-subtle">
        <div className="flex items-center justify-center space-x-4 text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={16} />
            <span className="text-xs font-body">Secure</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={16} />
            <span className="text-xs font-body">Encrypted</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="CreditCard" size={16} />
            <span className="text-xs font-body">Protected</span>
          </div>
        </div>
      </div>

      {/* Guest Checkout Option */}
      <div className="mt-4 text-center">
        <p className="text-xs text-text-secondary font-body mb-2">
          Don't have an account?
        </p>
        <Link
          to="/user-authentication-login-register"
          className="text-accent hover:underline text-sm font-body-medium"
        >
          Sign up for faster checkout
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;