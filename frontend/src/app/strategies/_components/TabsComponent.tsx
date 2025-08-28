"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoComponent from '../../_components/VideoComponent';
import { COLORS } from '../../styles/theme';
import { typography } from '../../constants/styles';

interface TabData {
    id: string;
    heading: string;
    description: string;
    videoSrc: string;
}

const tabsData: TabData[] = [
    {
        id: 'tab1',
        heading: 'Timely market insights',
        description: 'Get the full context and a deeper understanding of each portfolio adjustment.',
        videoSrc: '/RH25_Strategies_GTM_dotcom_insights_1500x843_ak_desktop_v13.webm'
    },
    {
        id: 'tab2',
        heading: 'Expert minds and experience',
        description: 'Our team has a combined 50+ years of experience with high-net worth and institutional clients.',
        videoSrc: '/RH25_Strategies_GTM_dotcom_expertMinds_2100x1180_ak_desktop_v03.webm'
    }
];

const TabsComponent: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('tab1');

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };

    const activeTabData = tabsData.find(tab => tab.id === activeTab);

    return (
        <div className="w-full max-w-6xl mx-auto">
            {/* Tabs Navigation */}
            {/* Desktop View - Side by side tabs */}
            <div className="hidden md:flex gap-12 mb-8 text-left">
                {tabsData.map((tab) => (
                    <motion.div
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={`cursor-pointer transition-all duration-300 ${activeTab === tab.id
                            ? 'opacity-100'
                            : 'opacity-50 hover:opacity-70'
                            }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Top White Border */}
                        <motion.div
                            className="h-1 bg-white mb-4 rounded-full origin-center"
                            initial={{ scaleX: 0 }}
                            animate={{
                                scaleX: activeTab === tab.id ? 1 : 0.3,
                                opacity: activeTab === tab.id ? 1 : 0.5
                            }}
                            transition={{ duration: 0.3 }}
                        />

                        {/* Tab Content */}
                        <div className="min-w-[300px]">
                            <h3 className={`${typography.serif} ${typography.heading.medium} ${typography.colors.white} mb-3`}>
                                {tab.heading}
                            </h3>
                            <p className={`${typography.phonic} ${typography.body.medium} ${activeTab === tab.id
                                ? typography.colors.gray
                                : typography.colors.whiteFaded
                                } transition-colors duration-300`}>
                                {tab.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Mobile/Small Screen View - List format */}
            <div className="md:hidden mb-8">
                {tabsData.map((tab, index) => (
                    <motion.div
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={`cursor-pointer transition-all duration-300 py-4 px-4 rounded-lg ${activeTab === tab.id
                                ? 'bg-white/20'
                                : 'hover:bg-white/20 '
                            }`}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <h3 className={`${typography.serif} ${typography.heading.medium} transition-colors duration-300 ${activeTab === tab.id
                                ? typography.colors.white
                                : typography.colors.whiteFaded
                            }`}>
                            {tab.heading}
                        </h3>
                    </motion.div>
                ))}
            </div>

            {/* Video Content */}
            <AnimatePresence mode="wait">
                {activeTabData && (
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="w-full"
                    >
                        <VideoComponent
                            src={activeTabData.videoSrc}
                            className="rounded-2xl overflow-hidden shadow-2xl w-full"
                            autoPlay={true}
                            muted={true}
                            loop={true}
                            showLastFrame={false}
                            controls={false}
                            onVideoEnd={() => { }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TabsComponent;
