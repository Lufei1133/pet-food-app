import React, { useState } from 'react';
import { Calendar, Bell, Clock } from 'lucide-react';

const HealthRecords = ({ petInfo }) => {
  // 模拟健康记录数据
  const records = [
    {
      date: '2024-01-15',
      type: 'Vaccination',
      description: 'Annual vaccination',
      vet: 'Dr. Smith',
      notes: 'Next vaccination due in 12 months'
    },
    {
      date: '2023-12-01',
      type: 'Check-up',
      description: 'Regular health check',
      vet: 'Dr. Johnson',
      notes: 'All vital signs normal'
    }
  ];

  // 模拟提醒数据
  const reminders = [
    {
      id: 1,
      title: 'Vaccination Due',
      date: '2024-02-15',
      type: 'vaccination',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Monthly Deworming',
      date: '2024-02-01',
      type: 'medication',
      status: 'upcoming'
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6">Health Records & Reminders</h2>

      {/* 健康记录 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Recent Records</h3>
        <div className="space-y-4">
          {records.map((record, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-gray-500">{record.date}</span>
                  </div>
                  <h4 className="text-lg font-medium mt-1">{record.type}</h4>
                  <p className="text-gray-600">{record.description}</p>
                </div>
                <span className="text-sm text-gray-500">{record.vet}</span>
              </div>
              {record.notes && (
                <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  {record.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 提醒 */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Upcoming Reminders</h3>
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div key={reminder.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Bell className="w-4 h-4 text-blue-500 mr-2" />
                  <div>
                    <h4 className="font-medium">{reminder.title}</h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{reminder.date}</span>
                    </div>
                  </div>
                </div>
                <span className={`
                  px-2 py-1 rounded-full text-xs
                  ${reminder.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}
                `}>
                  {reminder.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;