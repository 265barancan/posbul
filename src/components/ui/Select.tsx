import { type SelectHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    icon?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ icon, className, children, ...props }, ref) => {
        return (
            <div className="relative">
                {icon && (
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-400 pointer-events-none">
                        {icon}
                    </span>
                )}
                <select
                    ref={ref}
                    className={twMerge(
                        clsx(
                            "w-full cursor-pointer appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pr-10 text-sm text-slate-900 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100",
                            icon ? "pl-10" : "pl-4",
                            className
                        )
                    )}
                    {...props}
                >
                    {children}
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-400">
                    expand_more
                </span>
            </div>
        );
    }
);

Select.displayName = "Select";
export default Select;
