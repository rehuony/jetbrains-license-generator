import { Settings } from 'lucide-react';
import { ButtonIcon } from '@/components/button-icon';
import { useLocalStorage } from '@/hooks/use-storage';

export function FooterSetting() {
  const setIsSetting = useLocalStorage(state => state.setIsSetting);

  return (
    <ButtonIcon onClick={() => setIsSetting(true)}>
      <Settings
        size={48}
        strokeWidth={4}
        absoluteStrokeWidth
        className="size-6 text-foreground"
      />
    </ButtonIcon>
  );
}
