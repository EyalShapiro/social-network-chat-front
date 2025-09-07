import { parseJson, stringifyJson } from '../jsonFromParser';
// * ---------------- setters-function ----------------
/**
 * Saves a value into localStorage under the given key.
 *
 * @param {string} key - The storage key.
 * @param {string | object | number | unknown} value - The value to store. Will be stringified.
 */
export function setItemStorage(key: string, value: string | object | number | unknown): void {
  try {
    if (!key) throw new Error('Key is required');

    const valueSet = stringifyJson(value);
    localStorage.setItem(key, valueSet);
  } catch (err) {
    console.error(err);
  }
}

/**
 * Removes a value from localStorage by key.
 *
 * @param {string} key - The storage key.
 */
export function removeItemStorage(key: string): void {
  try {
    if (!key) throw new Error('Key is required');
    localStorage.removeItem(key);
  } catch (err) {
    console.error(err);
  }
}

// * ---------------- getters-function ----------------

/**
 * Retrieves all key–value pairs from localStorage.
 * Attempts to parse JSON values where possible.
 *
 * @returns {Record<string, unknown>} - Object containing all items.
 */
export function getAllItemsFromStorage(): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      const rawValue = localStorage.getItem(key);
      if (rawValue === null) continue;

      result[key] = parseJson(rawValue, ['', '']);
    }
  } catch (error) {
    if (typeof window !== 'undefined') {
      console.warn('Failed to get items from storage:', error);
    }
  }

  return result;
}

/**
 * Retrieves a raw string value from localStorage.
 *
 * @param {string} key - The storage key.
 * @returns {string | null} The stored value or null if missing.
 */
export function fetchItemStorage(key: string): string | null {
  try {
    if (!key) throw new Error('Key is required');
    return localStorage.getItem(key);
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Retrieves an array from localStorage, with a fallback to the provided initial value.
 *
 * @template T
 * @param {string} key - The storage key.
 * @param {T[]} [initialValue=[]] - Default value if parsing fails or data is missing.
 * @returns {T[]} Parsed array or fallback.
 */
export function fetchArrFromStorage<T>(key: string, initialValue: T[] = []): T[] {
  try {
    const savedData = localStorage.getItem(key);
    return parseJson(savedData, initialValue);
  } catch (error) {
    console.error('Failed to parse data from localStorage:', error);
  }
  return initialValue;
}

/**
 * Retrieves an object from localStorage, with a fallback to the provided initial value.
 *
 * @template T
 * @param {string} key - The storage key.
 * @param {T} [initialValue={}] - Default value if parsing fails or data is missing.
 * @returns {T} Parsed object or fallback.
 */
export function fetchObjFromStorage<T extends object>(key: string, initialValue: T = {} as T): T {
  try {
    const savedData = localStorage.getItem(key);
    return parseJson(savedData, initialValue);
  } catch (error) {
    console.error('Failed to parse data from localStorage:', error);
  }
  return initialValue;
}
