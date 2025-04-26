import * as React from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (value: string) => void;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      // 允许 + 号和数字
      const formattedValue = value.replace(/[^\d+]/g, '');

      if (onChange) {
        onChange(formattedValue);
      }
    };

    return (
      <Input
        type="tel"
        className={cn('', className)}
        onChange={handleChange}
        ref={ref}
        {...props}
      />
    );
  },
);
PhoneInput.displayName = 'PhoneInput';
