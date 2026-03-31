import React from 'react'
import { useEffect, useRef } from 'react';

const AdsterraBanner = ({ adKey, width, height, refreshTrigger }) => {
  const adRef = useRef(null);
  
  // Check if this is the native banner format (ec0487cde03d79b75629df8828d753f9)
  const isNativeBanner = adKey === 'ec0487cde03d79b75629df8828d753f9';

  useEffect(() => {
    if (adRef.current) {
      // Clear previous ad content completely
      adRef.current.innerHTML = '';

      if (isNativeBanner) {
        // NATIVE BANNER FORMAT - uses invoke.js + container div pattern
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
        // STANDARD BANNER FORMAT - uses atOptions + invoke.js pattern
        // Create the config script
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

        // Create the loader script
        const loader = document.createElement('script');
        loader.type = 'text/javascript';
        loader.src = `https://fixesconsessionconsession.com/${adKey}/invoke.js`;

        // Append to the div
        adRef.current.appendChild(config);
        adRef.current.appendChild(loader);
      }
    }
  }, [adKey, refreshTrigger, width, height, isNativeBanner]);

  // Different styling for native banner vs standard banners
  const containerStyle = isNativeBanner 
    ? {
        width: '100%',
        minHeight: '120px',
        margin: '10px auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        overflow: 'hidden'
      }
    : {
        width: `${width}px`,
        minHeight: `${height}px`,
        margin: '10px auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      };

  return (
    <div
      ref={adRef}
      style={containerStyle}
    />
  );
};

export default AdsterraBanner;
