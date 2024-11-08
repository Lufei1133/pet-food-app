import React from 'react';
import { Activity, Target, Scale, Calendar } from 'lucide-react';

const Overview = ({ petInfo }) => {
    const stats = [
        {
            icon: Activity,
            label: 'Activity Level',
            value: petInfo.activityLevel,
            color: 'text-blue-500'
        },
        {
            icon: Target,
            label: 'Age',
            value: `${petInfo.age} years`,
            color: 'text-purple-500'
        },
        {
            icon: Scale,
            label: 'Weight',
            value: `${petInfo.weight}kg`,
            color: 'text-green-500'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl p-4 shadow-sm"
                    >
                        <div className="flex flex-col items-center">
                            <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
                            <span className="text-xs text-gray-500 mb-1">{stat.label}</span>
                            <span className="text-sm font-medium">{stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Health Issues */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Health Issues</h3>
                {petInfo.healthIssues.length > 0 ? (
                    <ul className="space-y-2">
                        {petInfo.healthIssues.map((issue, index) => (
                            <li
                                key={index}
                                className="flex items-center text-sm text-gray-600"
                            >
                                <span className="w-2 h-2 bg-red-400 rounded-full mr-2" />
                                {issue}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500">No known health issues</p>
                )}
            </div>

            {/* Basic Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Pet Information</h3>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Breed</span>
                        <span className="text-sm font-medium">{petInfo.breed}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Type</span>
                        <span className="text-sm font-medium capitalize">{petInfo.type}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;