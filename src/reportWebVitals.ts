import { getCLS, getFID, getLCP } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry); // CLS (Cumulative Layout Shift)
    getFID(onPerfEntry); // FID (First Input Delay)
    getLCP(onPerfEntry); // LCP (Largest Contentful Paint)
  }
};

export default reportWebVitals;
