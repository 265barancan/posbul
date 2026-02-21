import type { ReactNode } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface PageWrapperProps {
    children: ReactNode;
    className?: string;
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
    return (
        <main
            className={twMerge(
                clsx("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)
            )}
        >
            {children}
        </main>
    );
}
