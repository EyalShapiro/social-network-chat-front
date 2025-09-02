import { stringifyObj } from './jsonParser';

export const getAllLocalStorage = () => {
  const localStorageData: Record<string, string> = {};
  Object.keys(localStorage).forEach((key) => {
    localStorageData[key] = localStorage.getItem(key) || '';
  });
  return localStorageData;
};

export const fetchItem = (key: string) => {
  try {
    if (!key) throw new Error('Key is required');

    return localStorage.getItem(key);
  } catch (err) {
    console.error(err);
    return '';
  }
};

export const setItem = (key: string, value: string | object | number) => {
  try {
    if (!key) throw new Error('Key is required');

    const valueSet = typeof value === 'string' ? value : stringifyObj(value);
    localStorage.setItem(key, valueSet);
  } catch (err) {
    console.error(err);
  }
};

export const removeItem = (key: string) => {
  try {
    if (!key) throw new Error('Key is required');
    localStorage.removeItem(key);
  } catch (err) {
    console.error(err);
  }
};
