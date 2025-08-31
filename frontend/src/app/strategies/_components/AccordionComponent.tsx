"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { typography } from '@/constants/styles';
import { COLORS } from '@/styles/theme';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        id: 'faq1',
        question: 'What is Robinhood Strategies?',
        answer: 'Robinhood Strategies is an expert-managed investment service that creates personalized portfolios based on your financial goals and risk tolerance.'
    },
    {
        id: 'faq2',
        question: 'How does portfolio management work?',
        answer: 'Our team of experts actively manages your portfolio, making adjustments based on market conditions and your investment objectives while keeping you informed of all changes.'
    },
    {
        id: 'faq3',
        question: 'What are the fees for Strategies?',
        answer: 'Robinhood Strategies has a simple, transparent fee structure with no hidden costs. You can view detailed fee information in your account dashboard.'
    },
    {
        id: 'faq4',
        question: 'How do I get started?',
        answer: 'Getting started is easy. Simply answer a few questions about your financial goals, and we\'ll create a personalized investment strategy for you.'
    },
    {
        id: 'faq5',
        question: 'Can I withdraw my money anytime?',
        answer: 'Yes, you can withdraw your funds at any time. However, we recommend keeping your investments for the long term to maximize potential returns.'
    }
];

const AccordionComponent: React.FC = () => {
    const [expandedItem, setExpandedItem] = useState<string | null>(null);

    const toggleItem = (itemId: string) => {
        setExpandedItem(expandedItem === itemId ? null : itemId);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            {faqData.map((item, index) => (
                <motion.div
                    key={item.id}
                    className="border-b border-white border-opacity-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <motion.div
                        className="flex justify-between  py-6 cursor-pointer group"
                        onClick={() => toggleItem(item.id)}
                        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
                        transition={{ duration: 0.2 }}
                    >
                        <p className={` text-xl lg:text-xl ${typography.colors.white}  pr-4 group-hover:text-gray-300 transition-colors`}>
                            {item.question}
                        </p>
                        
                        <motion.div
                            animate={{ 
                                rotate: expandedItem === item.id ? 180 : 0 
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <ExpandMoreIcon 
                                sx={{ 
                                    color: COLORS.WHITE, 
                                    fontSize: 28,
                                    transition: 'color 0.2s',
                                    '&:hover': {
                                        color: 'rgba(255,255,255,0.7)'
                                    }
                                }} 
                            />
                        </motion.div>
                    </motion.div>
                    
                    <AnimatePresence>
                        {expandedItem === item.id && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ overflow: 'hidden' }}
                            >
                                <div className="pb-6 pr-12 text-left">
                                    <p className={`${typography.phonic} ${typography.body.medium} ${typography.colors.gray} leading-relaxed`}>
                                        {item.answer}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    );
};

export default AccordionComponent;
