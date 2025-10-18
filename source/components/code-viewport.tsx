import clipboard from 'clipboardy';
import { useState } from 'react';
import { CodeBlock } from 'react-code-block';

interface CodeViewportProps {
  code: string;
  language: string;
}

export function CodeViewport({ code, language }: CodeViewportProps) {
  const [isCopied, setIsCopied] = useState<boolean | null>(null);

  const handleCopyCode = async () => {
    try {
      await clipboard.write(code);
      setIsCopied(true);
    } catch {
      setIsCopied(false);
    }

    setTimeout(() => {
      setIsCopied(null);
    }, 3000);
  };

  return (
    <CodeBlock code={code} language={language}>
      <div className='relative overflow-hidden rounded-xl shadow-md ring-1 ring-border/40 dark:shadow-none'>
        <div className='flex h-12 items-center justify-between border-b border-border/40 bg-surface/80 px-4 backdrop-blur-sm dark:bg-muted/50'>
          <span className='text-sm font-medium text-foreground/70 dark:text-foreground/60'>
            {language}
          </span>
          <button className='cursor-pointer rounded-full bg-foreground/10 px-3 py-1.5 text-sm font-semibold text-foreground transition-all duration-150 hover:bg-foreground/20 dark:bg-foreground/20 dark:hover:bg-foreground/30' onClick={handleCopyCode} type='button'>
            {isCopied === null ? 'Copy' : isCopied ? '🎉 Copied' : '❌ Error'}
          </button>
        </div>
        <CodeBlock.Code className='overflow-x-auto bg-surface p-4 font-mono text-sm leading-relaxed text-foreground dark:bg-muted/30'>
          <div className='table-row'>
            <CodeBlock.LineNumber className='table-cell pr-4 text-right text-foreground/40 select-none dark:text-foreground/50' />
            <CodeBlock.LineContent className='table-cell'>
              <CodeBlock.Token />
            </CodeBlock.LineContent>
          </div>
        </CodeBlock.Code>
      </div>
    </CodeBlock>
  );
}
