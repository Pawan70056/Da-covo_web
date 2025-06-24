import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const EmptyCart = () => {
  const trendingCategories = [
    {
      id: 1,
      name: "Women\'s Dresses",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop",
      itemCount: 156,
      path: "/product-catalog-browse?category=dresses"
    },
    {
      id: 2,
      name: "Men\'s T-Shirts",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
      itemCount: 89,
      path: "/product-catalog-browse?category=tshirts"
    },
    {
      id: 3,
      name: "Denim Collection",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop",
      itemCount: 67,
      path: "/product-catalog-browse?category=denim"
    },
    {
      id: 4,
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
      itemCount: 234,
      path: "/product-catalog-browse?category=accessories"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Summer Essential Tee",
      price: 24.99,
      originalPrice: 34.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=250&h=250&fit=crop",
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Casual Denim Jacket",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=250&h=250&fit=crop",
      badge: "30% Off"
    },
    {
      id: 3,
      name: "Elegant Midi Dress",
      price: 59.99,
      originalPrice: 59.99,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=250&h=250&fit=crop",
      badge: "New Arrival"
    }
  ];

  return (
    <div className="text-center py-12">
      {/* Empty Cart Icon and Message */}
      <div className="mb-12">
        <div className="w-24 h-24 mx-auto mb-6 bg-surface rounded-full flex items-center justify-center">
          <Icon name="ShoppingBag" size={48} className="text-text-secondary" />
        </div>
        <h1 className="text-2xl font-heading font-heading-semibold text-text-primary mb-4">
          Your cart is empty
        </h1>
        <p className="text-text-secondary font-body max-w-md mx-auto mb-8">
          Looks like you haven't added anything to your cart yet. Start shopping to fill it up with amazing products!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/product-catalog-browse"
            className="inline-flex items-center justify-center space-x-2 bg-primary text-background px-6 py-3 rounded font-body font-body-medium hover:bg-opacity-90 transition-smooth"
          >
            <Icon name="Grid3X3" size={20} />
            <span>Browse Products</span>
          </Link>
          <Link
            to="/homepage-landing"
            className="inline-flex items-center justify-center space-x-2 border border-subtle text-text-primary px-6 py-3 rounded font-body hover:bg-surface transition-smooth"
          >
            <Icon name="Home" size={20} />
            <span>Go Home</span>
          </Link>
        </div>
      </div>

      {/* Trending Categories */}
      <div className="mb-12">
        <h2 className="text-xl font-heading font-heading-medium text-text-primary mb-6">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingCategories.map((category) => (
            <Link
              key={category.id}
              to={category.path}
              className="group bg-background border border-subtle rounded-lg overflow-hidden hover:shadow-elevation-2 transition-smooth"
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
              </div>
              <div className="p-4">
                <h3 className="font-body font-body-medium text-text-primary group-hover:text-accent transition-smooth">
                  {category.name}
                </h3>
                <p className="text-sm text-text-secondary font-body">
                  {category.itemCount} items
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="mb-12">
        <h2 className="text-xl font-heading font-heading-medium text-text-primary mb-6">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-background border border-subtle rounded-lg overflow-hidden hover:shadow-elevation-2 transition-smooth group"
            >
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                </div>
                <span className="absolute top-3 left-3 bg-accent text-background text-xs font-body px-2 py-1 rounded">
                  {product.badge}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-body font-body-medium text-text-primary mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-data text-text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="font-data text-sm text-text-secondary line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to="/product-detail"
                    className="flex-1 text-center py-2 px-3 border border-subtle rounded font-body text-sm hover:bg-surface transition-smooth"
                  >
                    View Details
                  </Link>
                  <button className="flex-1 py-2 px-3 bg-primary text-background rounded font-body text-sm hover:bg-opacity-90 transition-smooth">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Offers */}
      <div className="bg-surface border border-subtle rounded-lg p-8">
        <Icon name="Gift" size={32} className="mx-auto text-accent mb-4" />
        <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-2">
          Special Offers Just for You
        </h3>
        <p className="text-text-secondary font-body mb-6">
          Sign up for our newsletter and get 20% off your first purchase plus exclusive access to sales and new arrivals.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 border border-subtle rounded font-body focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-smooth"
          />
          <button className="px-6 py-3 bg-primary text-background rounded font-body font-body-medium hover:bg-opacity-90 transition-smooth">
            Get 20% Off
          </button>
        </div>
        <p className="text-xs text-text-secondary font-body mt-3">
          By subscribing, you agree to our privacy policy and terms of service.
        </p>
      </div>
    </div>
  );
};

export default EmptyCart;