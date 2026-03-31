import React from 'react'
import { useEffect, useRef } from 'react';

const AdsterraBanner = ({ adKey, width, height, refreshTrigger, scale = 0.35 }) => {
  const adRef = useRef(null);
  
  // Check if this is the native banner format
  const isNativeBanner = adKey === 'ec0487cde03d79b75629df8828d753f9';

  useEffect(() => {
    if (adRef.current) {
      // Clear previous ad content completely
      adRef.current.innerHTML = '';

      if (isNativeBanner) {
        // NATIVE BANNER FORMAT
        const containerDiv = document.createElement('div');
        containerDiv.id = `container-${adKey}`;
        
        const loader = document.createElement('script');
        loader.type = 'text/javascript';
        loader.src = `https://fixesconsessionconsession.com/${adKey}/invoke.js`;
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
    }
  }, [adKey, refreshTrigger, width, height, isNativeBanner]);

  // Scale iframes after they load
  useEffect(() => {
    if (!isNativeBanner && adRef.current) {
      const scaleIframes = () => {
        const iframes = adRef.current.querySelectorAll('iframe');
        iframes.forEach(iframe => {
          iframe.style.transform = `scale(${scale})`;
          iframe.style.transformOrigin = 'top left';
          iframe.style.width = `${width}px`;
          iframe.style.height = `${height}px`;
        });
      };
      
      // Scale immediately
      scaleIframes();
      
      // Watch for new iframes
      const observer = new MutationObserver(() => {
        scaleIframes();
      });
      
      observer.observe(adRef.current, { childList: true, subtree: true });
      
      return () => observer.disconnect();
    }
  }, [isNativeBanner, scale, width, height, refreshTrigger]);

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
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      />
    );
  }

  // For standard banners
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
