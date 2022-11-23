'use client';

import Script from 'next/script';

function FacebookSdkScript() {
  return (
    <Script
      async
      defer
      crossOrigin="anonymous"
      src="https://connect.facebook.net/en_US/sdk.js"
      onLoad={() => {
        if (typeof window === 'undefined') {
          return;
        }

        window.fbAsyncInit = function fbAsyncInit() {
          FB.init({
            appId: process.env.NEXT_PUBLIC_FB_APP_ID,
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v15.0',
          });
        };
      }}
    />
  );
}

export default FacebookSdkScript;
