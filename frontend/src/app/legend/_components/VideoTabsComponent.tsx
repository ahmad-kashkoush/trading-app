"use client";

import { Video as VideoComponent } from '@/components/ui';
import { typography } from '@/styles';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { ShowChart, Analytics, Edit, Schedule } from '@mui/icons-material';

interface TabData {
    id: string;
    heading: string;
    description: string;
    videoSrc: string;
    icon: React.ComponentType<any>;
}

const tabsData: TabData[] = [
    {
        id: 'tab1',
        heading: 'Trading charts',
        description: '',
        videoSrc: '/trading_desktop.mp4',
        icon: ShowChart
    },
    {
        id: 'tab2',
        heading: 'Technical Indicators',
        description:'',
        videoSrc: '/indicators_desktop.mp4',
        icon: Analytics
    },
    {
        id: 'tab3',
        heading: 'Drawing tools',
        description:'',
        videoSrc: '/drawing_desktop.mp4',
        icon: Edit
    },
    {
        id: 'tab4',
        heading: 'Custom intervals',
        description:'',
        videoSrc: '/intervals_desktop.mp4',
        icon: Schedule
    }
];

const VideoTabsComponent: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('tab1');

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };

    const handlePreviousTab = () => {
        const currentIndex = tabsData.findIndex(tab => tab.id === activeTab);
        const previousIndex = currentIndex === 0 ? tabsData.length - 1 : currentIndex - 1;
        setActiveTab(tabsData[previousIndex].id);
    };

    const handleNextTab = () => {
        const currentIndex = tabsData.findIndex(tab => tab.id === activeTab);
        const nextIndex = currentIndex === tabsData.length - 1 ? 0 : currentIndex + 1;
        setActiveTab(tabsData[nextIndex].id);
    };

    const activeTabData = tabsData.find(tab => tab.id === activeTab);
    const activeIndex = tabsData.findIndex(tab => tab.id === activeTab);

    return (
        <div className="max-w-7xl mx-auto">
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
                            className="rounded-2xl overflow-hidden shadow-2xl w-full max-w-4xl mx-auto h-[400px] md:h-[500px]"
                            autoPlay={true}
                            muted={true}
                            loop={true}
                            showLastFrame={false}
                            controls={false}
                            onVideoEnd={() => {}}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
               {/* Navigation Arrows and Tabs Container */}
               <div className="flex items-center justify-center gap-8 mb-8 max-w-4xl mx-auto">
                {/* Previous Arrow */}
                <motion.button
                    onClick={handlePreviousTab}
                    className="flex items-center justify-center w-12 h-12 rounded-full border border-white/30 text-white hover:border-white/60 hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Previous tab"
                >
                    <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                </motion.button>

                {/* Tabs Navigation */}
                <div className="flex gap-6 justify-center mt-8">
                    {tabsData.map((tab, index) => (
                        <motion.div
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            className={`cursor-pointer transition-all duration-300 text-center min-w-[120px] ${
                                activeTab === tab.id
                                    ? 'opacity-100'
                                    : 'opacity-50 hover:opacity-70'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Tab Content */}
                            <div className="flex flex-col items-center">
                                {/* MUI Icon */}
                                <div className="mb-3">
                                    <tab.icon 
                                        className={`text-3xl transition-colors duration-300 ${
                                            activeTab === tab.id
                                                ? 'text-white'
                                                : 'text-white/60'
                                        }`}
                                    />
                                </div>
                                
                                {/* Tab Heading */}
                                <h3 className={`${typography.serif} ${typography.heading.small} ${typography.colors.white} text-center`}>
                                    {tab.heading}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Next Arrow */}
                <motion.button
                    onClick={handleNextTab}
                    className="flex items-center justify-center w-12 h-12 rounded-full border border-white/30 text-white hover:border-white/60 hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Next tab"
                >
                    <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                </motion.button>
            </div>

            {/* Mobile Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8 md:hidden">
                {tabsData.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => setActiveTab(tabsData[index].id)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === activeIndex
                                ? 'bg-white'
                                : 'bg-white/30'
                        }`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                    />
                ))}
            </div>
        </div>
    );
};

export default VideoTabsComponent;
