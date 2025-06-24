// src/pages/product-detail/components/ProductTabs.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [reviewFilter, setReviewFilter] = useState('all');
  const [reviewSort, setReviewSort] = useState('newest');

  const tabs = [
    { id: 'description', label: 'Description', icon: 'FileText' },
    { id: 'sizeChart', label: 'Size Chart', icon: 'Ruler' },
    { id: 'care', label: 'Care Instructions', icon: 'Info' },
    { id: 'reviews', label: `Reviews (${product?.reviewCount || 0})`, icon: 'MessageSquare' }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={14} className="text-accent fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={14} className="text-accent fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-text-secondary" />
      );
    }

    return stars;
  };

  const getFilteredAndSortedReviews = () => {
    let filtered = product?.reviews || [];
    
    // Apply rating filter
    if (reviewFilter !== 'all') {
      const targetRating = parseInt(reviewFilter);
      filtered = filtered.filter(review => Math.floor(review.rating) === targetRating);
    }
    
    // Apply sorting
    switch (reviewSort) {
      case 'newest':
        filtered = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        filtered = [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'highest':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        filtered = [...filtered].sort((a, b) => a.rating - b.rating);
        break;
      case 'helpful':
        filtered = [...filtered].sort((a, b) => b.helpful - a.helpful);
        break;
      default:
        break;
    }
    
    return filtered;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-4">
                Product Description
              </h3>
              <p className="text-text-primary font-body leading-relaxed mb-6">
                {product?.description}
              </p>
            </div>
            
            {product?.features && product.features.length > 0 && (
              <div>
                <h4 className="text-base font-heading font-heading-medium text-text-primary mb-3">
                  Key Features
                </h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Icon name="Check" size={16} className="text-success flex-shrink-0 mt-0.5" />
                      <span className="text-text-primary font-body">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-subtle">
              <div>
                <h4 className="text-base font-heading font-heading-medium text-text-primary mb-3">
                  Product Details
                </h4>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-text-secondary font-body">Brand:</dt>
                    <dd className="text-text-primary font-body">{product?.brand}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-secondary font-body">Category:</dt>
                    <dd className="text-text-primary font-body">{product?.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-secondary font-body">SKU:</dt>
                    <dd className="text-text-primary font-body">{product?.sku}</dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h4 className="text-base font-heading font-heading-medium text-text-primary mb-3">
                  Available Options
                </h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-text-secondary font-body text-sm">Colors:</span>
                    <div className="flex space-x-1 mt-1">
                      {product?.colors?.map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-subtle"
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-text-secondary font-body text-sm">Sizes:</span>
                    <p className="text-text-primary font-body text-sm mt-1">
                      {product?.sizes?.map(size => size.name).join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'sizeChart':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-4">
                Size Chart
              </h3>
              <p className="text-text-secondary font-body mb-6">
                All measurements are in inches. For the best fit, measure yourself and compare with the size chart below.
              </p>
            </div>
            
            {product?.sizeChart && (
              <div className="overflow-x-auto">
                <table className="w-full border border-subtle rounded-sm">
                  <thead>
                    <tr className="bg-surface">
                      <th className="px-4 py-3 text-left text-sm font-heading font-heading-medium text-text-primary border-b border-subtle">
                        Size
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-heading font-heading-medium text-text-primary border-b border-subtle">
                        Chest
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-heading font-heading-medium text-text-primary border-b border-subtle">
                        Length
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-heading font-heading-medium text-text-primary border-b border-subtle">
                        Sleeve
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(product.sizeChart).map(([size, measurements]) => (
                      <tr key={size} className="border-b border-subtle last:border-b-0">
                        <td className="px-4 py-3 text-sm font-body font-body-medium text-text-primary">
                          {size}
                        </td>
                        <td className="px-4 py-3 text-sm font-body text-text-primary">
                          {measurements.chest}
                        </td>
                        <td className="px-4 py-3 text-sm font-body text-text-primary">
                          {measurements.length}
                        </td>
                        <td className="px-4 py-3 text-sm font-body text-text-primary">
                          {measurements.sleeve}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            <div className="bg-accent bg-opacity-10 border border-accent rounded-sm p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-heading font-heading-medium text-text-primary mb-2">
                    Fit Recommendations
                  </h4>
                  <ul className="space-y-1 text-sm text-text-primary font-body">
                    <li>• For a relaxed fit, choose one size up</li>
                    <li>• For a fitted look, choose your exact measurements</li>
                    <li>• If between sizes, size up for comfort</li>
                    <li>• Check individual product notes for specific fit guidance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'care':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-4">
                Care Instructions
              </h3>
              <p className="text-text-secondary font-body mb-6">
                Follow these care instructions to keep your garment looking its best and extend its lifespan.
              </p>
            </div>
            
            {product?.careInstructions && product.careInstructions.length > 0 && (
              <div>
                <h4 className="text-base font-heading font-heading-medium text-text-primary mb-3">
                  Washing & Care
                </h4>
                <ul className="space-y-3">
                  {product.careInstructions.map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Icon name="Droplets" size={16} className="text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-text-primary font-body">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-subtle">
              <div>
                <h4 className="text-base font-heading font-heading-medium text-text-primary mb-3">
                  Storage Tips
                </h4>
                <ul className="space-y-2 text-sm text-text-primary font-body">
                  <li>• Hang or fold neatly to prevent wrinkles</li>
                  <li>• Store in a cool, dry place</li>
                  <li>• Avoid direct sunlight for extended periods</li>
                  <li>• Use garment bags for delicate items</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-base font-heading font-heading-medium text-text-primary mb-3">
                  Stain Removal
                </h4>
                <ul className="space-y-2 text-sm text-text-primary font-body">
                  <li>• Treat stains immediately when possible</li>
                  <li>• Blot, don't rub stained areas</li>
                  <li>• Test stain removers on hidden areas first</li>
                  <li>• Consult professional cleaners for tough stains</li>
                </ul>
              </div>
            </div>
          </div>
        );
        
      case 'reviews':
        const filteredReviews = getFilteredAndSortedReviews();
        const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
          rating,
          count: product?.reviews?.filter(r => Math.floor(r.rating) === rating).length || 0
        }));
        
        return (
          <div className="space-y-6">
            {/* Reviews Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6 border-b border-subtle">
              <div className="text-center">
                <div className="text-4xl font-data font-data-normal text-text-primary mb-2">
                  {product?.rating?.toFixed(1)}
                </div>
                <div className="flex items-center justify-center space-x-0.5 mb-2">
                  {renderStars(product?.rating || 0)}
                </div>
                <p className="text-sm text-text-secondary font-body">
                  Based on {product?.reviewCount || 0} reviews
                </p>
              </div>
              
              <div className="lg:col-span-2">
                <h4 className="text-base font-heading font-heading-medium text-text-primary mb-3">
                  Rating Breakdown
                </h4>
                <div className="space-y-2">
                  {ratingCounts.map(({ rating, count }) => {
                    const percentage = product?.reviewCount ? (count / product.reviewCount) * 100 : 0;
                    return (
                      <div key={rating} className="flex items-center space-x-3">
                        <span className="text-sm font-body text-text-primary w-8">
                          {rating} ★
                        </span>
                        <div className="flex-1 bg-surface rounded-full h-2">
                          <div 
                            className="bg-accent h-2 rounded-full transition-smooth"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-body text-text-secondary w-8">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Filters and Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div>
                  <label className="text-sm font-body text-text-secondary mr-2">
                    Filter by rating:
                  </label>
                  <select
                    value={reviewFilter}
                    onChange={(e) => setReviewFilter(e.target.value)}
                    className="px-3 py-1 border border-subtle rounded-sm text-sm font-body text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-smooth"
                  >
                    <option value="all">All ratings</option>
                    <option value="5">5 stars</option>
                    <option value="4">4 stars</option>
                    <option value="3">3 stars</option>
                    <option value="2">2 stars</option>
                    <option value="1">1 star</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-body text-text-secondary mr-2">
                  Sort by:
                </label>
                <select
                  value={reviewSort}
                  onChange={(e) => setReviewSort(e.target.value)}
                  className="px-3 py-1 border border-subtle rounded-sm text-sm font-body text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-smooth"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="highest">Highest rated</option>
                  <option value="lowest">Lowest rated</option>
                  <option value="helpful">Most helpful</option>
                </select>
              </div>
            </div>
            
            {/* Reviews List */}
            <div className="space-y-6">
              {filteredReviews.length === 0 ? (
                <div className="text-center py-8">
                  <Icon name="MessageSquare" size={48} className="mx-auto text-text-secondary mb-4" />
                  <p className="text-text-secondary font-body">
                    No reviews match your current filter.
                  </p>
                </div>
              ) : (
                filteredReviews.map((review) => (
                  <div key={review.id} className="border-b border-subtle pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-body font-body-medium text-text-primary">
                            {review.user}
                          </span>
                          {review.verified && (
                            <span className="px-2 py-0.5 bg-success bg-opacity-10 text-success text-xs font-body rounded">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-0.5">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-text-secondary font-body">
                            {formatDate(review.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-text-primary font-body leading-relaxed mb-4">
                      {review.comment}
                    </p>
                    
                    {review.images && review.images.length > 0 && (
                      <div className="flex space-x-2 mb-4">
                        {review.images.map((image, index) => (
                          <div key={index} className="w-16 h-16 rounded-sm overflow-hidden">
                            <Image
                              src={image}
                              alt={`Review image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-sm text-text-secondary hover:text-accent transition-smooth">
                        <Icon name="ThumbsUp" size={14} />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                      <button className="text-sm text-text-secondary hover:text-accent transition-smooth">
                        Reply
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Write Review Button */}
            <div className="pt-6 border-t border-subtle text-center">
              <button className="px-6 py-3 bg-primary text-background font-body font-body-medium rounded-sm hover:bg-opacity-90 transition-smooth">
                Write a Review
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="border-t border-subtle pt-8">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-subtle mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 whitespace-nowrap font-body font-body-medium transition-smooth border-b-2 ${
              activeTab === tab.id
                ? 'border-accent text-accent' :'border-transparent text-text-secondary hover:text-accent hover:border-subtle'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductTabs;