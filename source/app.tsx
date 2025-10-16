import { DialogDisclaimer } from '@/components/dialog-disclaimer';
import { DialogSetting } from '@/components/dialog-setting';
import { DialogTutorial } from '@/components/dialog-tutorial';
import { PageFooter } from '@/components/page-footer';
import { PageHeader } from '@/components/page-header';
import { PageMain } from '@/components/page-main';
import { ThemeProvider } from '@/components/theme-provider';

export function App() {
  return (
    <ThemeProvider>
      <div className='relative flex min-h-dvh flex-col'>
        <PageHeader />
        <PageMain />
        <PageFooter />
        <DialogSetting />
        <DialogTutorial />
        <DialogDisclaimer />
      </div>
    </ThemeProvider>
  );
}
