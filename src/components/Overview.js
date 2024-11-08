import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Star } from 'lucide-react';

const Overview = ({ petInfo }) => {
    // Animation variants
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

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="px-4 py-6 space-y-6"
        >
            {/*/!* Welcome Message *!/*/}
            {/*<div className="flex items-center justify-between mb-4">*/}
            {/*    <h1 className="text-2xl font-bold text-gray-900">*/}
            {/*        Welcome back, {petInfo.name}!*/}
            {/*    </h1>*/}
            {/*</div>*/}

            {/*/!* Quick Stats Card *!/*/}
            {/*<motion.div*/}
            {/*    variants={itemVariants}*/}
            {/*    className="bg-white rounded-2xl p-5 mb-4 shadow-sm"*/}
            {/*>*/}
            {/*    <div className="grid grid-cols-2 gap-4">*/}
            {/*        <div>*/}
            {/*            <span className="text-gray-500 text-sm">Health Score</span>*/}
            {/*            <div className="text-[40px] font-bold text-green-500 tracking-tight">95/100</div>*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <span className="text-gray-500 text-sm">Next Check-up</span>*/}
            {/*            <div className="text-lg font-medium text-gray-900 mt-1">In 7 days</div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</motion.div>*/}

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