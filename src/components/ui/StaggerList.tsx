import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface StaggerListProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
    duration?: number;
}

const containerVariants: Variants = {
    hidden: {},
    visible: (staggerDelay: number) => ({
        transition: {
            staggerChildren: staggerDelay,
        },
    }),
};


export default function StaggerList({
    children,
    className,
    staggerDelay = 0.1,
}: StaggerListProps) {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            custom={staggerDelay}
            className={twMerge(clsx(className))}
        >
            {children}
        </motion.div>
    );
}
