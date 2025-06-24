// src/pages/product-detail/components/RecentlyViewed.jsx
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RecentlyViewed = ({ products }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const currentScroll = scrollRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
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

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-subtle pt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-heading font-heading-semibold text-text-primary">
          Recently Viewed
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 bg-surface hover:bg-subtle rounded-full flex items-center justify-center transition-smooth"
          >
            <Icon name="ChevronLeft" size={16} className="text-text-primary" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 bg-surface hover:bg-subtle rounded-full flex items-center justify-center transition-smooth"
          >
            <Icon name="ChevronRight" size={16} className="text-text-primary" />
          </button>
        </div>
      </div>
      
      <div className="relative">
        <div 
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product-detail?id=${product.id}`}
              className="flex-shrink-0 w-48 sm:w-56 group block bg-background rounded-sm overflow-hidden hover:shadow-elevation-2 transition-smooth"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-surface">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-300"
                />
                
                {/* Quick View on Hover */}
                <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-smooth">
                  <button className="w-full py-2 bg-primary text-background text-sm font-body font-body-medium rounded-sm hover:bg-opacity-90 transition-smooth">
                    Quick View
                  </button>
                </div>
              </div>
              
              <div className="p-3">
                {/* Brand */}
                <p className="text-xs text-text-secondary font-body mb-1">
                  {product.brand}
                </p>
                
                {/* Product Name */}
                <h3 className="text-sm font-body font-body-medium text-text-primary mb-2 line-clamp-2 group-hover:text-accent transition-smooth">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex items-center space-x-0.5">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs text-text-secondary font-body">
                    ({product.rating})
                  </span>
                </div>
                
                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-base font-data font-data-normal text-text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-text-secondary font-data line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default RecentlyViewed;