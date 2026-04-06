import React from 'react'
import { useEffect, useRef } from 'react';

const AdsterraBanner = ({ adKey, width, height, refreshTrigger, scale = 0.45 }) => {
  const adRef = useRef(null);
  const timeoutRef = useRef(null);
  
  // Check if this is the native banner format
  const isNativeBanner = adKey === 'ec0487cde03d79b75629df8828d753f9';

  const initializeAd = () => {
    if (!adRef.current) return;
    
    // Clear everything
    adRef.current.innerHTML = '';

    if (isNativeBanner) {
      // NATIVE BANNER FORMAT
      const containerDiv = document.createElement('div');
      containerDiv.id = `container-${adKey}`;

      
      const loader = document.createElement('script');
      const cacheBuster = `?cb=${Date.now()}`;
      loader.type = 'text/javascript';
      loader.src = `https://fixesconsessionconsession.com/${adKey}/invoke.js${cacheBuster}`;
      loader.async = true;
      loader.setAttribute('data-cfasync', 'false');
      
      adRef.current.appendChild(containerDiv);
      adRef.current.appendChild(loader);
    } else {
      // STANDARD BANNER FORMAT
      const config = document.createElement('script');
      config.type = 'text/javascript';
      config.innerHTML = `
        atOptions = {
          'key' : '${adKey}',
          'format' : 'iframe',
          'height' : ${height},
          'width' : ${width},
          'params' : {}
        };
      `;

      const loader = document.createElement('script');
      loader.type = 'text/javascript';
      loader.src = `https://fixesconsessionconsession.com/${adKey}/invoke.js`;

      adRef.current.appendChild(config);
      adRef.current.appendChild(loader);
    }
  };

  useEffect(() => {
    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Small delay to ensure clean reload
    timeoutRef.current = setTimeout(() => {
      initializeAd();
    }, 200);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [adKey, refreshTrigger, width, height, isNativeBanner]);

  // For native banner
  if (isNativeBanner) {
    return (
      <div 
        ref={adRef} 
        style={{
          width: '100%',
          minHeight: `${120 * scale}px`,
          margin: '5px auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      />
    );
  }

  // For standard banners - scale the actual content, not the wrapper
  const scaledWidth = Math.floor(width * scale);
  const scaledHeight = Math.floor(height * scale);
  
  return (
    <div 
      style={{
        width: `${scaledWidth}px`,
        height: `${scaledHeight}px`,
        margin: '5px auto',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div ref={adRef} />
    </div>
  );
};

export default AdsterraBanner;
