import { useEffect, useState } from 'react';

/**
 * useDebouncedValue
 *
 * Returns a debounced version of a value.
 * The value will only be updated after the specified delay
 * has passed without changes.
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 */
export function useDebouncedValue<T>(
  value: T,
  delay: number = 300
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
}