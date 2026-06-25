import React from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'tertiary';
}

export const Button: React.FC<ButtonProps> = ({ className, variant = 'primary', ...props }) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-sans transition-colors uppercase tracking-[1.4px]",
        "h-[48px] px-[32px] py-[14px] font-bold text-[14px] leading-none rounded-none outline-none",
        variant === 'primary' && "bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-active",
        variant === 'outline' && "bg-transparent border border-ink text-ink hover:bg-surface-elevated",
        variant === 'tertiary' && "bg-transparent text-ink border-none px-0 hover:text-primary",
        props.disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
};
