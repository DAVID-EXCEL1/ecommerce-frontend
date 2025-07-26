// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-blue-800 text-white py-6 mt-10">
            <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div>
                    <h2 className="text-xl font-bold mb-2">🛍️ MyShop</h2>
                    <p className="text-sm">Your one-stop shop for quality products.</p>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Quick Links</h3>
                    <ul className="space-y-1 text-sm">
                        <li><Link to="/" className="hover:underline">Home</Link></li>
                        <li><Link to="/cart" className="hover:underline">Cart</Link></li>
                        <li><Link to="/login" className="hover:underline">Login</Link></li>
                        <li><Link to="/register" className="hover:underline">Register</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Contact</h3>
                    <p className="text-sm">Email: support@myshop.com</p>
                    <p className="text-sm">Phone: +234 800 123 4567</p>
                </div>
            </div>

            <div className="text-center text-sm mt-6 text-gray-300">
                &copy; {new Date().getFullYear()} MyShop. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
