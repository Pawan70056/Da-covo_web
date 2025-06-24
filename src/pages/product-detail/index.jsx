// src/pages/product-detail/index.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';


import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import RecentlyViewed from './components/RecentlyViewed';
import SizeGuideModal from './components/SizeGuideModal';

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id');
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [stockNotification, setStockNotification] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Mock product data
  const mockProduct = {
    id: parseInt(productId) || 1,
    name: "Classic White Cotton T-Shirt",
    brand: "Da'covo",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.5,
    reviewCount: 128,
    images: [
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?w=800&h=1000&fit=crop",
      "https://images.pixabay.com/photo/2016/12/06/09/31/blank-1886001_1280.jpg?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?w=800&h=1000&fit=crop"
    ],
    description: "Premium quality cotton t-shirt with a classic fit. Made from 100% organic cotton, this versatile piece is perfect for everyday wear. Features reinforced seams, pre-shrunk fabric, and a comfortable crew neck design.",
    features: [
      "100% Organic Cotton",
      "Pre-shrunk Fabric",
      "Reinforced Seams",
      "Classic Fit",
      "Machine Washable"
    ],
    colors: [
      { name: 'White', value: '#FFFFFF', available: true },
      { name: 'Black', value: '#000000', available: true },
      { name: 'Gray', value: '#6B7280', available: false },
      { name: 'Navy', value: '#1F2937', available: true }
    ],
    sizes: [
      { name: 'XS', available: true, stock: 5 },
      { name: 'S', available: true, stock: 12 },
      { name: 'M', available: true, stock: 8 },
      { name: 'L', available: false, stock: 0 },
      { name: 'XL', available: true, stock: 3 },
      { name: 'XXL', available: true, stock: 2 }
    ],
    category: "T-Shirts",
    sku: "TSH-001-WHT",
    inStock: true,
    totalStock: 30,
    careInstructions: [
      "Machine wash cold with like colors",
      "Do not bleach",
      "Tumble dry low",
      "Iron on low heat if needed",
      "Do not dry clean"
    ],
    sizeChart: {
      XS: { chest: "32-34", length: "26", sleeve: "8" },
      S: { chest: "34-36", length: "27", sleeve: "8.5" },
      M: { chest: "36-38", length: "28", sleeve: "9" },
      L: { chest: "38-40", length: "29", sleeve: "9.5" },
      XL: { chest: "40-42", length: "30", sleeve: "10" },
      XXL: { chest: "42-44", length: "31", sleeve: "10.5" }
    },
    reviews: [
      {
        id: 1,
        user: "Sarah M.",
        rating: 5,
        comment: "Perfect fit and great quality! The fabric is soft and comfortable.",
        date: "2024-01-15",
        verified: true,
        helpful: 12,
        images: ["https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?w=200&h=200&fit=crop"]
      },
      {
        id: 2,
        user: "Mike R.",
        rating: 4,
        comment: "Good quality shirt, runs slightly large. Would recommend sizing down.",
        date: "2024-01-10",
        verified: true,
        helpful: 8,
        images: []
      },
      {
        id: 3,
        user: "Emma L.",
        rating: 5,
        comment: "Love this t-shirt! Washes well and maintains its shape.",
        date: "2024-01-08",
        verified: true,
        helpful: 15,
        images: ["https://images.pixabay.com/photo/2016/12/06/09/31/blank-1886001_1280.jpg?w=200&h=200&fit=crop"]
      }
    ]
  };

  const recentlyViewedProducts = [
    {
      id: 2,
      name: "Denim Jacket",
      brand: "Urban Style",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=500&fit=crop",
      rating: 4.8
    },
    {
      id: 3,
      name: "Summer Floral Dress",
      brand: "Bloom Fashion",
      price: 79.99,
      image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?w=400&h=500&fit=crop",
      rating: 4.3
    },
    {
      id: 4,
      name: "Casual Sneakers",
      brand: "ComfortWalk",
      price: 119.99,
      image: "https://images.pixabay.com/photo/2016/11/19/18/06/feet-1840619_1280.jpg?w=400&h=500&fit=crop",
      rating: 4.7
    },
    {
      id: 5,
      name: "Leather Handbag",
      brand: "Luxe",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop",
      rating: 4.9
    }
  ];

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setProduct(mockProduct);
      setSelectedColor(mockProduct.colors?.[0]?.name || '');
      setIsWishlisted(false);
      setIsLoading(false);
    }, 1000);
  }, [productId]);

  const handleColorSelect = (colorName) => {
    const color = product?.colors?.find(c => c.name === colorName);
    if (color?.available) {
      setSelectedColor(colorName);
      // Reset size selection when color changes
      setSelectedSize('');
    }
  };

  const handleSizeSelect = (sizeName) => {
    const size = product?.sizes?.find(s => s.name === sizeName);
    if (size?.available) {
      setSelectedSize(sizeName);
      if (size.stock <= 5) {
        setStockNotification(`Only ${size.stock} left in stock!`);
      } else {
        setStockNotification('');
      }
    }
  };

  const handleQuantityChange = (newQuantity) => {
    const selectedSizeData = product?.sizes?.find(s => s.name === selectedSize);
    const maxStock = selectedSizeData?.stock || 1;
    
    if (newQuantity >= 1 && newQuantity <= maxStock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select color and size');
      return;
    }
    
    const cartItem = {
      productId: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      image: product.images?.[0]
    };
    
    console.log('Adding to cart:', cartItem);
    // Here you would typically dispatch to cart state or call API
  };

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
    console.log('Wishlist toggled:', !isWishlisted);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: `Check out this ${product?.name} from ${product?.brand}`,
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback to copying URL
      navigator.clipboard?.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  const applyPromoCode = () => {
    if (promoCode.trim()) {
      console.log('Applying promo code:', promoCode);
      // Here you would validate and apply the promo code
    }
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage-landing' },
    { label: 'Catalog', path: '/product-catalog-browse' },
    { label: product?.name || 'Product Details', path: `/product-detail?id=${productId}` }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="animate-pulse">
              <div className="h-4 bg-surface rounded w-1/3 mb-6"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="aspect-square bg-surface rounded-sm"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-surface rounded w-3/4"></div>
                  <div className="h-6 bg-surface rounded w-1/2"></div>
                  <div className="h-4 bg-surface rounded w-1/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-surface rounded"></div>
                    <div className="h-4 bg-surface rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center py-16">
              <Icon name="AlertCircle" size={64} className="mx-auto text-text-secondary mb-4" />
              <h2 className="text-2xl font-heading font-heading-semibold text-text-primary mb-2">
                Product Not Found
              </h2>
              <p className="text-text-secondary font-body mb-6">
                The product you're looking for doesn't exist or has been removed.
              </p>
              <Link
                to="/product-catalog-browse"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-background rounded-sm font-body font-body-medium hover:bg-opacity-90 transition-smooth"
              >
                <Icon name="ArrowLeft" size={20} />
                <span>Back to Catalog</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb customItems={breadcrumbItems} />
          
          {/* Product Detail Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Product Images */}
            <ProductImageGallery 
              images={product.images}
              productName={product.name}
              activeIndex={activeImageIndex}
              onImageChange={setActiveImageIndex}
            />
            
            {/* Product Information */}
            <ProductInfo 
              product={product}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              quantity={quantity}
              isWishlisted={isWishlisted}
              stockNotification={stockNotification}
              promoCode={promoCode}
              onColorSelect={handleColorSelect}
              onSizeSelect={handleSizeSelect}
              onQuantityChange={handleQuantityChange}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              onShare={handleShare}
              onShowSizeGuide={() => setShowSizeGuide(true)}
              onPromoCodeChange={setPromoCode}
              onApplyPromoCode={applyPromoCode}
            />
          </div>
          
          {/* Product Details Tabs */}
          <ProductTabs product={product} />
          
          {/* Recently Viewed Products */}
          <RecentlyViewed products={recentlyViewedProducts} />
        </div>
      </main>
      
      {/* Size Guide Modal */}
      {showSizeGuide && (
        <SizeGuideModal 
          isOpen={showSizeGuide}
          onClose={() => setShowSizeGuide(false)}
          sizeChart={product.sizeChart}
          productName={product.name}
        />
      )}
    </div>
  );
};

export default ProductDetail;