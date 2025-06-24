import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          {/* Image Skeleton */}
          <div className="bg-surface rounded-sm aspect-[3/4] mb-3" />
          
          {/* Content Skeleton */}
          <div className="space-y-2">
            {/* Brand */}
            <div className="h-3 bg-surface rounded w-1/2" />
            
            {/* Product Name */}
            <div className="h-4 bg-surface rounded w-3/4" />
            <div className="h-4 bg-surface rounded w-1/2" />
            
            {/* Rating */}
            <div className="flex items-center space-x-1">
              <div className="h-3 bg-surface rounded w-16" />
              <div className="h-3 bg-surface rounded w-8" />
            </div>
            
            {/* Price */}
            <div className="flex items-center space-x-2">
              <div className="h-5 bg-surface rounded w-16" />
              <div className="h-4 bg-surface rounded w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;