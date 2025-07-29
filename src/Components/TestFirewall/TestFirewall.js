'use client';

import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const getReportedPages = () => {
  const data = sessionStorage.getItem('reportedPages');
  return data ? JSON.parse(data) : [];
};

const saveReportedPage = (path) => {
  const pages = getReportedPages();
  if (!pages.includes(path)) {
    pages.push(path);
    sessionStorage.setItem('reportedPages', JSON.stringify(pages));
  }
};

const detectOSAndBrowser = async () => {
  let os = 'Unknown OS';
  let browserVersion = 'Unknown';

  try {
    if (navigator.userAgentData) {
      const uaData = await navigator.userAgentData.getHighEntropyValues([
        'platform', 'platformVersion', 'uaFullVersion'
      ]);
      const major = parseInt(uaData.platformVersion.split('.')[0]);
      if (uaData.platform === 'Windows') {
        os = major >= 13 ? 'Windows 11' : 'Windows 10 or earlier';
      } else {
        os = uaData.platform;
      }
      browserVersion = uaData.uaFullVersion;
    } else {
      const ua = navigator.userAgent;
      if (ua.includes('Windows NT 10.0')) os = 'Windows 10 / 11';
      else if (ua.includes('Windows NT 6.3')) os = 'Windows 8.1';
      else if (ua.includes('Mac OS X')) os = 'macOS';
      else if (ua.includes('Linux')) os = 'Linux';
      browserVersion = (ua.match(/Chrome\/([0-9.]+)/) || [])[1] || 'Unknown';
    }
  } catch (e) {
    // Ignore errors
  }

  return { os, browserVersion };
};

const isBot = (ua) => {
  return /bot|crawler|spider|crawl|slurp|robot|fetch/i.test(ua);
};

// ✅ IST timestamp generator
const getISTTimestamp = () => {
  const now = new Date();
  const istOffset = 330; // IST = UTC+5:30 → 330 minutes
  const localTime = new Date(now.getTime() + istOffset * 60000 - now.getTimezoneOffset() * 60000);
  return localTime.toISOString().replace('T', ' ').split('.')[0]; // "YYYY-MM-DD HH:mm:ss"
};

export default function TrafficReporter() {
  const location = useLocation();
  const reportedRef = useRef(new Set());

  useEffect(() => {
    const path = location.pathname;
    const pageActionMap = {
      '/': 'HomePageVisit',
      '/login': 'LoginPageVisit',
      '/mens': 'MensPageVisit',
      '/womens': 'WomensPageVisit',
      '/kids': 'KidsPageVisit',
      '/cart': 'CartPageVisit'
    };

    if (!pageActionMap[path]) return;
    if (reportedRef.current.has(path)) return;
    const alreadyReported = getReportedPages();
    if (alreadyReported.includes(path)) return;

    const timeout = setTimeout(async () => {
      const { os, browserVersion } = await detectOSAndBrowser();
      const userAgent = navigator.userAgent;

      const payload = {
        url: window.location.href,
        userAgent,
        timestamp: getISTTimestamp(),  // ✅ IST format
        action: pageActionMap[path],
        os
      };

      console.log("Payload:", payload);

      fetch('https://zap-api-dev.shaeryldatatech.in/firewall/static', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('✅ Traffic reported:', data);
          saveReportedPage(path);
          reportedRef.current.add(path);
        })
        .catch((err) => {
          console.warn('⚠️ Traffic reporting failed:', err);
        });
    }, 200);

    return () => clearTimeout(timeout);
  }, [location]);

  return null;
}
