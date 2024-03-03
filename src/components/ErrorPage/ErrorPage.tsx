import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-2xl font-light text-gray-600">Page not found</p>
        <p className="mt-4 text-gray-500">The page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-6 inline-block px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
