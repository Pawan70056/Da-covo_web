import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FilterSidebar = ({ activeFilters, onFilterChange, products, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: true,
    sizes: true,
    colors: true,
    price: true,
    rating: true
  });

  // Extract unique values from products
  const categories = [...new Set(products.map(p => p.category))].sort();
  const brands = [...new Set(products.map(p => p.brand))].sort();
  const sizes = [...new Set(products.flatMap(p => p.sizes))].sort();
  const colors = [...new Set(products.flatMap(p => p.colors))].sort();

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterToggle = (filterType, value) => {
    const newFilters = { ...activeFilters };
    
    if (filterType === 'priceRange') {
      newFilters.priceRange = value;
    } else if (filterType === 'rating') {
      newFilters.rating = value;
    } else {
      const currentValues = newFilters[filterType];
      if (currentValues.includes(value)) {
        newFilters[filterType] = currentValues.filter(v => v !== value);
      } else {
        newFilters[filterType] = [...currentValues, value];
      }
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

  const hasActiveFilters = 
    activeFilters.categories.length > 0 ||
    activeFilters.brands.length > 0 ||
    activeFilters.sizes.length > 0 ||
    activeFilters.colors.length > 0 ||
    activeFilters.priceRange.min > 0 ||
    activeFilters.priceRange.max < 1000 ||
    activeFilters.rating > 0;

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-subtle pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <h3 className="font-body font-body-medium text-text-primary">
          {title}
        </h3>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-text-secondary transition-smooth ${
            expandedSections[sectionKey] ? 'rotate-180' : ''
          }`}
        />
      </button>
      {expandedSections[sectionKey] && children}
    </div>
  );

  const CheckboxItem = ({ label, checked, onChange, count }) => (
    <label className="flex items-center justify-between py-1 cursor-pointer hover:text-accent transition-smooth">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 text-accent border-subtle rounded focus:ring-accent focus:ring-2"
        />
        <span className="text-sm font-body text-text-primary">
          {label}
        </span>
      </div>
      {count && (
        <span className="text-xs text-text-secondary font-body">
          ({count})
        </span>
      )}
    </label>
  );

  const ColorSwatch = ({ color, checked, onChange }) => {
    const colorMap = {
      'White': '#FFFFFF',
      'Black': '#000000',
      'Gray': '#6B7280',
      'Navy': '#1E3A8A',
      'Blue': '#3B82F6',
      'Red': '#EF4444',
      'Pink': '#EC4899',
      'Cream': '#FEF3C7',
      'Brown': '#92400E',
      'Olive': '#65A30D',
      'Khaki': '#CA8A04',
      'Floral': 'linear-gradient(45deg, #EC4899, #3B82F6)',
      'Navy/White': 'linear-gradient(45deg, #1E3A8A, #FFFFFF)',
      'Red/White': 'linear-gradient(45deg, #EF4444, #FFFFFF)',
      'Solid Blue': '#3B82F6'
    };

    return (
      <button
        onClick={onChange}
        className={`w-8 h-8 rounded-full border-2 transition-smooth ${
          checked ? 'border-accent scale-110' : 'border-subtle hover:border-accent'
        }`}
        style={{ 
          background: colorMap[color] || '#6B7280',
          border: color === 'White' ? '2px solid #E5E7EB' : undefined
        }}
        title={color}
      >
        {checked && (
          <Icon 
            name="Check" 
            size={12} 
            className={color === 'White' || color.includes('White') ? 'text-text-primary' : 'text-background'}
          />
        )}
      </button>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-heading font-heading-semibold text-text-primary">
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-accent hover:underline font-body"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      <FilterSection title="Categories" sectionKey="categories">
        <div className="space-y-2">
          {categories.map(category => {
            const count = products.filter(p => p.category === category).length;
            return (
              <CheckboxItem
                key={category}
                label={category}
                checked={activeFilters.categories.includes(category)}
                onChange={() => handleFilterToggle('categories', category)}
                count={count}
              />
            );
          })}
        </div>
      </FilterSection>

      {/* Brands */}
      <FilterSection title="Brands" sectionKey="brands">
        <div className="space-y-2">
          {brands.map(brand => {
            const count = products.filter(p => p.brand === brand).length;
            return (
              <CheckboxItem
                key={brand}
                label={brand}
                checked={activeFilters.brands.includes(brand)}
                onChange={() => handleFilterToggle('brands', brand)}
                count={count}
              />
            );
          })}
        </div>
      </FilterSection>

      {/* Sizes */}
      <FilterSection title="Sizes" sectionKey="sizes">
        <div className="grid grid-cols-4 gap-2">
          {sizes.map(size => (
            <button
              key={size}
              onClick={() => handleFilterToggle('sizes', size)}
              className={`py-2 px-3 text-sm font-body border rounded-sm transition-smooth ${
                activeFilters.sizes.includes(size)
                  ? 'border-accent bg-accent text-background' :'border-subtle text-text-primary hover:border-accent'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Colors */}
      <FilterSection title="Colors" sectionKey="colors">
        <div className="grid grid-cols-6 gap-2">
          {colors.map(color => (
            <ColorSwatch
              key={color}
              color={color}
              checked={activeFilters.colors.includes(color)}
              onChange={() => handleFilterToggle('colors', color)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range" sectionKey="price">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-xs text-text-secondary font-body mb-1">
                Min
              </label>
              <input
                type="number"
                value={activeFilters.priceRange.min}
                onChange={(e) => handleFilterToggle('priceRange', {
                  ...activeFilters.priceRange,
                  min: parseInt(e.target.value) || 0
                })}
                className="w-full px-3 py-2 border border-subtle rounded-sm text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="0"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-text-secondary font-body mb-1">
                Max
              </label>
              <input
                type="number"
                value={activeFilters.priceRange.max}
                onChange={(e) => handleFilterToggle('priceRange', {
                  ...activeFilters.priceRange,
                  max: parseInt(e.target.value) || 1000
                })}
                className="w-full px-3 py-2 border border-subtle rounded-sm text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="1000"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            {[
              { label: 'Under $25', min: 0, max: 25 },
              { label: '$25 - $50', min: 25, max: 50 },
              { label: '$50 - $100', min: 50, max: 100 },
              { label: '$100 - $200', min: 100, max: 200 },
              { label: 'Over $200', min: 200, max: 1000 }
            ].map(range => (
              <button
                key={range.label}
                onClick={() => handleFilterToggle('priceRange', { min: range.min, max: range.max })}
                className={`block w-full text-left py-2 px-3 text-sm font-body border rounded-sm transition-smooth ${
                  activeFilters.priceRange.min === range.min && activeFilters.priceRange.max === range.max
                    ? 'border-accent bg-accent text-background' :'border-subtle text-text-primary hover:border-accent'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Customer Rating" sectionKey="rating">
        <div className="space-y-2">
          {[4, 3, 2, 1].map(rating => (
            <button
              key={rating}
              onClick={() => handleFilterToggle('rating', rating)}
              className={`flex items-center space-x-2 w-full text-left py-2 px-3 rounded-sm transition-smooth ${
                activeFilters.rating === rating
                  ? 'bg-accent text-background' :'hover:bg-surface'
              }`}
            >
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Icon
                    key={index}
                    name="Star"
                    size={12}
                    className={`${
                      index < rating
                        ? activeFilters.rating === rating ? 'text-background' : 'text-accent' :'text-text-secondary'
                    } ${index < rating ? 'fill-current' : ''}`}
                  />
                ))}
              </div>
              <span className="text-sm font-body">
                {rating}+ Stars
              </span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Mobile Apply Button */}
      {onClose && (
        <div className="pt-4 border-t border-subtle">
          <button
            onClick={onClose}
            className="w-full bg-primary text-background py-3 px-4 rounded-sm font-body font-body-medium hover:bg-opacity-90 transition-smooth"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;