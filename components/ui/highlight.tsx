"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const Highlight = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <motion.span
            initial={{
                backgroundSize: "0% 100%",
            }}
            animate={{
                backgroundSize: "100% 100%",
            }}
            transition={{
                duration: 2,
                ease: "linear",
                delay: 0.5,
            }}
            style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                display: "inline",
            }}
            className={cn(
                `relative inline-block pb-1 px-1 rounded-lg
                bg-gradient-to-r from-primary/20 to-purple-500/20
                dark:from-primary/30 dark:to-purple-500/30
                text-primary dark:text-white
                hover:from-primary/30 hover:to-purple-500/30
                dark:hover:from-primary/40 dark:hover:to-purple-500/40
                transition-all duration-300`,
                className
            )}
        >
            {children}
        </motion.span>
    );
};