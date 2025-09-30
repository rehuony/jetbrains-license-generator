import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/app.tsx';
import { Toaster } from '@/components/shadcn/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import '@/styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <Toaster />
    </ThemeProvider>
  </StrictMode>,
);
