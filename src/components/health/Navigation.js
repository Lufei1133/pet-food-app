import React from 'react';
import { Dog } from 'lucide-react';

const Navigation = ({ onLogout }) => {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Dog className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-lg font-semibold">PawEmbrace</span>
          </div>
          <button
            onClick={onLogout}
            className="text-red-500 hover:text-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;