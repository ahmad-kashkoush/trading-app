"use client"
import {motion} from "framer-motion";
import SectionLayout from "@/_components/SectionLayout";
import AccordionComponent from "@/_components/AccordionComponent";
import { animationVariants } from "@/constants/animations";
import { typography } from "@/constants/styles";
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