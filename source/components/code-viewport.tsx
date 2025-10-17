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
      <div className='relative'>
        <div className='absolute top-0 left-0 flex h-12 w-full items-center justify-between pr-2 pl-4'>
          <span className='text-gray-200'>
            {language}
          </span>
          <button className='cursor-pointer rounded-full bg-white px-3 py-1.5 text-sm font-semibold' onClick={handleCopyCode} type='button'>
            {isCopied === null ? 'Copy' : isCopied ? 'Copied' : 'Error'}
          </button>
        </div>
        <CodeBlock.Code className='overflow-x-auto rounded-xl bg-gray-900 p-4 pt-12 shadow-lg select-text'>
          <div className='table-row'>
            <CodeBlock.LineNumber className='table-cell pr-4 text-right text-sm text-gray-500 select-none' />
            <CodeBlock.LineContent className='table-cell'>
              <CodeBlock.Token />
            </CodeBlock.LineContent>
          </div>
        </CodeBlock.Code>
      </div>
    </CodeBlock>
  );
}
