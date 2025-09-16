'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { cn } from '@/shared/utils';

function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="relative flex h-10 w-20 justify-between rounded-lg border border-gray-200 bg-gray-100 p-1 dark:border-gray-200/10 dark:bg-black/10">
      <div
        className="flex size-[30px] items-center justify-center rounded-lg"
        onClick={() => setTheme('dark')}
      >
        <Moon className="relative z-10 size-4" />
      </div>
      <div
        className="flex size-[30px] items-center justify-center rounded-lg"
        onClick={() => setTheme('light')}
      >
        <Sun className="relative z-10 size-4" />
      </div>
      <div
        className={cn(
          'absolute left-1 top-1 size-[30px] rounded-lg bg-white transition-all dark:bg-black',
          {
            'translate-x-10': theme === 'light',
            'translate-x-0': theme === 'dark',
          },
        )}
      />
    </div>
  );
}
export default ModeToggle;
