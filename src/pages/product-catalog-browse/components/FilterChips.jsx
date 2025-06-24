import React from 'react';
import Icon from 'components/AppIcon';

const FilterChips = ({ activeFilters, onFilterChange }) => {
  const removeFilter = (filterType, value) => {
    const newFilters = { ...activeFilters };
    
    if (filterType === 'priceRange') {
      newFilters.priceRange = { min: 0, max: 1000 };
    } else if (filterType === 'rating') {
      newFilters.rating = 0;
    } else {
      newFilters[filterType] = newFilters[filterType].filter(v => v !== value);
    }
    
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      brands: [],
      sizes: [],
      colors: [],
      priceRange: { min: 0, max: 1000 },
      rating: 0
    });
  };

  const getActiveFilterChips = () => {
    const chips = [];

    // Categories
    activeFilters.categories.forEach(category => {
      chips.push({
        type: 'categories',
        value: category,
        label: category,
        color: 'bg-blue-100 text-blue-800'
      });
    });

    // Brands
    activeFilters.brands.forEach(brand => {
      chips.push({
        type: 'brands',
        value: brand,
        label: brand,
        color: 'bg-green-100 text-green-800'
      });
    });

    // Sizes
    activeFilters.sizes.forEach(size => {
      chips.push({
        type: 'sizes',
        value: size,
        label: `Size: ${size}`,
        color: 'bg-purple-100 text-purple-800'
      });
    });

    // Colors
    activeFilters.colors.forEach(color => {
      chips.push({
        type: 'colors',
        value: color,
        label: color,
        color: 'bg-pink-100 text-pink-800'
      });
    });

    // Price Range
    if (activeFilters.priceRange.min > 0 || activeFilters.priceRange.max < 1000) {
      chips.push({
        type: 'priceRange',
        value: activeFilters.priceRange,
        label: `$${activeFilters.priceRange.min} - $${activeFilters.priceRange.max}`,
        color: 'bg-yellow-100 text-yellow-800'
      });
    }

    // Rating
    if (activeFilters.rating > 0) {
      chips.push({
        type: 'rating',
        value: activeFilters.rating,
        label: `${activeFilters.rating}+ Stars`,
        color: 'bg-orange-100 text-orange-800'
      });
    }

    return chips;
  };

  const activeChips = getActiveFilterChips();

  if (activeChips.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-body font-body-medium text-text-primary">
          Active Filters ({activeChips.length})
        </h3>
        <button
          onClick={clearAllFilters}
          className="text-sm text-accent hover:underline font-body"
        >
          Clear All
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {activeChips.map((chip, index) => (
          <div
            key={`${chip.type}-${chip.value}-${index}`}
            className="flex items-center space-x-2 px-3 py-1.5 bg-surface border border-subtle rounded-full text-sm font-body"
          >
            <span className="text-text-primary">
              {chip.label}
            </span>
            <button
              onClick={() => removeFilter(chip.type, chip.value)}
              className="text-text-secondary hover:text-text-primary transition-smooth"
            >
              <Icon name="X" size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterChips;