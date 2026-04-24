import React, { useEffect, useRef, useState } from 'react';

// ============================================================================
// Adsterra Banner — Publisher ad with rotation support.
// Constrained to its parent container — never overflows the ad-publisher-box.
// ============================================================================

const AD_ROTATION = [
  { key: '3ac2ce320a30936c1cf44c1dc6af48b3', width: 320, height: 50, name: 'Mobile Leaderboard' },
  { key: 'acfeb6d2c7aa8faa701a1d3bd1b8e3ee', width: 728, height: 90, name: 'Leaderboard' },
  { key: 'fce61a93a320cdb7161fa006b20e7b00', width: 468, height: 60, name: 'Full Banner' },
  { key: '6eb8313e3d0a4c25d0e4d2c71e7ca69d', width: 300, height: 250, name: 'Medium Rectangle' },
  { key: 'c3797bda9331d8516f86837bb9068207', width: 160, height: 300, name: 'Skyscraper' },
  { key: '6aeea40ea3fac071fc3c3d43fd2f1fe6', width: 160, height: 600, name: 'Wide Skyscraper' },
];

const AdsterraBanner = ({
  adKey,
  width,
  height,
  refreshTrigger = 0,
  scale = 0.45,
  enableRotation = false,
}) => {
  const adRef = useRef(null);
  const timeoutRef = useRef(null);
  const [adIdx, setAdIdx] = useState(0);

  const currentAd = enableRotation ? AD_ROTATION[adIdx] : { key: adKey, width, height };

  // Rotate on refresh
  useEffect(() => {
    if (enableRotation && refreshTrigger > 0) {
      setAdIdx((prev) => (prev + 1) % AD_ROTATION.length);
    }
  }, [refreshTrigger, enableRotation]);

  // Inject script
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (!adRef.current || !currentAd.key) return;
      adRef.current.innerHTML = '';

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
    }, 50);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentAd.key, refreshTrigger, currentAd.width, currentAd.height]);

  // Scale to fit — never expand beyond parent
  const scaledW = Math.floor((currentAd.width || 320) * scale);
  const scaledH = Math.floor((currentAd.height || 50) * scale);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        ref={adRef}
        style={{
          width: scaledW,
          height: scaledH,
          maxWidth: '100%',
          maxHeight: 90,
          overflow: 'hidden',
          flexShrink: 0,
        }}
      />
    </div>
  );
};

export default AdsterraBanner;
