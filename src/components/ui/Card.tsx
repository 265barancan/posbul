import type { HTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
}

export default function Card({
    hover = false,
    className,
    children,
    ...props
}: CardProps) {
    return (
        <div
            className={twMerge(
                clsx(
                    "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900",
                    hover &&
                    "transition-all duration-200 hover:border-primary/50 hover:shadow-md",
                    className
                )
            )}
            {...props}
        >
            {children}
        </div>
    );
}
