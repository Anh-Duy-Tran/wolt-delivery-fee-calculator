import { InputHTMLAttributes, forwardRef, useState } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { label, onChange, defaultValue, errorMessage, ...props }: InputFieldProps,
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
    const shouldCollpaseLabel = hasValue || inputTypeIsTimeOrDate;

    return (
      <div>
        <div className="relative flex w-full items-center justify-center">
          <input
            ref={ref}
            onChange={handleChange}
            {...props}
            className="peer w-full rounded-md border-2 border-wolt-grey p-4 pb-[6px] pt-[22px] outline-none transition placeholder:opacity-0 hover:border-wolt-blue focus:border-wolt-blue focus:shadow-border-like focus:placeholder:opacity-100"
          />
          <label
            className={`linear duration-config pointer-events-none absolute w-full origin-left translate-x-4 
        select-none opacity-60 transition-all peer-focus:-translate-y-3 peer-focus:scale-[65%] ${
          shouldCollpaseLabel && '-translate-y-3 scale-[65%]'
        }`}
          >
            {label}
          </label>
        </div>
        {errorMessage ? (
          <p className="pl-3 pt-[2px] text-sm text-red-500">{errorMessage}</p>
        ) : null}
      </div>
    );
  }
);
