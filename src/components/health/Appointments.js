import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Plus, Phone } from 'lucide-react';

const Appointments = ({ petInfo }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  // 模拟预约数据
  const appointments = [
    {
      id: 1,
      type: 'Regular Check-up',
      date: '2024-02-20',
      time: '14:30',
      vet: 'Dr. Smith',
      clinic: 'Happy Pets Clinic',
      address: '123 Pet Street',
      phone: '(555) 123-4567',
      status: 'upcoming'
    },
    {
      id: 2,
      type: 'Vaccination',
      date: '2024-03-05',
      time: '10:00',
      vet: 'Dr. Johnson',
      clinic: 'Pet Care Center',
      address: '456 Vet Avenue',
      phone: '(555) 987-6543',
      status: 'scheduled'
    }
  ];

  const AppointmentCard = ({ appointment }) => (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{appointment.type}</h3>
          <div className="flex items-center text-gray-500 mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{appointment.date}</span>
            <Clock className="w-4 h-4 ml-4 mr-1" />
            <span>{appointment.time}</span>
          </div>
        </div>
        <span className={`
          px-3 py-1 rounded-full text-sm
          ${appointment.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}
        `}>
          {appointment.status}
        </span>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <div>
            <p className="font-medium">{appointment.clinic}</p>
            <p className="text-sm">{appointment.address}</p>
          </div>
        </div>
        <div className="flex items-center text-gray-600">
          <Phone className="w-4 h-4 mr-2" />
          <span>{appointment.phone}</span>
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
          Reschedule
        </button>
        <button className="px-4 py-2 border rounded-lg text-sm text-red-600 hover:bg-red-50">
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Appointments</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Schedule Appointment
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 border rounded-lg p-4 bg-gray-50">
          <h3 className="font-semibold mb-4">Schedule New Appointment</h3>
          <form className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select className="w-full border rounded-lg px-3 py-2">
                <option>Regular Check-up</option>
                <option>Vaccination</option>
                <option>Grooming</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Veterinarian
              </label>
              <select className="w-full border rounded-lg px-3 py-2">
                <option>Dr. Smith</option>
                <option>Dr. Johnson</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                className="w-full border rounded-lg px-3 py-2"
                rows="3"
              />
            </div>
            <div className="col-span-2 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Schedule
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
};

export default Appointments;