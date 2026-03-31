import React from 'react'
import { useEffect, useRef } from 'react';

const AdsterraBanner = ({ adKey, width, height, refreshTrigger }) => {
  const adRef = useRef(null);

  useEffect(() => {
    if (adRef.current) {
      // 1. Clear previous ad content to prevent stacking
      adRef.current.innerHTML = '';

      // 2. Create the config script
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

      // 3. Create the loader script
      const loader = document.createElement('script');
      loader.type = 'text/javascript';
      loader.src = `https://fixesconsessionconsession.com/${adKey}/invoke.js`;

      // 4. Append to the div
      adRef.current.appendChild(config);
      adRef.current.appendChild(loader);
    }
  }, [adKey, refreshTrigger]); // Reloads when key or the trigger changes

  return (
    <div
      ref={adRef}
      style={{
        width: `${width}px`,
        minHeight: `${height}px`,
        margin: '10px auto',
      }}
    />
  );
};

export default AdsterraBanner;
