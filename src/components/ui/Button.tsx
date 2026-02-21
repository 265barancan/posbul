import { type ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: string;
    iconPosition?: "left" | "right";
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        "bg-primary text-white hover:bg-primary/90 active:bg-primary/80 shadow-sm shadow-primary/25",
    secondary:
        "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
    ghost:
        "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100",
    outline:
        "border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = "primary",
            size = "md",
            icon,
            iconPosition = "left",
            className,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={twMerge(
                    clsx(
                        "inline-flex cursor-pointer items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50",
                        variantStyles[variant],
                        sizeStyles[size],
                        className
                    )
                )}
                {...props}
            >
                {icon && iconPosition === "left" && (
                    <span className="material-symbols-outlined text-[18px]">{icon}</span>
                )}
                {children}
                {icon && iconPosition === "right" && (
                    <span className="material-symbols-outlined text-[18px]">{icon}</span>
                )}
            </button>
        );
    }
);

Button.displayName = "Button";
export default Button;
