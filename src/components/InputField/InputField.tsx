import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      onChange,
      defaultValue,
      errorMessage,
      className,
      ...props
    }: InputFieldProps,
    ref
  ) => {
    const [hasValue, setHasValue] = useState(!!defaultValue);

    const handleChange = (e: React.FocusEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length !== 0);
      if (onChange) {
        onChange(e);
      }
    };

    // Input type of Date or Time or both should always have its label collapsed
    const inputTypeIsTimeOrDate =
      props.type === 'date' ||
      props.type === 'time' ||
      props.type === 'datetime-local';
    const shouldCollapseLabel = hasValue || inputTypeIsTimeOrDate;

    return (
      <div>
        <div className="relative flex w-full items-center justify-center">
          <input
            ref={ref}
            onChange={handleChange}
            data-testid={'input-field'}
            className={twMerge(
              className,
              'peer w-full rounded-md border-2 border-wolt-grey p-4 pb-[6px] pt-[22px] outline-none transition placeholder:opacity-0 hover:border-wolt-blue focus:border-wolt-blue focus:shadow-border-like focus:placeholder:opacity-100'
            )}
            {...props}
          />
          <label
            className={`linear duration-config pointer-events-none absolute w-full origin-left translate-x-4 scale-100 
        select-none opacity-60 transition-all peer-focus:-translate-y-3 peer-focus:scale-[65%] ${
          shouldCollapseLabel && '-translate-y-3 scale-[65%]'
        }`}
          >
            {label}
          </label>
        </div>
        {errorMessage ? (
          <p
            data-testid={`${props.name ? `${props.name}ErrorMessage` : `errorMessage`}`}
            className="pl-3 pt-[2px] text-sm text-red-500"
          >
            {errorMessage}
          </p>
        ) : null}
      </div>
    );
  }
);
