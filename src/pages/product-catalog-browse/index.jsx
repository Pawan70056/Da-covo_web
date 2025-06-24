import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';

import ProductCard from './components/ProductCard';
import FilterSidebar from './components/FilterSidebar';
import FilterChips from './components/FilterChips';
import SortDropdown from './components/SortDropdown';
import LoadingSkeleton from './components/LoadingSkeleton';

const ProductCatalogBrowse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    brands: [],
    sizes: [],
    colors: [],
    priceRange: { min: 0, max: 1000 },
    rating: 0
  });

  const productsPerPage = 12;

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "Classic White T-Shirt",
      brand: "Da'covo",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.5,
      reviewCount: 128,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      category: "T-Shirts",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["White", "Black", "Gray"],
      isNew: false,
      isSale: true,
      isWishlisted: false
    },
    {
      id: 2,
      name: "Denim Jacket",
      brand: "Urban Style",
      price: 89.99,
      originalPrice: null,
      rating: 4.8,
      reviewCount: 89,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=500&fit=crop",
      category: "Jackets",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Blue", "Black"],
      isNew: true,
      isSale: false,
      isWishlisted: true
    },
    {
      id: 3,
      name: "Summer Floral Dress",
      brand: "Bloom Fashion",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.3,
      reviewCount: 156,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop",
      category: "Dresses",
      sizes: ["XS", "S", "M", "L"],
      colors: ["Floral", "Pink", "Blue"],
      isNew: false,
      isSale: true,
      isWishlisted: false
    },
    {
      id: 4,
      name: "Casual Chinos",
      brand: "Comfort Wear",
      price: 59.99,
      originalPrice: null,
      rating: 4.6,
      reviewCount: 203,
      image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop",
      category: "Pants",
      sizes: ["28", "30", "32", "34", "36"],
      colors: ["Khaki", "Navy", "Black"],
      isNew: false,
      isSale: false,
      isWishlisted: false
    },
    {
      id: 5,
      name: "Striped Long Sleeve",
      brand: "Maritime Co",
      price: 45.99,
      originalPrice: 55.99,
      rating: 4.4,
      reviewCount: 92,
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop",
      category: "T-Shirts",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Navy/White", "Red/White"],
      isNew: false,
      isSale: true,
      isWishlisted: true
    },
    {
      id: 6,
      name: "Leather Boots",
      brand: "Heritage Shoes",
      price: 149.99,
      originalPrice: null,
      rating: 4.7,
      reviewCount: 67,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop",
      category: "Shoes",
      sizes: ["7", "8", "9", "10", "11"],
      colors: ["Brown", "Black"],
      isNew: true,
      isSale: false,
      isWishlisted: false
    },
    {
      id: 7,
      name: "Knit Sweater",
      brand: "Cozy Knits",
      price: 69.99,
      originalPrice: 89.99,
      rating: 4.2,
      reviewCount: 134,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop",
      category: "Sweaters",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Cream", "Gray", "Navy"],
      isNew: false,
      isSale: true,
      isWishlisted: false
    },
    {
      id: 8,
      name: "Athletic Shorts",
      brand: "Active Wear",
      price: 34.99,
      originalPrice: null,
      rating: 4.5,
      reviewCount: 178,
      image: "https://images.unsplash.com/photo-1506629905607-d9b1f65dd72b?w=400&h=500&fit=crop",
      category: "Shorts",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Navy", "Gray"],
      isNew: false,
      isSale: false,
      isWishlisted: false
    },
    {
      id: 9,
      name: "Silk Blouse",
      brand: "Elegant Wear",
      price: 95.99,
      originalPrice: 120.99,
      rating: 4.6,
      reviewCount: 85,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
      category: "Blouses",
      sizes: ["XS", "S", "M", "L"],
      colors: ["White", "Cream", "Pink"],
      isNew: true,
      isSale: true,
      isWishlisted: true
    },
    {
      id: 10,
      name: "Cargo Pants",
      brand: "Utility Style",
      price: 74.99,
      originalPrice: null,
      rating: 4.3,
      reviewCount: 112,
      image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop",
      category: "Pants",
      sizes: ["28", "30", "32", "34", "36"],
      colors: ["Olive", "Black", "Khaki"],
      isNew: false,
      isSale: false,
      isWishlisted: false
    },
    {
      id: 11,
      name: "Polo Shirt",
      brand: "Classic Polo",
      price: 49.99,
      originalPrice: 64.99,
      rating: 4.4,
      reviewCount: 156,
      image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop",
      category: "Polo",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["White", "Navy", "Red"],
      isNew: false,
      isSale: true,
      isWishlisted: false
    },
    {
      id: 12,
      name: "Maxi Dress",
      brand: "Bohemian Style",
      price: 89.99,
      originalPrice: null,
      rating: 4.7,
      reviewCount: 98,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop",
      category: "Dresses",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Floral", "Solid Blue", "Black"],
      isNew: true,
      isSale: false,
      isWishlisted: true
    }
  ];

  // Initialize products and apply filters
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...products];

    // Apply category filter
    if (activeFilters.categories.length > 0) {
      filtered = filtered.filter(product => 
        activeFilters.categories.includes(product.category)
      );
    }

    // Apply brand filter
    if (activeFilters.brands.length > 0) {
      filtered = filtered.filter(product => 
        activeFilters.brands.includes(product.brand)
      );
    }

    // Apply size filter
    if (activeFilters.sizes.length > 0) {
      filtered = filtered.filter(product => 
        product.sizes.some(size => activeFilters.sizes.includes(size))
      );
    }

    // Apply color filter
    if (activeFilters.colors.length > 0) {
      filtered = filtered.filter(product => 
        product.colors.some(color => activeFilters.colors.includes(color))
      );
    }

    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= activeFilters.priceRange.min && 
      product.price <= activeFilters.priceRange.max
    );

    // Apply rating filter
    if (activeFilters.rating > 0) {
      filtered = filtered.filter(product => product.rating >= activeFilters.rating);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.isNew - a.isNew);
        break;
      default:
        // relevance - keep original order
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, activeFilters, sortBy]);

  const handleFilterChange = useCallback((newFilters) => {
    setActiveFilters(newFilters);
  }, []);

  const handleSortChange = useCallback((newSort) => {
    setSortBy(newSort);
  }, []);

  const handleWishlistToggle = useCallback((productId) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, isWishlisted: !product.isWishlisted }
          : product
      )
    );
  }, []);

  const handleLoadMore = useCallback(() => {
    if (isLoadingMore || !hasMoreProducts) return;
    
    setIsLoadingMore(true);
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setIsLoadingMore(false);
      
      // Simulate end of products
      if (currentPage >= 3) {
        setHasMoreProducts(false);
      }
    }, 1000);
  }, [isLoadingMore, hasMoreProducts, currentPage]);

  const displayedProducts = filteredProducts.slice(0, currentPage * productsPerPage);

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage-landing' },
    { label: 'Catalog', path: '/product-catalog-browse' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb customItems={breadcrumbItems} />
          
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-heading font-heading-semibold text-text-primary mb-2">
              Browse Products
            </h1>
            <p className="text-text-secondary font-body">
              Discover our latest collection of fashion essentials
            </p>
          </div>

          {/* Filter Chips */}
          <FilterChips 
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />

          {/* Mobile Filter Button & Sort */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-surface border border-subtle rounded-sm font-body hover:bg-opacity-80 transition-smooth"
            >
              <Icon name="Filter" size={20} />
              <span>Filters</span>
            </button>
            
            <SortDropdown 
              value={sortBy}
              onChange={handleSortChange}
              resultsCount={filteredProducts.length}
            />
          </div>

          <div className="flex gap-6">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <FilterSidebar 
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                products={products}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Desktop Sort */}
              <div className="hidden lg:flex items-center justify-between mb-6">
                <p className="text-text-secondary font-body">
                  Showing {displayedProducts.length} of {filteredProducts.length} products
                </p>
                <SortDropdown 
                  value={sortBy}
                  onChange={handleSortChange}
                  resultsCount={filteredProducts.length}
                />
              </div>

              {/* Products Grid */}
              {isLoading ? (
                <LoadingSkeleton />
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <Icon name="Search" size={64} className="mx-auto text-text-secondary mb-4" />
                  <h3 className="text-xl font-heading font-heading-medium text-text-primary mb-2">
                    No products found
                  </h3>
                  <p className="text-text-secondary font-body mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <button
                    onClick={() => setActiveFilters({
                      categories: [],
                      brands: [],
                      sizes: [],
                      colors: [],
                      priceRange: { min: 0, max: 1000 },
                      rating: 0
                    })}
                    className="px-6 py-2 bg-primary text-background rounded-sm font-body font-body-medium hover:bg-opacity-90 transition-smooth"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {displayedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onWishlistToggle={handleWishlistToggle}
                      />
                    ))}
                  </div>

                  {/* Load More */}
                  {hasMoreProducts && displayedProducts.length < filteredProducts.length && (
                    <div className="text-center mt-12">
                      <button
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        className="px-8 py-3 bg-primary text-background rounded-sm font-body font-body-medium hover:bg-opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoadingMore ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                            <span>Loading...</span>
                          </div>
                        ) : (
                          'Load More Products'
                        )}
                      </button>
                    </div>
                  )}

                  {/* Loading More Skeleton */}
                  {isLoadingMore && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-6">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="animate-pulse">
                          <div className="bg-surface rounded-sm aspect-[3/4] mb-3" />
                          <div className="space-y-2">
                            <div className="h-4 bg-surface rounded w-3/4" />
                            <div className="h-4 bg-surface rounded w-1/2" />
                            <div className="h-4 bg-surface rounded w-1/4" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-modal lg:hidden">
          <div className="absolute inset-0 bg-primary bg-opacity-50" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-background shadow-elevation-3 overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-subtle">
              <h2 className="text-lg font-heading font-heading-semibold text-text-primary">
                Filters
              </h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-text-secondary hover:text-text-primary transition-smooth"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            <div className="p-4">
              <FilterSidebar 
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                products={products}
                onClose={() => setIsMobileFilterOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCatalogBrowse;