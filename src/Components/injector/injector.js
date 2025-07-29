(function () {
  function trackProductPage() {
    const productId = document.body.getAttribute('data-product-id');
    if (productId) {
      console.log(`✅ Tracking Product Page Visit: ID = ${productId}`);
      // Add actual tracking logic here, e.g., send to server
    } else {
      console.log('⚠️ No product ID found. Will retry...');
      // Retry after slight delay to give React time to render
      setTimeout(trackProductPage, 300);
    }
  }

  // Run tracking on initial load
  trackProductPage();

  // Patch history methods to track SPA navigation
  const pushState = history.pushState;
  const replaceState = history.replaceState;

  const handleRouteChange = () => {
    setTimeout(trackProductPage, 300); // Wait longer to ensure DOM is updated
  };

  history.pushState = function (...args) {
    pushState.apply(history, args);
    window.dispatchEvent(new Event('pushstate'));
    window.dispatchEvent(new Event('locationchange'));
  };

  history.replaceState = function (...args) {
    replaceState.apply(history, args);
    window.dispatchEvent(new Event('replacestate'));
    window.dispatchEvent(new Event('locationchange'));
  };

  window.addEventListener('popstate', () => {
    window.dispatchEvent(new Event('locationchange'));
  });

  window.addEventListener('locationchange', handleRouteChange);
})();
