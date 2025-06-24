import React from 'react';
import { Link } from 'react-router-dom';
import Image from 'components/AppImage';

const CategoryTiles = () => {
  const categories = [
    {
      id: 1,
      name: "Women\'s Fashion",
      description: "Discover the latest trends in women\'s clothing",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop",
      link: "/product-catalog-browse?category=women",
      featured: true
    },
    {
      id: 2,
      name: "Men\'s Fashion",
      description: "Stylish and comfortable clothing for men",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      link: "/product-catalog-browse?category=men",
      featured: true
    },
    {
      id: 3,
      name: "Accessories",
      description: "Complete your look with our accessories",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop",
      link: "/product-catalog-browse?category=accessories",
      featured: false
    },
    {
      id: 4,
      name: "Shoes",
      description: "Step out in style with our footwear collection",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop",
      link: "/product-catalog-browse?category=shoes",
      featured: false
    },
    {
      id: 5,
      name: "Activewear",
      description: "Performance meets style in our activewear",
      image: "https://images.unsplash.com/photo-1506629905607-c52b1b3e7b5b?w=600&h=400&fit=crop",
      link: "/product-catalog-browse?category=activewear",
      featured: false
    },
    {
      id: 6,
      name: "Formal Wear",
      description: "Professional attire for every occasion",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=400&fit=crop",
      link: "/product-catalog-browse?category=formal",
      featured: false
    }
  ];

  return (
    <section className="bg-surface py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-heading-semibold text-text-primary mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-text-secondary font-body max-w-2xl mx-auto">
            Explore our curated collections designed to match your style and lifestyle
          </p>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden lg:grid grid-cols-12 gap-6 h-[600px]">
          {/* Featured Categories - Large Tiles */}
          <div className="col-span-6 grid grid-rows-2 gap-6">
            {categories.filter(cat => cat.featured).map((category) => (
              <Link
                key={category.id}
                to={category.link}
                className="relative group overflow-hidden rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-smooth"
              >
                <div className="absolute inset-0">
                  <Image
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-smooth" />
                </div>
                <div className="relative h-full flex items-end p-8">
                  <div className="text-white">
                    <h3 className="text-2xl font-heading font-heading-semibold mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-200 font-body">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Regular Categories - Small Tiles */}
          <div className="col-span-6 grid grid-cols-2 grid-rows-3 gap-6">
            {categories.filter(cat => !cat.featured).map((category) => (
              <Link
                key={category.id}
                to={category.link}
                className="relative group overflow-hidden rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-smooth"
              >
                <div className="absolute inset-0">
                  <Image
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-smooth" />
                </div>
                <div className="relative h-full flex items-end p-4">
                  <div className="text-white">
                    <h3 className="text-lg font-heading font-heading-semibold mb-1">
                      {category.name}
                    </h3>
                    <p className="text-gray-200 text-sm font-body">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Grid Layout */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="relative group overflow-hidden rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-smooth h-48 sm:h-56"
            >
              <div className="absolute inset-0">
                <Image
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-smooth" />
              </div>
              <div className="relative h-full flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-heading font-heading-semibold mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-200 font-body text-sm">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryTiles;