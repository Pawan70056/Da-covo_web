import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  
  const getDefaultBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    const breadcrumbMap = {
      'homepage-landing': { label: 'Home', path: '/homepage-landing' },
      'product-catalog-browse': { label: 'Catalog', path: '/product-catalog-browse' },
      'product-detail': { label: 'Product Details', path: '/product-detail' },
      'shopping-cart': { label: 'Shopping Cart', path: '/shopping-cart' },
      'user-account-dashboard': { label: 'Account', path: '/user-account-dashboard' },
      'user-authentication-login-register': { label: 'Sign In', path: '/user-authentication-login-register' },
    };

    const breadcrumbs = [{ label: 'Home', path: '/homepage-landing' }];
    
    pathSegments.forEach((segment, index) => {
      if (breadcrumbMap[segment] && segment !== 'homepage-landing') {
        breadcrumbs.push(breadcrumbMap[segment]);
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = customItems || getDefaultBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm font-body mb-6" aria-label="Breadcrumb">
      <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
        {breadcrumbs.map((item, index) => (
          <div key={item.path} className="flex items-center space-x-2 whitespace-nowrap">
            {index === breadcrumbs.length - 1 ? (
              <span className="text-text-primary font-body-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <>
                <Link
                  to={item.path}
                  className="text-text-secondary hover:text-accent transition-smooth"
                >
                  {item.label}
                </Link>
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="text-text-secondary flex-shrink-0" 
                />
              </>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumb;