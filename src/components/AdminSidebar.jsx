import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
    const links = [
        { name: 'Dashboard', path: '/admin/dashboard' },
        { name: 'Products', path: '/admin/products' },
        { name: 'Orders', path: '/admin/orders' },
        { name: 'Users', path: '/admin/users' },
    ];

    return (
        <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-6 hidden md:block">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Admin Panel</h2>
            <nav className="space-y-4">
                {links.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-md font-medium ${isActive
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`
                        }
                    >
                        {link.name}
                    </NavLink>
                ))}
                <Link
                    to="/admin/add-product"
                    className="bg-purple-100 hover:bg-purple-200 transition-all duration-300 p-6 rounded-2xl shadow-md flex items-center space-x-4"
                >
                    <span className="text-lg font-semibold text-gray-700">Add Product</span>
                </Link>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
