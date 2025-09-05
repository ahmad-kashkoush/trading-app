"use client"
import SectionLayout from "@/components/layout/SectionLayout";
import { Accordion as AccordionComponent } from "@/components/ui/Accordion";
import { typography } from "@/styles";
import { animationVariants } from "@/styles/animations";
import { motion } from "framer-motion";
import { JSX } from "react";
export default function AccordionSection(): JSX.Element {
    return (
        <SectionLayout
            backgroundVariant="none"
            contentAlignment="center"
            className='bg-black py-16'
        >
            <motion.div variants={animationVariants.slideUp}>
                <h2 className={`${typography.phonic} ${typography.colors.white} ${typography.heading.large} mb-12`}>
                    Frequently Asked Questions
                </h2>
            </motion.div>

            <motion.div
                variants={animationVariants.slideUp}
                className="w-full"
            >
                <AccordionComponent />
            </motion.div>
        </SectionLayout>
    );
}