import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface InfoTooltipProps extends React.HTMLProps<HTMLDivElement> {
  tipContent: ReactNode;
}

export function InfoTooltip({
  className,
  children,
  tipContent,
  ...props
}: InfoTooltipProps) {
  return (
    <div className="relative">
      <div
        tabIndex={0}
        className={twMerge(
          className,
          'peer rounded ring-wolt-blue focus:ring-2'
        )}
        {...props}
      >
        {children}
      </div>
      <div
        data-testid={'tooltip'}
        className="absolute right-0 z-50 mt-2 w-[350px] scale-75 rounded-md bg-slate-700 p-3 text-sm text-white opacity-0 transition peer-hover:scale-100 peer-hover:opacity-100 peer-focus:scale-100 peer-focus:opacity-100"
      >
        {tipContent}
      </div>
    </div>
  );
}
