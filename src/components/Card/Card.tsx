import React from 'react';
import { twMerge } from 'tailwind-merge';
interface CardProps extends React.HTMLProps<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      data-testid={'card'}
      className={twMerge(className, 'w-full rounded-xl bg-white p-5 shadow-xl')}
      {...props}
    />
  );
}
