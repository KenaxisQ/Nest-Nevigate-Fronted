import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when the location (route) changes
    window.scrollTo(0, 0);
  }, [location]); // Depend on `location` to trigger when the route changes

  return null; // No UI is rendered, this is just a helper component
};

export default ScrollToTop;
