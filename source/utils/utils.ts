import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends any[]>(
  func: (...args: T) => void,
  delay: number,
): (...args: T) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: T) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
      timer = null;
    }, delay);
  };
}

export function isProductMatch(productName: string, searchText: string) {
  searchText = searchText.toLowerCase().split(/\s+/g).join('-').replaceAll('+', 'p');
  productName = productName.toLowerCase().split(/\s+/g).join('-').replaceAll('+', 'p');

  return searchText === '' ? true : productName.includes(searchText);
}
