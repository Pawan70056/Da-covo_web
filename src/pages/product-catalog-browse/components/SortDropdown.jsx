import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';

const SortDropdown = ({ value, onChange, resultsCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Best Match' },
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  const currentOption = sortOptions.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Results Count (Desktop) */}
      <div className="hidden sm:block text-sm text-text-secondary font-body">
        {resultsCount} {resultsCount === 1 ? 'result' : 'results'}
      </div>

      {/* Sort Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-surface border border-subtle rounded-sm font-body text-sm hover:bg-opacity-80 transition-smooth min-w-[140px] justify-between"
        >
          <span className="text-text-primary">
            Sort: {currentOption?.label}
          </span>
          <Icon 
            name="ChevronDown" 
            size={16} 
            className={`text-text-secondary transition-smooth ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-1 w-48 bg-background border border-subtle rounded-lg shadow-elevation-2 py-1 z-dropdown">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className={`block w-full text-left px-4 py-2 text-sm font-body transition-smooth ${
                  value === option.value
                    ? 'bg-accent text-background' :'text-text-primary hover:bg-surface'
                }`}
              >
                {option.label}
                {value === option.value && (
                  <Icon name="Check" size={16} className="inline ml-2" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;