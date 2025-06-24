// src/pages/product-detail/components/SizeGuideModal.jsx
import React, { useEffect } from 'react';
import Icon from 'components/AppIcon';

const SizeGuideModal = ({ isOpen, onClose, sizeChart, productName }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-primary bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="absolute inset-4 sm:inset-8 lg:inset-16 bg-background rounded-lg shadow-elevation-3 flex flex-col max-h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-subtle">
          <h2 className="text-xl font-heading font-heading-semibold text-text-primary">
            Size Guide - {productName}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-text-primary transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* How to Measure */}
          <div>
            <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-4">
              How to Measure
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="User" size={24} className="text-accent" />
                </div>
                <h4 className="font-body font-body-medium text-text-primary mb-2">
                  Chest
                </h4>
                <p className="text-sm text-text-secondary font-body">
                  Measure around the fullest part of your chest, keeping the tape horizontal.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Ruler" size={24} className="text-accent" />
                </div>
                <h4 className="font-body font-body-medium text-text-primary mb-2">
                  Length
                </h4>
                <p className="text-sm text-text-secondary font-body">
                  Measure from the highest point of the shoulder to the desired length.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Move" size={24} className="text-accent" />
                </div>
                <h4 className="font-body font-body-medium text-text-primary mb-2">
                  Sleeve
                </h4>
                <p className="text-sm text-text-secondary font-body">
                  Measure from the shoulder seam to the end of the sleeve.
                </p>
              </div>
            </div>
          </div>
          
          {/* Size Chart Table */}
          {sizeChart && (
            <div>
              <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-4">
                Size Chart (inches)
              </h3>
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
                    {Object.entries(sizeChart).map(([size, measurements]) => (
                      <tr key={size} className="border-b border-subtle last:border-b-0 hover:bg-surface transition-smooth">
                        <td className="px-4 py-3 text-sm font-body font-body-semibold text-text-primary">
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
            </div>
          )}
          
          {/* Fit Tips */}
          <div className="bg-accent bg-opacity-10 border border-accent rounded-sm p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Lightbulb" size={20} className="text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-base font-heading font-heading-medium text-text-primary mb-2">
                  Fit Tips
                </h4>
                <ul className="space-y-2 text-sm text-text-primary font-body">
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-success flex-shrink-0 mt-0.5" />
                    <span>For a relaxed fit, choose one size up from your measurements</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-success flex-shrink-0 mt-0.5" />
                    <span>For a fitted look, choose your exact measurement size</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-success flex-shrink-0 mt-0.5" />
                    <span>If you're between sizes, we recommend sizing up for comfort</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-success flex-shrink-0 mt-0.5" />
                    <span>Consider the fabric type - stretchy materials offer more flexibility</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="text-center pt-4 border-t border-subtle">
            <p className="text-sm text-text-secondary font-body mb-2">
              Still unsure about sizing? We're here to help!
            </p>
            <button className="text-sm text-accent hover:text-primary transition-smooth font-body underline">
              Contact Customer Support
            </button>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-subtle">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 bg-primary text-background font-body font-body-medium rounded-sm hover:bg-opacity-90 transition-smooth"
          >
            Close Size Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;