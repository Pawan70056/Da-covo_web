import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RecommendedProducts = () => {
  const recommendedProducts = [
    {
      id: 101,
      name: "Casual Striped Shirt",
      brand: "Da'covo Basics",
      price: 34.99,
      originalPrice: 44.99,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 128,
      isNew: false,
      onSale: true
    },
    {
      id: 102,
      name: "Comfortable Joggers",
      brand: "Active Wear Co",
      price: 42.99,
      originalPrice: 42.99,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop",
      rating: 4.3,
      reviews: 89,
      isNew: true,
      onSale: false
    },
    {
      id: 103,
      name: "Elegant Blazer",
      brand: "Professional Line",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 203,
      isNew: false,
      onSale: true
    },
    {
      id: 104,
      name: "Summer Floral Top",
      brand: "Feminine Touch",
      price: 28.99,
      originalPrice: 28.99,
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop",
      rating: 4.4,
      reviews: 156,
      isNew: true,
      onSale: false
    }
  ];

  const recentlyViewed = [
    {
      id: 201,
      name: "Classic Black Jeans",
      brand: "Denim Co",
      price: 54.99,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop"
    },
    {
      id: 202,
      name: "Cozy Knit Sweater",
      brand: "Winter Collection",
      price: 67.99,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop"
    },
    {
      id: 203,
      name: "Athletic Sneakers",
      brand: "Sport Plus",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop"
    }
  ];

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    // Add to cart logic here
  };

  const handleAddToWishlist = (product) => {
    console.log('Adding to wishlist:', product);
    // Add to wishlist logic here
  };

  const ProductCard = ({ product, isCompact = false }) => (
    <div className={`bg-background border border-subtle rounded-lg overflow-hidden hover:shadow-elevation-2 transition-smooth group ${isCompact ? 'p-3' : 'p-4'}`}>
      <div className="relative">
        <div className={`relative overflow-hidden rounded-lg ${isCompact ? 'h-32' : 'h-48'}`}>
          <Image
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-accent text-background text-xs font-body px-2 py-1 rounded">
              New
            </span>
          )}
          {product.onSale && (
            <span className="absolute top-2 right-2 bg-error text-background text-xs font-body px-2 py-1 rounded">
              Sale
            </span>
          )}
        </div>
        
        {!isCompact && (
          <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-20 transition-smooth flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex space-x-2">
              <button
                onClick={() => handleAddToCart(product)}
                className="p-2 bg-background rounded-full shadow-elevation-2 hover:bg-surface transition-smooth"
                title="Add to cart"
              >
                <Icon name="ShoppingBag" size={16} />
              </button>
              <button
                onClick={() => handleAddToWishlist(product)}
                className="p-2 bg-background rounded-full shadow-elevation-2 hover:bg-surface transition-smooth"
                title="Add to wishlist"
              >
                <Icon name="Heart" size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={`${isCompact ? 'mt-2' : 'mt-4'}`}>
        <Link to="/product-detail" className="block">
          <h3 className={`font-body font-body-medium text-text-primary hover:text-accent transition-smooth ${isCompact ? 'text-sm' : 'text-base'}`}>
            {product.name}
          </h3>
          <p className={`text-text-secondary font-body ${isCompact ? 'text-xs' : 'text-sm'} mt-1`}>
            {product.brand}
          </p>
        </Link>

        <div className={`flex items-center justify-between ${isCompact ? 'mt-2' : 'mt-3'}`}>
          <div className="flex items-center space-x-2">
            <span className={`font-data text-text-primary ${isCompact ? 'text-sm' : 'text-base'}`}>
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <span className={`font-data text-text-secondary line-through ${isCompact ? 'text-xs' : 'text-sm'}`}>
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {!isCompact && product.rating && (
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-accent fill-current" />
              <span className="text-xs font-data text-text-secondary">
                {product.rating} ({product.reviews})
              </span>
            </div>
          )}
        </div>

        {isCompact && (
          <button
            onClick={() => handleAddToCart(product)}
            className="w-full mt-2 py-1.5 bg-primary text-background rounded text-xs font-body hover:bg-opacity-90 transition-smooth"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Recently Viewed */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-heading font-heading-medium text-text-primary">
            Recently Viewed
          </h2>
          <Link
            to="/product-catalog-browse"
            className="text-accent hover:underline font-body text-sm"
          >
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {recentlyViewed.map((product) => (
            <ProductCard key={product.id} product={product} isCompact={true} />
          ))}
        </div>
      </div>

      {/* Recommended Products */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-heading font-heading-medium text-text-primary">
            You Might Also Like
          </h2>
          <Link
            to="/product-catalog-browse"
            className="text-accent hover:underline font-body text-sm"
          >
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-surface border border-subtle rounded-lg p-6 text-center">
        <Icon name="Mail" size={32} className="mx-auto text-accent mb-4" />
        <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-2">
          Stay Updated
        </h3>
        <p className="text-text-secondary font-body mb-4">
          Get notified about new arrivals, sales, and exclusive offers
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-subtle rounded font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-smooth"
          />
          <button className="px-6 py-2 bg-primary text-background rounded font-body font-body-medium hover:bg-opacity-90 transition-smooth">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendedProducts;