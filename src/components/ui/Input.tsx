import { type InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ icon, error, className, ...props }, ref) => {
        return (
            <div className="relative">
                {icon && (
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-400">
                        {icon}
                    </span>
                )}
                <input
                    ref={ref}
                    className={twMerge(
                        clsx(
                            "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-primary",
                            icon && "pl-10",
                            error && "border-red-400 focus:border-red-400 focus:ring-red-400/20",
                            className
                        )
                    )}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-xs text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
export default Input;
