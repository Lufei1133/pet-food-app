import React from 'react';

const Alert = ({ children, title, description }) => (
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
    <div className="flex items-center">
      {children}
      <div className="ml-3">
        <h3 className="text-sm font-medium text-blue-800">{title}</h3>
        <div className="mt-2 text-sm text-blue-700">{description}</div>
      </div>
    </div>
  </div>
);

export default Alert;