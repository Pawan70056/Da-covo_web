// src/pages/product-detail/components/ProductInfo.jsx
import React from 'react';
import Icon from 'components/AppIcon';

const ProductInfo = ({
  product,
  selectedColor,
  selectedSize,
  quantity,
  isWishlisted,
  stockNotification,
  promoCode,
  onColorSelect,
  onSizeSelect,
  onQuantityChange,
  onAddToCart,
  onAddToWishlist,
  onShare,
  onShowSizeGuide,
  onPromoCodeChange,
  onApplyPromoCode
}) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={16} className="text-accent fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={16} className="text-accent fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-text-secondary" />
      );
    }

    return stars;
  };

  const selectedSizeData = product?.sizes?.find(s => s.name === selectedSize);
  const maxQuantity = selectedSizeData?.stock || 1;
  const canAddToCart = selectedColor && selectedSize && product?.inStock;

  return (
    <div className="space-y-6">
      {/* Brand and Product Name */}
      <div>
        <p className="text-text-secondary font-body font-body-medium mb-1">
          {product?.brand}
        </p>
        <h1 className="text-2xl sm:text-3xl font-heading font-heading-semibold text-text-primary mb-2">
          {product?.name}
        </h1>
        <p className="text-sm text-text-secondary font-body">
          SKU: {product?.sku}
        </p>
      </div>

      {/* Rating and Reviews */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <div className="flex items-center space-x-0.5">
            {renderStars(product?.rating || 0)}
          </div>
          <span className="text-sm text-text-secondary font-body ml-2">
            {product?.rating} ({product?.reviewCount} reviews)
          </span>
        </div>
        <button className="text-sm text-accent hover:text-primary transition-smooth font-body">
          Read Reviews
        </button>
      </div>

      {/* Price */}
      <div className="flex items-center space-x-3">
        <span className="text-2xl sm:text-3xl font-data font-data-normal text-text-primary">
          ${product?.price?.toFixed(2)}
        </span>
        {product?.originalPrice && (
          <>
            <span className="text-lg text-text-secondary font-data line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
            <span className="px-2 py-1 bg-error text-background text-sm font-body font-body-medium rounded">
              Save ${(product.originalPrice - product.price).toFixed(2)}
            </span>
          </>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center space-x-2">
        <Icon 
          name={product?.inStock ? "Check" : "X"} 
          size={16} 
          className={product?.inStock ? "text-success" : "text-error"} 
        />
        <span className={`text-sm font-body ${
          product?.inStock ? "text-success" : "text-error"
        }`}>
          {product?.inStock ? "In Stock" : "Out of Stock"}
        </span>
        {product?.totalStock && product.totalStock <= 10 && (
          <span className="text-sm text-warning font-body">
            - Only {product.totalStock} left!
          </span>
        )}
      </div>

      {/* Product Description */}
      <div>
        <p className="text-text-primary font-body leading-relaxed">
          {product?.description}
        </p>
      </div>

      {/* Key Features */}
      {product?.features && product.features.length > 0 && (
        <div>
          <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-3">
            Key Features
          </h3>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success flex-shrink-0" />
                <span className="text-sm text-text-primary font-body">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Color Selection */}
      {product?.colors && product.colors.length > 0 && (
        <div>
          <h3 className="text-base font-heading font-heading-medium text-text-primary mb-3">
            Color: {selectedColor && (
              <span className="font-body font-body-normal text-text-secondary">
                {selectedColor}
              </span>
            )}
          </h3>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => onColorSelect(color.name)}
                disabled={!color.available}
                className={`relative w-10 h-10 rounded-full border-2 transition-smooth ${
                  selectedColor === color.name 
                    ? 'border-accent scale-110' :'border-subtle hover:border-text-secondary'
                } ${
                  !color.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                {selectedColor === color.name && (
                  <Icon 
                    name="Check" 
                    size={16} 
                    className={`absolute inset-0 m-auto ${
                      color.value === '#FFFFFF' ? 'text-text-primary' : 'text-background'
                    }`} 
                  />
                )}
                {!color.available && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-0.5 bg-error rotate-45"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product?.sizes && product.sizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-heading font-heading-medium text-text-primary">
              Size: {selectedSize && (
                <span className="font-body font-body-normal text-text-secondary">
                  {selectedSize}
                </span>
              )}
            </h3>
            <button
              onClick={onShowSizeGuide}
              className="text-sm text-accent hover:text-primary transition-smooth font-body underline"
            >
              Size Guide
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {product.sizes.map((size) => (
              <button
                key={size.name}
                onClick={() => onSizeSelect(size.name)}
                disabled={!size.available}
                className={`px-4 py-3 border rounded-sm text-sm font-body font-body-medium transition-smooth ${
                  selectedSize === size.name
                    ? 'border-accent bg-accent text-background'
                    : size.available
                    ? 'border-subtle text-text-primary hover:border-accent hover:text-accent' :'border-subtle text-text-secondary cursor-not-allowed opacity-50'
                }`}
              >
                {size.name}
                {size.available && size.stock <= 3 && size.stock > 0 && (
                  <div className="text-xs text-warning mt-1">
                    {size.stock} left
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stock Notification */}
      {stockNotification && (
        <div className="flex items-center space-x-2 p-3 bg-warning bg-opacity-10 border border-warning rounded-sm">
          <Icon name="AlertTriangle" size={16} className="text-warning" />
          <span className="text-sm text-warning font-body">
            {stockNotification}
          </span>
        </div>
      )}

      {/* Quantity Selector */}
      <div>
        <h3 className="text-base font-heading font-heading-medium text-text-primary mb-3">
          Quantity
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-subtle rounded-sm">
            <button
              onClick={() => onQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="px-3 py-2 text-text-primary hover:bg-surface transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Minus" size={16} />
            </button>
            <span className="px-4 py-2 text-text-primary font-body font-body-medium">
              {quantity}
            </span>
            <button
              onClick={() => onQuantityChange(quantity + 1)}
              disabled={quantity >= maxQuantity}
              className="px-3 py-2 text-text-primary hover:bg-surface transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>
          {selectedSize && (
            <span className="text-sm text-text-secondary font-body">
              Max: {maxQuantity}
            </span>
          )}
        </div>
      </div>

      {/* Promo Code */}
      <div>
        <h3 className="text-base font-heading font-heading-medium text-text-primary mb-3">
          Promo Code
        </h3>
        <div className="flex space-x-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => onPromoCodeChange(e.target.value)}
            placeholder="Enter promo code"
            className="flex-1 px-3 py-2 border border-subtle rounded-sm font-body text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-smooth"
          />
          <button
            onClick={onApplyPromoCode}
            disabled={!promoCode.trim()}
            className="px-4 py-2 bg-accent text-background text-sm font-body font-body-medium rounded-sm hover:bg-opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <button
          onClick={onAddToCart}
          disabled={!canAddToCart}
          className="w-full px-8 py-4 bg-primary text-background text-base font-body font-body-semibold rounded-sm hover:bg-opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <Icon name="ShoppingBag" size={20} />
          <span>Add to Cart</span>
        </button>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onAddToWishlist}
            className={`px-4 py-3 border-2 rounded-sm text-sm font-body font-body-medium transition-smooth flex items-center justify-center space-x-2 ${
              isWishlisted
                ? 'border-error text-error bg-error bg-opacity-10' :'border-subtle text-text-primary hover:border-accent hover:text-accent'
            }`}
          >
            <Icon 
              name="Heart" 
              size={16} 
              className={isWishlisted ? 'fill-current' : ''} 
            />
            <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
          </button>
          
          <button
            onClick={onShare}
            className="px-4 py-3 border-2 border-subtle text-text-primary hover:border-accent hover:text-accent text-sm font-body font-body-medium rounded-sm transition-smooth flex items-center justify-center space-x-2"
          >
            <Icon name="Share2" size={16} />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="pt-6 border-t border-subtle space-y-3">
        <div className="flex items-center space-x-3 text-sm text-text-secondary font-body">
          <Icon name="Truck" size={16} />
          <span>Free shipping on orders over $50</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-text-secondary font-body">
          <Icon name="RotateCcw" size={16} />
          <span>30-day return policy</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-text-secondary font-body">
          <Icon name="Shield" size={16} />
          <span>1-year warranty included</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;