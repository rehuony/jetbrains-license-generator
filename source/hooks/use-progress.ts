import { useEffect, useState } from 'react';

function calcScrollProgress(): number {
  const offsetScroll = window.scrollY;
  const viewHeight = document.documentElement.clientHeight;
  const totalContentHeight = document.documentElement.scrollHeight;
  const maxScrollDistance = totalContentHeight - viewHeight;

  if (maxScrollDistance < 0) {
    return 100;
  }

  let progress = (offsetScroll / maxScrollDistance) * 100;

  progress = Math.max(0, Math.min(100, progress));

  return Number(progress.toFixed(3));
}

export function useProgress(): number {
  const [progress, setProgress] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;

    return calcScrollProgress();
  });

  useEffect(() => {
    const handleScroll = () => {
      setProgress(calcScrollProgress());
    };

    window.addEventListener('resize', handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return progress;
}
