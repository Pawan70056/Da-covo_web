import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ProductCarousel = ({ products = [] }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [wishlistItems, setWishlistItems] = useState(new Set());
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = 280; // Card width + gap
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleScrollUpdate = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setScrollPosition(container.scrollLeft);
    }
  };

  const toggleWishlist = (productId) => {
    setWishlistItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleQuickAdd = (product) => {
    console.log('Quick add to cart:', product);
    // Add to cart logic here
  };

  if (!products.length) {
    return (
      <div className="text-center py-8">
        <p className="text-text-secondary font-body">No products available</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <button
        onClick={() => handleScroll('left')}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-10 h-10 bg-background border border-subtle rounded-full flex items-center justify-center shadow-elevation-1 hover:shadow-elevation-2 transition-smooth z-10 opacity-0 group-hover:opacity-100"
        style={{ opacity: scrollPosition > 0 ? 1 : 0.5 }}
      >
        <Icon name="ChevronLeft" size={20} className="text-text-primary" />
      </button>
      
      <button
        onClick={() => handleScroll('right')}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-10 h-10 bg-background border border-subtle rounded-full flex items-center justify-center shadow-elevation-1 hover:shadow-elevation-2 transition-smooth z-10"
      >
        <Icon name="ChevronRight" size={20} className="text-text-primary" />
      </button>

      {/* Products Container */}
      <div className="group">
        <div
          ref={scrollContainerRef}
          onScroll={handleScrollUpdate}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-64 bg-background border border-subtle rounded-lg overflow-hidden hover:shadow-elevation-2 transition-smooth group/card"
            >
              {/* Product Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Link to={`/product-detail?id=${product.id}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-smooth"
                  />
                </Link>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col space-y-1">
                  {product.isNew && (
                    <span className="bg-accent text-background text-xs font-body font-body-medium px-2 py-1 rounded">
                      New
                    </span>
                  )}
                  {product.isSale && (
                    <span className="bg-error text-background text-xs font-body font-body-medium px-2 py-1 rounded">
                      Sale
                    </span>
                  )}
                  {product.isTrending && (
                    <span className="bg-success text-background text-xs font-body font-body-medium px-2 py-1 rounded">
                      Trending
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-warning text-background text-xs font-body font-body-medium px-2 py-1 rounded">
                      -{product.discount}%
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-background bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-smooth"
                >
                  <Icon 
                    name={wishlistItems.has(product.id) ? "Heart" : "Heart"} 
                    size={16} 
                    className={wishlistItems.has(product.id) ? "text-error fill-current" : "text-text-secondary"} 
                  />
                </button>

                {/* Quick Add Button */}
                <button
                  onClick={() => handleQuickAdd(product)}
                  className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-primary text-background px-4 py-2 rounded-sm font-body font-body-medium opacity-0 group-hover/card:opacity-100 transition-smooth"
                >
                  Quick Add
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <p className="text-text-secondary text-sm font-body">{product.brand}</p>
                  <Link 
                    to={`/product-detail?id=${product.id}`}
                    className="text-text-primary font-body font-body-medium hover:text-accent transition-smooth line-clamp-2"
                  >
                    {product.name}
                  </Link>
                </div>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center space-x-1 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={12}
                          className={i < Math.floor(product.rating) 
                            ? "text-accent fill-current" :"text-text-secondary"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-text-secondary text-xs font-body">
                      ({product.reviews})
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-text-primary font-data font-data-normal text-lg">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-text-secondary font-data text-sm line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;