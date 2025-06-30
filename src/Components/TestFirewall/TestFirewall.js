'use client';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function TrafficReporter() {
  const location = useLocation();

  useEffect(() => {
    const report = async () => {
      const path = location.pathname;

const pageActionMap = {
  '/': 'HomePageVisit',
  '/login': 'LoginPageVisit',
  '/mens': 'MensPageVisit',
  '/womens': 'WomensPageVisit',
  '/kids': 'KidsPageVisit',
};


      if (!Object.keys(pageActionMap).includes(path)) return;

      const payload = {
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        action: pageActionMap[path] || 'OtherVisit'
      };

      try {
        await fetch('http://localhost:8000/firewall/static', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        console.log('✅ Reported traffic:', payload);
      } catch (err) {
        console.warn('⚠️ Reporting failed:', err);
      }
    };

    report();
  }, [location]);

  return null;
}
