import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const banners = [
    {
      id: 1,
      title: "Summer Collection 2024",
      subtitle: "Discover the latest trends",
      description: "Fresh styles for the season ahead. Shop our curated collection of summer essentials.",
      ctaText: "Shop Now",
      ctaLink: "/product-catalog-browse?category=summer",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
      textPosition: "left",
      overlay: "dark"
    },
    {
      id: 2,
      title: "Up to 50% Off",
      subtitle: "End of Season Sale",
      description: "Don\'t miss out on incredible savings across all categories. Limited time only.",
      ctaText: "Shop Sale",
      ctaLink: "/product-catalog-browse?category=sale",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=600&fit=crop",
      textPosition: "center",
      overlay: "light"
    },
    {
      id: 3,
      title: "New Arrivals",
      subtitle: "Just Dropped",
      description: "Be the first to wear the latest fashion. Exclusive pieces now available.",
      ctaText: "Explore",
      ctaLink: "/product-catalog-browse?category=new-arrivals",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=600&fit=crop",
      textPosition: "right",
      overlay: "dark"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, banners.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentBanner = banners[currentSlide];

  return (
    <section className="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Banner Images */}
      <div className="relative w-full h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 ${
              banner.overlay === 'dark' ?'bg-black bg-opacity-40' :'bg-white bg-opacity-20'
            }`} />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className={`max-w-lg ${
            currentBanner.textPosition === 'center' ?'mx-auto text-center' 
              : currentBanner.textPosition === 'right' ?'ml-auto text-right' :'text-left'
          }`}>
            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-heading font-heading-semibold mb-4 ${
              currentBanner.overlay === 'dark' ? 'text-white' : 'text-text-primary'
            }`}>
              {currentBanner.title}
            </h1>
            <p className={`text-lg sm:text-xl font-heading font-heading-medium mb-2 ${
              currentBanner.overlay === 'dark' ? 'text-gray-200' : 'text-text-secondary'
            }`}>
              {currentBanner.subtitle}
            </p>
            <p className={`text-base sm:text-lg font-body mb-8 ${
              currentBanner.overlay === 'dark' ? 'text-gray-300' : 'text-text-secondary'
            }`}>
              {currentBanner.description}
            </p>
            <Link
              to={currentBanner.ctaLink}
              className="inline-flex items-center space-x-2 bg-accent text-background px-8 py-3 rounded-sm font-body font-body-medium hover:bg-opacity-90 transition-smooth"
            >
              <span>{currentBanner.ctaText}</span>
              <Icon name="ArrowRight" size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-smooth backdrop-blur-sm"
      >
        <Icon name="ChevronLeft" size={24} className="text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-smooth backdrop-blur-sm"
      >
        <Icon name="ChevronRight" size={24} className="text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-smooth ${
              index === currentSlide 
                ? 'bg-white' :'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-smooth backdrop-blur-sm"
        >
          <Icon 
            name={isAutoPlaying ? "Pause" : "Play"} 
            size={16} 
            className="text-white" 
          />
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;