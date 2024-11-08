import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Star } from 'lucide-react';

const Overview = ({ petInfo }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    // Avatar animation
    const avatarVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                duration: 0.8
            }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="px-4 py-6 space-y-6"
        >
            {/* Welcome Section with Avatar */}
            <motion.div
                className="flex flex-col items-center text-center mb-8"
                variants={itemVariants}
            >
                {/* Pet Avatar */}
                <motion.div
                    variants={avatarVariants}
                    className="relative w-32 h-32 mb-6"
                >
                    <div className="absolute inset-0 bg-violet-400 rounded-[2rem] shadow-lg flex items-center justify-center">
                        <div className="relative">
                            {/* Pet icon - you might want to replace this with an actual SVG or image */}
                            <span className="text-4xl">🐕</span>
                        </div>
                    </div>
                </motion.div>

                {/* Welcome Text */}
                <motion.h1
                    variants={itemVariants}
                    className="text-2xl font-bold text-gray-900 mb-2"
                >
                    Hi, I'm {petInfo.name}! ✨
                </motion.h1>
                <motion.p
                    variants={itemVariants}
                    className="text-gray-600"
                >
                    Let's have a pawsome day!
                </motion.p>
            </motion.div>

            {/* Health Score Card */}
            <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-purple-400 to-violet-400 rounded-[24px] p-6 text-white shadow-lg"
            >
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                        <Heart className="w-6 h-6" />
                        <span className="text-lg font-medium">Health Score</span>
                    </div>
                    <Star className="w-6 h-6 text-yellow-300" />
                </div>
                <div className="text-[40px] font-bold tracking-tight leading-none mt-2">95/100</div>
                <div className="text-base mt-2">Feeling purrfect today! ⭐️</div>
            </motion.div>

            {/* Activity Card */}
            <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-teal-400 to-cyan-400 rounded-[24px] p-6 text-white shadow-lg"
            >
                <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-6 h-6" />
                    <span className="text-lg font-medium">Activity</span>
                </div>
                <div className="text-[40px] font-bold tracking-tight leading-none mt-2">85%</div>
                <div className="text-base mt-2">Almost at daily goal! 🎯</div>
            </motion.div>
        </motion.div>
    );
};

export default Overview;