import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface SkeletonProps {
    className?: string;
    variant?: "text" | "circle" | "rect";
    width?: string;
    height?: string;
}

export default function Skeleton({
    className,
    variant = "text",
    width,
    height,
}: SkeletonProps) {
    return (
        <div
            className={twMerge(
                clsx(
                    "animate-pulse bg-slate-200 dark:bg-slate-700",
                    variant === "text" && "h-4 w-full rounded",
                    variant === "circle" && "h-10 w-10 rounded-full",
                    variant === "rect" && "h-20 w-full rounded-xl",
                    className
                )
            )}
            style={{ width, height }}
            aria-hidden="true"
        />
    );
}
