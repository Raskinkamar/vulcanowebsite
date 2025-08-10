/**
 * Performance optimization utilities
 */

// Prefetch links that the user might navigate to
export const prefetchResources = (urls: string[]) => {
  if (typeof window === 'undefined') return;

  // Only run in production
  if (process.env.NODE_ENV !== 'production') return;

  // Add delay to not block the main thread on initial load
  setTimeout(() => {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      link.as = url.endsWith('.js') ? 'script' : 
                url.endsWith('.css') ? 'style' : 
                url.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/) ? 'image' : 
                'fetch';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }, 2000);
};

// Initialize Intersection Observer for lazy loading
export const initLazyLoading = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLImageElement | HTMLIFrameElement;
        if (target.dataset.src) {
          target.src = target.dataset.src;
          delete target.dataset.src;
        }
        lazyLoadObserver.unobserve(target);
      }
    });
  }, {
    rootMargin: '200px', // Load images 200px before they become visible
  });

  // Select all elements with data-src attribute
  document.querySelectorAll('[data-src]').forEach(el => {
    lazyLoadObserver.observe(el);
  });
};

// Load non-critical CSS asynchronously
export const loadNonCriticalCSS = (urls: string[]) => {
  if (typeof window === 'undefined') return;

  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.media = 'print';
    link.onload = () => {
      link.media = 'all';
    };
    document.head.appendChild(link);
  });
};

// Preconnect to external domains
export const preconnect = (domains: string[]) => {
  if (typeof window === 'undefined') return;

  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    // Also use DNS prefetch as fallback for browsers that don't support preconnect
    const dnsLink = document.createElement('link');
    dnsLink.rel = 'dns-prefetch';
    dnsLink.href = domain;
    document.head.appendChild(dnsLink);
  });
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (typeof window === 'undefined' || !('performance' in window) || process.env.NODE_ENV !== 'production') return;

  // Report performance metrics to console in development
  ['paint', 'largest-contentful-paint', 'layout-shift', 'first-input', 'navigation'].forEach(type => {
    // @ts-ignore - PerformanceObserver types may not be available
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        // Log performance metrics for debugging
        if (process.env.NODE_ENV !== 'production') {
          console.log(`[Performance] ${type}:`, entry.toJSON());
        }
        
        // Here you could send these metrics to your analytics service
        // analytics.track('performance', { type, value: entry });
      });
    });
    
    // @ts-ignore - Not all entry types may be available in the type system
    observer.observe({ type, buffered: true });
  });
};

// Initialize all performance optimizations
export const initializePerformanceOptimizations = () => {
  // Preconnect to common domains
  preconnect([
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://cdn.jsdelivr.net'
  ]);
  
  // Initialize lazy loading
  initLazyLoading();
  
  // Start performance monitoring
  initPerformanceMonitoring();
  
  // Load non-critical CSS
  loadNonCriticalCSS([
    // Add any non-critical CSS URLs here
    // '/styles/animations.css',
  ]);
  
  // After the page loads, prefetch likely next resources
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      prefetchResources([
        // Add critical resources that users might need next
        '/api/translations',
      ]);
    });
  }
};