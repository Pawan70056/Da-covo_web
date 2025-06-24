import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ProductCard = ({ product, onWishlistToggle }) => {
  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onWishlistToggle(product.id);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={12} className="text-accent fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={12} className="text-accent fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-text-secondary" />
      );
    }

    return stars;
  };

  return (
    <Link 
      to={`/product-detail?id=${product.id}`}
      className="group block bg-background rounded-sm overflow-hidden hover:shadow-elevation-2 transition-smooth"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-surface">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product.isNew && (
            <span className="px-2 py-1 bg-success text-background text-xs font-body font-body-medium rounded">
              New
            </span>
          )}
          {product.isSale && (
            <span className="px-2 py-1 bg-error text-background text-xs font-body font-body-medium rounded">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-2 right-2 w-8 h-8 bg-background bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-smooth"
        >
          <Icon 
            name="Heart" 
            size={16} 
            className={`transition-smooth ${
              product.isWishlisted 
                ? 'text-error fill-current' :'text-text-secondary hover:text-error'
            }`}
          />
        </button>

        {/* Quick View on Hover (Desktop) */}
        <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-smooth hidden sm:block">
          <button className="w-full py-2 bg-primary text-background text-sm font-body font-body-medium rounded-sm hover:bg-opacity-90 transition-smooth">
            Quick View
          </button>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        {/* Brand */}
        <p className="text-xs sm:text-sm text-text-secondary font-body mb-1">
          {product.brand}
        </p>

        {/* Product Name */}
        <h3 className="text-sm sm:text-base font-body font-body-medium text-text-primary mb-2 line-clamp-2 group-hover:text-accent transition-smooth">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex items-center space-x-0.5">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs text-text-secondary font-body">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-base sm:text-lg font-data font-data-normal text-text-primary">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-text-secondary font-data line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Available Sizes (Mobile) */}
        <div className="mt-2 sm:hidden">
          <p className="text-xs text-text-secondary font-body">
            Sizes: {product.sizes.slice(0, 3).join(', ')}
            {product.sizes.length > 3 && '...'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;