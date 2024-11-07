import React from 'react';
import { Dog } from 'lucide-react';

const Navigation = ({ currentPage, onPageChange, onLogout }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Dog className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold text-gray-800">PawEmbrace</span>
          </div>
          
          <div className="flex space-x-4">
            {['dashboard', 'health', 'recipes', 'profile'].map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === page 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            ))}
            
            <button
              onClick={onLogout}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;