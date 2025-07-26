import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-100 to-purple-100 p-6 text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to MyShop 🛍️</h1>
            <p className="mb-6 text-gray-600 text-lg max-w-xl">
                Explore the best products. Sign up or log in to start shopping!
            </p>
            <div className="flex gap-4">
                <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                    Login
                </Link>
                <Link to="/register" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition">
                    Register
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
