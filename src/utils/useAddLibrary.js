import { useEffect } from 'react';

const useAddLibrary = (url) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.body.appendChild(script);
  }, [url]);
};

export default useAddLibrary;
