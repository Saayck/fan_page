import { InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={clsx(
            "input-field",
            error && "border-red-400 focus:ring-red-400",
            className
          )}
          {...props}
        />
        {error && <p className="error-msg">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
