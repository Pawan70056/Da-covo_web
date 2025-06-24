import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from 'components/ui/Header';


import HeroBanner from './components/HeroBanner';
import ProductCarousel from './components/ProductCarousel';
import CategoryTiles from './components/CategoryTiles';
import NewsletterSignup from './components/NewsletterSignup';
import Footer from './components/Footer';

const HomepageLanding = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const newArrivals = [
    {
      id: 1,
      name: "Classic White T-Shirt",
      brand: "StyleHub",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      isNew: true,
      isSale: true,
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2,
      name: "Denim Jacket",
      brand: "Urban Style",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=500&fit=crop",
      isNew: true,
      rating: 4.8,
      reviews: 95
    },
    {
      id: 3,
      name: "Summer Floral Dress",
      brand: "Bloom",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop",
      isNew: true,
      rating: 4.6,
      reviews: 203
    },
    {
      id: 4,
      name: "Casual Sneakers",
      brand: "ComfortWalk",
      price: 119.99,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop",
      isNew: true,
      rating: 4.7,
      reviews: 156
    },
    {
      id: 5,
      name: "Leather Handbag",
      brand: "Luxe",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop",
      isNew: true,
      rating: 4.9,
      reviews: 87
    }
  ];

  const trendingNow = [
    {
      id: 6,
      name: "Oversized Hoodie",
      brand: "Cozy Co",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
      isTrending: true,
      rating: 4.4,
      reviews: 312
    },
    {
      id: 7,
      name: "High-Waist Jeans",
      brand: "Denim Dreams",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop",
      isTrending: true,
      rating: 4.6,
      reviews: 245
    },
    {
      id: 8,
      name: "Silk Blouse",
      brand: "Elegant",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
      isTrending: true,
      rating: 4.8,
      reviews: 178
    },
    {
      id: 9,
      name: "Athletic Shorts",
      brand: "ActiveWear",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1506629905607-c52b1b3e7b5b?w=400&h=500&fit=crop",
      isTrending: true,
      rating: 4.3,
      reviews: 189
    },
    {
      id: 10,
      name: "Statement Earrings",
      brand: "Sparkle",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop",
      isTrending: true,
      rating: 4.7,
      reviews: 134
    }
  ];

  const saleItems = [
    {
      id: 11,
      name: "Winter Coat",
      brand: "WarmUp",
      price: 149.99,
      originalPrice: 249.99,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=500&fit=crop",
      isSale: true,
      discount: 40,
      rating: 4.5,
      reviews: 267
    },
    {
      id: 12,
      name: "Formal Shirt",
      brand: "Business",
      price: 39.99,
      originalPrice: 59.99,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
      isSale: true,
      discount: 33,
      rating: 4.4,
      reviews: 198
    },
    {
      id: 13,
      name: "Yoga Pants",
      brand: "FlexFit",
      price: 29.99,
      originalPrice: 49.99,
      image: "https://images.unsplash.com/photo-1506629905607-c52b1b3e7b5b?w=400&h=500&fit=crop",
      isSale: true,
      discount: 40,
      rating: 4.6,
      reviews: 423
    },
    {
      id: 14,
      name: "Crossbody Bag",
      brand: "Carry",
      price: 49.99,
      originalPrice: 79.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
      isSale: true,
      discount: 38,
      rating: 4.3,
      reviews: 156
    },
    {
      id: 15,
      name: "Running Shoes",
      brand: "SpeedFit",
      price: 79.99,
      originalPrice: 129.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop",
      isSale: true,
      discount: 38,
      rating: 4.7,
      reviews: 289
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary font-body">Loading Da'covo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-14 sm:pt-16">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Product Carousels */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
          {/* New Arrivals */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-heading font-heading-semibold text-text-primary">
                New Arrivals
              </h2>
              <Link 
                to="/product-catalog-browse?category=new-arrivals"
                className="text-accent hover:text-primary transition-smooth font-body font-body-medium"
              >
                View All
              </Link>
            </div>
            <ProductCarousel products={newArrivals} />
          </section>

          {/* Trending Now */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-heading font-heading-semibold text-text-primary">
                Trending Now
              </h2>
              <Link 
                to="/product-catalog-browse?category=trending"
                className="text-accent hover:text-primary transition-smooth font-body font-body-medium"
              >
                View All
              </Link>
            </div>
            <ProductCarousel products={trendingNow} />
          </section>

          {/* Sale Items */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-heading font-heading-semibold text-text-primary">
                Sale Items
              </h2>
              <Link 
                to="/product-catalog-browse?category=sale"
                className="text-accent hover:text-primary transition-smooth font-body font-body-medium"
              >
                View All
              </Link>
            </div>
            <ProductCarousel products={saleItems} />
          </section>
        </div>

        {/* Category Tiles */}
        <CategoryTiles />

        {/* Newsletter Signup */}
        <NewsletterSignup />
      </main>

      <Footer />
    </div>
  );
};

export default HomepageLanding;