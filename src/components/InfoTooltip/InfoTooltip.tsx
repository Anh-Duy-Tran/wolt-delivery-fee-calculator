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
    <div
      tabIndex={0}
      className={twMerge(
        className,
        'group relative rounded ring-wolt-blue focus:ring-2'
      )}
      {...props}
    >
      {children}
      <div
        data-testid={'tooltip'}
        className="absolute right-0 mt-2 w-[400px] scale-75 rounded-md bg-slate-700 p-3 px-5 pl-7 text-sm text-white opacity-0 transition group-hover:scale-100 group-hover:opacity-100 group-focus:scale-100 group-focus:opacity-100"
      >
        {tipContent}
      </div>
    </div>
  );
}
