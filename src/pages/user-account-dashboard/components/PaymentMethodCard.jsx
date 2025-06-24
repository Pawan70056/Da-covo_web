import React from 'react';
import Icon from 'components/AppIcon';

const PaymentMethodCard = ({ method }) => {
  const handleEdit = () => {
    console.log('Edit payment method:', method.id);
  };

  const handleDelete = () => {
    console.log('Delete payment method:', method.id);
  };

  const handleSetDefault = () => {
    console.log('Set as default:', method.id);
  };

  const getCardIcon = (brand) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return 'CreditCard';
      case 'mastercard':
        return 'CreditCard';
      case 'amex':
        return 'CreditCard';
      default:
        return 'CreditCard';
    }
  };

  const getCardBrandColor = (brand) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return 'text-blue-600';
      case 'mastercard':
        return 'text-red-600';
      case 'amex':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-surface rounded-lg p-4 border border-subtle">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Icon 
            name={getCardIcon(method.brand)} 
            size={24} 
            className={getCardBrandColor(method.brand)} 
          />
          <div>
            <h3 className="font-body font-body-medium text-text-primary capitalize">
              {method.brand} •••• {method.last4}
            </h3>
            <p className="text-text-secondary text-sm font-body">
              Expires {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={handleEdit}
            className="p-1 text-text-secondary hover:text-accent transition-smooth"
          >
            <Icon name="Edit" size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-text-secondary hover:text-error transition-smooth"
          >
            <Icon name="Trash2" size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        {method.isDefault ? (
          <span className="bg-accent text-background px-3 py-1 rounded-sm text-xs font-body">
            Default Payment
          </span>
        ) : (
          <button
            onClick={handleSetDefault}
            className="py-1 px-3 border border-subtle rounded-sm font-body text-sm hover:bg-background transition-smooth"
          >
            Set as Default
          </button>
        )}
        
        <div className="flex items-center space-x-1 text-text-secondary">
          <Icon name="Shield" size={14} />
          <span className="text-xs font-body">Secured</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodCard;