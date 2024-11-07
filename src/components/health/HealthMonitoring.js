import React from 'react';
import { Activity, Heart, Scale, ThermometerSun } from 'lucide-react';

const HealthMonitoring = ({ petInfo }) => {
  // 模拟健康数据
  const healthData = {
    activity: {
      value: 85,
      trend: '+2%',
      lastUpdated: 'Today'
    },
    weight: {
      value: petInfo.weight,
      trend: '-0.5kg',
      lastUpdated: 'Yesterday'
    },
    heartRate: {
      value: 75,
      trend: 'Normal',
      lastUpdated: '2 hours ago'
    },
    temperature: {
      value: 38.5,
      trend: 'Stable',
      lastUpdated: '2 hours ago'
    }
  };

  const MetricCard = ({ title, value, unit, trend, lastUpdated, icon: Icon, color }) => (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Icon className={`h-6 w-6 text-${color}-500 mr-2`} />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <span className="text-sm text-gray-500">
          Last updated: {lastUpdated}
        </span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-3xl font-bold">
            {value}{unit}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {trend}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Health Monitoring</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Activity Level"
          value={healthData.activity.value}
          unit="%"
          trend={healthData.activity.trend}
          lastUpdated={healthData.activity.lastUpdated}
          icon={Activity}
          color="green"
        />
        <MetricCard
          title="Weight"
          value={healthData.weight.value}
          unit="kg"
          trend={healthData.weight.trend}
          lastUpdated={healthData.weight.lastUpdated}
          icon={Scale}
          color="blue"
        />
        <MetricCard
          title="Heart Rate"
          value={healthData.heartRate.value}
          unit="bpm"
          trend={healthData.heartRate.trend}
          lastUpdated={healthData.heartRate.lastUpdated}
          icon={Heart}
          color="red"
        />
        <MetricCard
          title="Temperature"
          value={healthData.temperature.value}
          unit="°C"
          trend={healthData.temperature.trend}
          lastUpdated={healthData.temperature.lastUpdated}
          icon={ThermometerSun}
          color="orange"
        />
      </div>
    </div>
  );
};

export default HealthMonitoring;