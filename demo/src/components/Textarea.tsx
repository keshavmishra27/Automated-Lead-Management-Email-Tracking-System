import React from 'react';
import { cn } from '../lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-xxs">
        {label && <label className="text-[11px] uppercase tracking-[1.1px] font-semibold text-ink">{label}</label>}
        <textarea
          ref={ref}
          className={cn(
            "px-[16px] py-[14px] bg-canvas text-ink text-[14px] border rounded-sm outline-none transition-colors resize-y min-h-[120px]",
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
Textarea.displayName = 'Textarea';
