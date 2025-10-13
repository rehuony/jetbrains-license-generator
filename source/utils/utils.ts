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

export function getExpiryDate(expiry = 1) {
  const today = new Date();
  const nextYear = new Date(today.getFullYear() + expiry, today.getMonth(), today.getDate());

  const year = nextYear.getFullYear();
  const month = String(nextYear.getMonth() + 1).padStart(2, '0');
  const day = String(nextYear.getDay()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function generateLicenseId() {
  const charList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 10 }, () => {
    return charList[Math.floor(Math.random() * charList.length)];
  }).join('');
}
