import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue?: T) => {
   const [storedValue, setStoredValue] = useState<T>();

   useEffect(() => {
      if (storedValue) {
         localStorage.setItem(key, JSON.stringify(storedValue || ''));
      }
   }, [storedValue]);

   useEffect(() => {
      if (initialValue && !localStorage.getItem(key)) {
         localStorage.setItem(key, JSON.stringify(storedValue || ''));
      }

      if (!storedValue && localStorage.getItem(key)) {
         setStoredValue(JSON.parse(localStorage.getItem(key) as string));
      }
   }, [initialValue, key]);

   return [storedValue, setStoredValue] as const;
};
