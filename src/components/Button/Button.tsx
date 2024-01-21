import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        className,
        'rounded-[6px] bg-wolt-blue p-3 text-white'
      )}
      {...props}
    />
  );
}
