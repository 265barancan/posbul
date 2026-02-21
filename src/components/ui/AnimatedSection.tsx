import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type AnimationType = "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-in";

interface AnimatedSectionProps {
    children: ReactNode;
    animation?: AnimationType;
    delay?: number;
    duration?: number;
    className?: string;
    as?: "div" | "section" | "article" | "span";
}

const animationVariants: Record<AnimationType, Variants> = {
    "fade-up": {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    },
    "fade-in": {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    "fade-left": {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0 },
    },
    "fade-right": {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0 },
    },
    "scale-in": {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
    },
};

export default function AnimatedSection({
    children,
    animation = "fade-up",
    delay = 0,
    duration = 0.5,
    className,
    as = "div",
}: AnimatedSectionProps) {
    const Component = {
        div: motion.div,
        section: motion.section,
        article: motion.article,
        span: motion.span
    }[as] as React.ElementType;

    return (
        <Component
            variants={animationVariants[animation]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={twMerge(clsx(className))}
        >
            {children}
        </Component>
    );
}
