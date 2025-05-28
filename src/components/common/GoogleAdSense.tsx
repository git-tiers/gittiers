import Script from 'next/script';

export const GoogleAdSense = () => {
  return (
    <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9671858264073035"
            crossOrigin="anonymous" />
  );
};
