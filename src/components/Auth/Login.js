import React from 'react';
import { Dog } from 'lucide-react';

const Login = ({ onLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ id: 1, name: 'Test User' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <Dog className="h-12 w-12 text-blue-500" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Sign in to PawEmbrace
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;