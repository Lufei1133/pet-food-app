import React, { useState } from 'react';
import { 
  Syringe, FileText, Clipboard, Activity, 
  AlertCircle, Calendar, Pill, Download, Plus,
  CheckCircle, XCircle, Heart,
  Star, X
} from 'lucide-react';

const MedicalCenter = ({ petInfo }) => {
  const [activeTab, setActiveTab] = useState('vaccines');
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [showAddPrescription, setShowAddPrescription] = useState(false);

  // 疫苗记录
  const [vaccineRecords] = useState([
    {
      id: 1,
      name: "Rabies Vaccine",
      date: "2024-01-15",
      nextDue: "2025-01-15",
      provider: "Dr. Smith",
      clinic: "Happy Pets Clinic",
      batchNumber: "RB2024011501",
      status: "completed",
      notes: "3-year vaccination"
    },
    {
      id: 2,
      name: "DHPP",
      date: "2023-12-01",
      nextDue: "2024-12-01",
      provider: "Dr. Johnson",
      clinic: "Pet Care Center",
      batchNumber: "DH2023120102",
      status: "completed",
      notes: "Annual booster"
    },
    {
      id: 3,
      name: "Bordetella",
      date: "",
      nextDue: "2024-03-15",
      provider: "",
      clinic: "",
      batchNumber: "",
      status: "upcoming",
      notes: "Due for vaccination"
    }
  ]);

  // 医疗记录
  const [medicalRecords] = useState([
    {
      id: 1,
      type: "Check-up",
      date: "2024-01-20",
      provider: "Dr. Smith",
      clinic: "Happy Pets Clinic",
      diagnosis: "Annual health check",
      treatment: "No issues found",
      attachments: ["report.pdf"],
      followUp: "Next annual check-up in 12 months"
    },
    {
      id: 2,
      type: "Emergency",
      date: "2023-12-15",
      provider: "Dr. Johnson",
      clinic: "Pet Emergency Center",
      diagnosis: "Minor paw injury",
      treatment: "Cleaned and bandaged",
      attachments: ["xray.pdf", "prescription.pdf"],
      followUp: "Check wound in 1 week"
    }
  ]);

  // 处方记录
  const [prescriptions] = useState([
    {
      id: 1,
      medication: "Antibiotics",
      dosage: "500mg",
      frequency: "Twice daily",
      startDate: "2024-01-20",
      endDate: "2024-01-30",
      status: "active",
      prescribedBy: "Dr. Smith",
      refills: 0,
      instructions: "Take with food"
    },
    {
      id: 2,
      medication: "Pain Relief",
      dosage: "250mg",
      frequency: "As needed",
      startDate: "2023-12-15",
      endDate: "2023-12-22",
      status: "completed",
      prescribedBy: "Dr. Johnson",
      refills: 0,
      instructions: "Maximum 3 times per day"
    }
  ]);

  // 实验室结果
  const [labResults] = useState([
    {
      id: 1,
      type: "Blood Work",
      date: "2024-01-20",
      orderedBy: "Dr. Smith",
      status: "normal",
      results: {
        "White Blood Cells": "Normal",
        "Red Blood Cells": "Normal",
        "Platelets": "Normal",
        "Liver Function": "Normal",
        "Kidney Function": "Normal"
      },
      notes: "All results within normal range"
    }
  ]);

  // 添加记录模态框组件
  const AddRecordModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Medical Record</h3>
          <button 
            onClick={() => setShowAddRecord(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option>Check-up</option>
              <option>Emergency</option>
              <option>Surgery</option>
              <option>Dental</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Provider</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Doctor's name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Diagnosis</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Treatment</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Attachments
            </label>
            <div className="mt-1 flex items-center">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add File
              </button>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowAddRecord(false)}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  ); 
  // 疫苗记录卡片
  const VaccineCard = ({ vaccine }) => (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{vaccine.name}</h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            {vaccine.status === 'completed' ? (
              <span>Administered: {vaccine.date}</span>
            ) : (
              <span>Due: {vaccine.nextDue}</span>
            )}
          </div>
          {vaccine.provider && (
            <p className="text-sm text-gray-600 mt-1">
              By {vaccine.provider} at {vaccine.clinic}
            </p>
          )}
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            vaccine.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {vaccine.status === 'completed' ? 'Completed' : 'Upcoming'}
        </span>
      </div>
      {vaccine.batchNumber && (
        <p className="text-sm text-gray-500 mt-2">
          Batch: {vaccine.batchNumber}
        </p>
      )}
      {vaccine.notes && (
        <p className="text-sm text-gray-600 mt-2">{vaccine.notes}</p>
      )}
    </div>
  );

  // 医疗记录卡片
  const MedicalRecordCard = ({ record }) => (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <FileText className="w-5 h-5 text-blue-500 mr-2" />
            <h3 className="font-semibold">{record.type}</h3>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{record.date}</span>
          </div>
        </div>
        {record.attachments.length > 0 && (
          <button className="text-blue-500 hover:text-blue-600">
            <Download className="w-5 h-5" />
          </button>
        )}
      </div>
      <div className="mt-3">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Provider:</span> {record.provider} at{" "}
          {record.clinic}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          <span className="font-medium">Diagnosis:</span> {record.diagnosis}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          <span className="font-medium">Treatment:</span> {record.treatment}
        </p>
        {record.followUp && (
          <p className="text-sm text-gray-600 mt-2">
            <span className="font-medium">Follow-up:</span> {record.followUp}
          </p>
        )}
      </div>
      {record.attachments.length > 0 && (
        <div className="mt-3">
          <p className="text-sm font-medium text-gray-700">Attachments:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {record.attachments.map((file, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs text-gray-600"
              >
                {file}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // 处方卡片
  const PrescriptionCard = ({ prescription }) => (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{prescription.medication}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {prescription.dosage} - {prescription.frequency}
          </p>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            prescription.status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {prescription.status}
        </span>
      </div>
      <div className="mt-3">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-1" />
          <span>
            {prescription.startDate} - {prescription.endDate}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Prescribed by: {prescription.prescribedBy}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Instructions: {prescription.instructions}
        </p>
      </div>
    </div>
  );

  // 实验室结果卡片
  const LabResultCard = ({ result }) => (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{result.type}</h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{result.date}</span>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            result.status === 'normal'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {result.status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        Ordered by: {result.orderedBy}
      </p>
      <div className="mt-3">
        <h4 className="text-sm font-medium text-gray-700">Results:</h4>
        <div className="mt-2 space-y-2">
          {Object.entries(result.results).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between items-center text-sm"
            >
              <span className="text-gray-600">{key}:</span>
              <span
                className={
                  value === 'Normal'
                    ? 'text-green-600'
                    : 'text-yellow-600'
                }
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
      {result.notes && (
        <p className="text-sm text-gray-600 mt-3">{result.notes}</p>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* 顶部导航 */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('vaccines')}
              className={`px-4 py-2 rounded-lg flex items-center ${
                activeTab === 'vaccines' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              }`}
            >
              <Syringe className="w-5 h-5 mr-2" />
              Vaccines
            </button>
            <button
              onClick={() => setActiveTab('records')}
              className={`px-4 py-2 rounded-lg flex items-center ${
                activeTab === 'records' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              }`}
            >
              <FileText className="w-5 h-5 mr-2" />
              Medical Records
            </button>
            <button
              onClick={() => setActiveTab('prescriptions')}
              className={`px-4 py-2 rounded-lg flex items-center ${
                activeTab === 'prescriptions' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              }`}
            >
              <Pill className="w-5 h-5 mr-2" />
              Prescriptions
            </button>
            <button
              onClick={() => setActiveTab('lab')}
              className={`px-4 py-2 rounded-lg flex items-center ${
                activeTab === 'lab' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              }`}
            >
              <Clipboard className="w-5 h-5 mr-2" />
              Lab Results
            </button>
          </div>
          <button
            onClick={() => {
              if (activeTab === 'prescriptions') {
                setShowAddPrescription(true);
              } else {
                setShowAddRecord(true);
              }
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add {activeTab === 'prescriptions' ? 'Prescription' : 'Record'}
          </button>
        </div>
      </div>

      {/* 概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Syringe className="h-8 w-8 text-blue-500" />
              <div className="ml-3">
                <p className="text-sm text-gray-500">Vaccines</p>
                <p className="text-xl font-bold">
                  {vaccineRecords.filter(v => v.status === 'completed').length}
                </p>
              </div>
            </div>
            {vaccineRecords.some(v => v.status === 'upcoming') && (
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                {vaccineRecords.filter(v => v.status === 'upcoming').length} Due
              </span>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-green-500" />
              <div className="ml-3">
                <p className="text-sm text-gray-500">Records</p>
                <p className="text-xl font-bold">{medicalRecords.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Pill className="h-8 w-8 text-purple-500" />
              <div className="ml-3">
                <p className="text-sm text-gray-500">Active Prescriptions</p>
                <p className="text-xl font-bold">
                  {prescriptions.filter(p => p.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clipboard className="h-8 w-8 text-orange-500" />
              <div className="ml-3">
                <p className="text-sm text-gray-500">Lab Tests</p>
                <p className="text-xl font-bold">{labResults.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="space-y-6">
        {/* 疫苗记录 */}
        {activeTab === 'vaccines' && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Upcoming Vaccinations
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    {vaccineRecords.some(v => v.status === 'upcoming') ? (
                      vaccineRecords
                        .filter(v => v.status === 'upcoming')
                        .map(v => (
                          <p key={v.id}>{v.name} due on {v.nextDue}</p>
                        ))
                    ) : (
                      <p>No upcoming vaccinations</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {vaccineRecords.map(vaccine => (
              <VaccineCard key={vaccine.id} vaccine={vaccine} />
            ))}
          </div>
        )}

        {/* 医疗记录 */}
        {activeTab === 'records' && (
          <div className="grid grid-cols-1 gap-6">
            {medicalRecords.map(record => (
              <MedicalRecordCard key={record.id} record={record} />
            ))}
          </div>
        )}

        {/* 处方记录 */}
        {activeTab === 'prescriptions' && (
          <div className="grid grid-cols-1 gap-6">
            {prescriptions.map(prescription => (
              <PrescriptionCard key={prescription.id} prescription={prescription} />
            ))}
          </div>
        )}

        {/* 实验室结果 */}
        {activeTab === 'lab' && (
          <div className="grid grid-cols-1 gap-6">
            {labResults.map(result => (
              <LabResultCard key={result.id} result={result} />
            ))}
          </div>
        )}
      </div>

      {/* 模态框 */}
      {showAddRecord && <AddRecordModal />}
    </div>
  );
};

export default MedicalCenter;