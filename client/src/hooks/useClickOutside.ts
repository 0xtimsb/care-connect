import { useEffect } from 'react';

const useClickOutside = (ref: any, handler: any) => {
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false);

    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
  });

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      handler();
    }
  };
};

export default useClickOutside;