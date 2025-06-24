import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import HomepageLanding from "pages/homepage-landing";
import UserAuthenticationLoginRegister from "pages/user-authentication-login-register";
import UserAccountDashboard from "pages/user-account-dashboard";
import ShoppingCart from "pages/shopping-cart";
import ProductCatalogBrowse from "pages/product-catalog-browse";
import ProductDetail from "pages/product-detail";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<HomepageLanding />} />
          <Route path="/homepage-landing" element={<HomepageLanding />} />
          <Route path="/user-authentication-login-register" element={<UserAuthenticationLoginRegister />} />
          <Route path="/user-account-dashboard" element={<UserAccountDashboard />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/product-catalog-browse" element={<ProductCatalogBrowse />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;