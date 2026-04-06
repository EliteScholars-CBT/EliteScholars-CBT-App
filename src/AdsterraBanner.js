import React from 'react'
import { useEffect, useRef, useState } from 'react';

// Ad rotation configuration
const AD_ROTATION = [
  { key: '3ac2ce320a30936c1cf44c1dc6af48b3', width: 320, height: 50, scale: 0.45, name: 'Mobile Leaderboard' },
  { key: 'acfeb6d2c7aa8faa701a1d3bd1b8e3ee', width: 728, height: 90, scale: 0.35, name: 'Leaderboard' },
  { key: 'fce61a93a320cdb7161fa006b20e7b00', width: 468, height: 60, scale: 0.4, name: 'Full Banner' },
  { key: '6eb8313e3d0a4c25d0e4d2c71e7ca69d', width: 300, height: 250, scale: 0.5, name: 'Medium Rectangle' },
  { key: 'c3797bda9331d8516f86837bb9068207', width: 160, height: 300, scale: 0.45, name: 'Skyscraper' },
  { key: '6aeea40ea3fac071fc3c3d43fd2f1fe6', width: 160, height: 600, scale: 0.4, name: 'Wide Skyscraper' },
];

const AdsterraBanner = ({ adKey, width, height, refreshTrigger, scale = 0.45, enableRotation = false }) => {
  const adRef = useRef(null);
  const timeoutRef = useRef(null);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  
  // Get current ad from rotation if enabled
  const getCurrentAd = () => {
    if (enableRotation) {
      return AD_ROTATION[currentAdIndex];
    }
    return { key: adKey, width, height, scale };
  };

  // Rotate to next ad when refreshTrigger changes
  useEffect(() => {
    if (enableRotation && refreshTrigger > 0) {
      setCurrentAdIndex((prev) => (prev + 1) % AD_ROTATION.length);
    }
  }, [refreshTrigger, enableRotation]);

  const currentAd = getCurrentAd();
  const isNativeBanner = !enableRotation && currentAd.key === 'ec0487cde03d79b75629df8828d753f9';

  const initializeAd = () => {
    if (!adRef.current) return;
    
    // Clear everything
    adRef.current.innerHTML = '';

    if (isNativeBanner) {
      // NATIVE BANNER FORMAT
      const containerDiv = document.createElement('div');
      containerDiv.id = `container-${currentAd.key}`;
      
      const loader = document.createElement('script');
      loader.type = 'text/javascript';
      loader.src = `https://fixesconsessionconsession.com/${currentAd.key}/invoke.js`;
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
          'key' : '${currentAd.key}',
          'format' : 'iframe',
          'height' : ${currentAd.height},
          'width' : ${currentAd.width},
          'params' : {}
        };
      `;

      const loader = document.createElement('script');
      loader.type = 'text/javascript';
      loader.src = `https://fixesconsessionconsession.com/${currentAd.key}/invoke.js`;

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
    }, 50);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentAd.key, refreshTrigger, currentAd.width, currentAd.height, isNativeBanner]);

  // For native banner (non-rotation)
  if (isNativeBanner) {
    const adScale = currentAd.scale || scale;
    return (
      <div 
        ref={adRef} 
        style={{
          width: '100%',
          minHeight: `${120 * adScale}px`,
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

  // For standard banners
  const adScale = currentAd.scale || scale;
  const scaledWidth = Math.floor(currentAd.width * adScale);
  const scaledHeight = Math.floor(currentAd.height * adScale);
  
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
