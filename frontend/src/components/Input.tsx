import React from 'react';
import { cn } from '../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-xxs">
        {label && <label className="text-[11px] uppercase tracking-[1.1px] font-semibold text-ink">{label}</label>}
        <input
          ref={ref}
          className={cn(
            "h-[48px] px-[16px] py-[14px] bg-canvas text-ink text-[14px] border rounded-sm outline-none transition-colors",
            error ? "border-semantic-warning focus:border-semantic-warning" : "border-hairline focus:border-hairline-soft",
            className
          )}
          {...props}
        />
        {error && <span className="text-[12px] text-semantic-warning">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
