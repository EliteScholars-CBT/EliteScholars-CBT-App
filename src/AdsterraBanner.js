import React from 'react'
import { useEffect, useRef } from 'react';

const AdsterraBanner = ({ adKey, width, height, refreshTrigger, scale = 0.25 }) => {
  const adRef = useRef(null);
  const isNativeBanner = adKey === 'ec0487cde03d79b75629df8828d753f9';
  const uniqueId = useRef(`ad-${Date.now()}-${Math.random()}`).current;

  useEffect(() => {
    if (!adRef.current) return;
    
    // Clear previous content
    adRef.current.innerHTML = '';
    
    if (isNativeBanner) {
      // NATIVE BANNER - direct approach
      const containerDiv = document.createElement('div');
      containerDiv.id = `container-${adKey}`;
      
      const loader = document.createElement('script');
      loader.src = `https://fixesconsessionconsession.com/${adKey}/invoke.js`;
      loader.async = true;
      loader.setAttribute('data-cfasync', 'false');
      
      adRef.current.appendChild(containerDiv);
      adRef.current.appendChild(loader);
    } else {
      // STANDARD BANNER - create wrapper with inline scaling
      const wrapper = document.createElement('div');
      wrapper.style.width = `${width}px`;
      wrapper.style.height = `${height}px`;
      wrapper.style.transform = `scale(${scale})`;
      wrapper.style.transformOrigin = 'top left';
      
      const container = document.createElement('div');
      wrapper.appendChild(container);
      adRef.current.appendChild(wrapper);
      
      const config = document.createElement('script');
      config.innerHTML = `
        atOptions = {
          'key' : '${adKey}',
          'format' : 'iframe',
          'height' : ${height},
          'width' : ${width},
          'params' : {}
        };
      `;
      container.appendChild(config);
      
      const loader = document.createElement('script');
      loader.src = `https://fixesconsessionconsession.com/${adKey}/invoke.js`;
      container.appendChild(loader);
      
      // Force rescale after 500ms to catch any late-loading iframes
      const timeout = setTimeout(() => {
        const iframes = wrapper.querySelectorAll('iframe');
        iframes.forEach(iframe => {
          iframe.style.transform = `scale(${scale})`;
          iframe.style.transformOrigin = 'top left';
          iframe.style.width = `${width}px`;
          iframe.style.height = `${height}px`;
        });
      }, 500);
      
      return () => clearTimeout(timeout);
    }
  }, [adKey, width, height, refreshTrigger, scale, isNativeBanner]);

  // Add global CSS to force scale all iframes inside this ad container (backup method)
  useEffect(() => {
    const styleId = `ad-style-${uniqueId}`;
    let styleElement = document.getElementById(styleId);
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    if (!isNativeBanner) {
      styleElement.textContent = `
        #${uniqueId} iframe {
          transform: scale(${scale}) !important;
          transform-origin: top left !important;
          width: ${width}px !important;
          height: ${height}px !important;
        }
      `;
    } else {
      styleElement.textContent = `
        #${uniqueId} {
          transform: scale(${scale}) !important;
          transform-origin: top center !important;
        }
      `;
    }
    
    return () => {
      if (styleElement) styleElement.remove();
    };
  }, [scale, width, height, isNativeBanner, uniqueId]);

  if (isNativeBanner) {
    return (
      <div 
        id={uniqueId}
        ref={adRef} 
        style={{
          width: '100%',
          minHeight: `${120 * scale}px`,
          margin: '5px auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      />
    );
  }

  const scaledWidth = Math.floor(width * scale);
  const scaledHeight = Math.floor(height * scale);

  return (
    <div 
      id={uniqueId}
      style={{
        width: `${scaledWidth}px`,
        height: `${scaledHeight}px`,
        margin: '5px auto',
        overflow: 'hidden',
      }}
    >
      <div ref={adRef} />
    </div>
  );
};

export default AdsterraBanner;
