import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const WishlistItem = ({ item }) => {
  const handleRemoveFromWishlist = (e) => {
    e.preventDefault();
    console.log('Remove from wishlist:', item.id);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    console.log('Add to cart:', item.id);
  };

  return (
    <div className="bg-surface rounded-lg overflow-hidden border border-subtle hover:shadow-elevation-2 transition-smooth">
      <div className="relative">
        <Link to="/product-detail">
          <Image
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover"
          />
        </Link>
        <button
          onClick={handleRemoveFromWishlist}
          className="absolute top-2 right-2 w-8 h-8 bg-background bg-opacity-90 rounded-full flex items-center justify-center text-text-secondary hover:text-error transition-smooth"
        >
          <Icon name="X" size={16} />
        </button>
        {item.priceDropped && (
          <div className="absolute top-2 left-2 bg-error text-background px-2 py-1 rounded-sm text-xs font-body">
            Price Drop!
          </div>
        )}
        {!item.inStock && (
          <div className="absolute inset-0 bg-primary bg-opacity-50 flex items-center justify-center">
            <span className="bg-background text-text-primary px-3 py-1 rounded-sm font-body font-body-medium text-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <p className="text-text-secondary text-xs font-body">{item.brand}</p>
          <Link to="/product-detail">
            <h3 className="font-body font-body-medium text-text-primary hover:text-accent transition-smooth">
              {item.name}
            </h3>
          </Link>
        </div>
        
        <div className="flex items-center space-x-2 mb-3">
          <span className="font-data text-lg text-text-primary">
            ${item.price.toFixed(2)}
          </span>
          {item.originalPrice > item.price && (
            <span className="font-data text-sm text-text-secondary line-through">
              ${item.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleAddToCart}
            disabled={!item.inStock}
            className={`flex-1 py-2 px-3 rounded-sm font-body font-body-medium text-sm transition-smooth ${
              item.inStock
                ? 'bg-primary text-background hover:bg-opacity-90' :'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {item.inStock ? 'Add to Cart' : 'Notify When Available'}
          </button>
          <Link
            to="/product-detail"
            className="p-2 border border-subtle rounded-sm text-text-secondary hover:text-text-primary hover:bg-background transition-smooth"
          >
            <Icon name="Eye" size={16} />
          </Link>
        </div>
        
        {!item.inStock && (
          <div className="mt-2 flex items-center space-x-1 text-text-secondary">
            <Icon name="Bell" size={12} />
            <span className="text-xs font-body">Get notified when back in stock</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistItem;