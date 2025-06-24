// src/pages/product-detail/components/ProductImageGallery.jsx
import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ProductImageGallery = ({ images, productName, activeIndex, onImageChange }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const imageRef = useRef(null);
  const galleryRef = useRef(null);

  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && activeIndex < images.length - 1) {
      onImageChange(activeIndex + 1);
    }
    if (isRightSwipe && activeIndex > 0) {
      onImageChange(activeIndex - 1);
    }
  };

  const handleMouseMove = (e) => {
    if (!isZoomed || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  const navigateImage = (direction) => {
    if (direction === 'prev' && activeIndex > 0) {
      onImageChange(activeIndex - 1);
    } else if (direction === 'next' && activeIndex < images.length - 1) {
      onImageChange(activeIndex + 1);
    }
  };

  const scrollThumbnails = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = 120;
      const currentScroll = galleryRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      galleryRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      } else if (e.key === 'Escape') {
        setIsZoomed(false);
      }
    };

    if (isZoomed) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isZoomed, activeIndex, images.length]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-surface rounded-sm overflow-hidden group">
        <div 
          ref={imageRef}
          className={`relative w-full h-full cursor-${isZoomed ? 'zoom-out' : 'zoom-in'}`}
          onClick={handleImageClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setIsZoomed(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={images?.[activeIndex]}
            alt={`${productName} - Image ${activeIndex + 1}`}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            style={isZoomed ? {
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
            } : {}}
          />
          
          {/* Navigation Arrows */}
          {images?.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
                disabled={activeIndex === 0}
                className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-background bg-opacity-90 rounded-full flex items-center justify-center transition-smooth hover:bg-opacity-100 ${
                  activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                <Icon name="ChevronLeft" size={20} className="text-text-primary" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                disabled={activeIndex === images.length - 1}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-background bg-opacity-90 rounded-full flex items-center justify-center transition-smooth hover:bg-opacity-100 ${
                  activeIndex === images.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                <Icon name="ChevronRight" size={20} className="text-text-primary" />
              </button>
            </>
          )}
          
          {/* Zoom Indicator */}
          {!isZoomed && (
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-smooth">
              <div className="px-2 py-1 bg-background bg-opacity-90 rounded text-xs font-body text-text-primary">
                Click to zoom
              </div>
            </div>
          )}
          
          {/* Image Counter */}
          {images?.length > 1 && (
            <div className="absolute bottom-4 right-4">
              <div className="px-3 py-1 bg-background bg-opacity-90 rounded-full text-sm font-body text-text-primary">
                {activeIndex + 1} / {images.length}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Thumbnail Gallery */}
      {images?.length > 1 && (
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => scrollThumbnails('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-background bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-smooth shadow-sm"
          >
            <Icon name="ChevronLeft" size={16} className="text-text-primary" />
          </button>
          
          <button
            onClick={() => scrollThumbnails('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-background bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-smooth shadow-sm"
          >
            <Icon name="ChevronRight" size={16} className="text-text-primary" />
          </button>
          
          <div 
            ref={galleryRef}
            className="flex space-x-2 overflow-x-auto scrollbar-hide px-8 py-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => onImageChange(index)}
                className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-sm overflow-hidden border-2 transition-smooth ${
                  index === activeIndex 
                    ? 'border-accent' :'border-transparent hover:border-subtle'
                }`}
              >
                <Image
                  src={image}
                  alt={`${productName} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
          
          {/* Dots Navigation (Mobile) */}
          <div className="flex justify-center space-x-2 mt-4 sm:hidden">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => onImageChange(index)}
                className={`w-2 h-2 rounded-full transition-smooth ${
                  index === activeIndex ? 'bg-accent' : 'bg-subtle hover:bg-text-secondary'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;