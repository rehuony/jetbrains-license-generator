export function convertPemToString(pemCert: string) {
  return pemCert.split(/\s+/g).reduce((result, line) => (line.includes('--') ? result : result + line), '');
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

export function isProductMatch(productName: string, searchText: string) {
  searchText = searchText.toLowerCase().split(/\s+/g).join('-').replaceAll('+', 'p');
  productName = productName.toLowerCase().split(/\s+/g).join('-').replaceAll('+', 'p');

  return searchText === '' ? true : productName.includes(searchText);
}
