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

  // Different styling with scaling applied
  const containerStyle = isNativeBanner 
    ? {
        width: '100%',
        minHeight: `${120 * scale}px`,
        margin: '10px auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        overflow: 'hidden',
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
      }
    : {
        width: `${width}px`,
        minHeight: `${height}px`,
        margin: '10px auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      };

  // For non-native banners, wrap in a scaled container
  if (!isNativeBanner) {
    return (
      <div style={{
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        width: `${width}px`,
        height: `${height}px`,
        margin: '0 auto',
      }}>
        <div ref={adRef} style={containerStyle} />
      </div>
    );
  }

  return (
    <div ref={adRef} style={containerStyle} />
  );
};

export default AdsterraBanner;
