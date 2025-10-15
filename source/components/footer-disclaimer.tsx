import { ShieldCheck } from 'lucide-react';
import { ButtonIcon } from '@/components/button-icon';
import { useLocalStorage } from '@/hooks/use-storage';

export function FooterDisclaimer() {
  const setIsDisclaim = useLocalStorage(state => state.setIsDisclaim);

  return (
    <ButtonIcon onClick={() => setIsDisclaim(true)}>
      <ShieldCheck
        size={48}
        strokeWidth={4}
        absoluteStrokeWidth
        className="size-6 text-foreground"
      />
    </ButtonIcon>
  );
}
