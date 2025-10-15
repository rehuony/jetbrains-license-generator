import { ScrollText } from 'lucide-react';
import { ButtonIcon } from '@/components/button-icon';
import { useLocalStorage } from '@/hooks/use-storage';

export function FooterQuestion() {
  const setIsQuestion = useLocalStorage(state => state.setIsQuestion);

  return (
    <ButtonIcon onClick={() => setIsQuestion(true)}>
      <ScrollText
        size={48}
        strokeWidth={4}
        absoluteStrokeWidth
        className="size-6 text-foreground"
      />
    </ButtonIcon>
  );
}
