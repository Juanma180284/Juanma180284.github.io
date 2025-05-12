import React from 'react';

export const createStorage = (key, initialValue) => {
  const storedValue = localStorage.getItem(key);
  if (storedValue === null) {
    localStorage.setItem(key, JSON.stringify(initialValue));
    return initialValue;
  }
  return JSON.parse(storedValue);
};

export const getStorage = (key) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
};

export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent('storageChange', { detail: { key, value } }));
};

export const useStorageListener = (key, callback) => {
  React.useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.detail.key === key) {
        callback(event.detail.value);
      }
    };
    window.addEventListener('storageChange', handleStorageChange);
    return () => {
      window.removeEventListener('storageChange', handleStorageChange);
    };
  }, [key, callback]);
};

export default { createStorage, getStorage, setStorage, useStorageListener };