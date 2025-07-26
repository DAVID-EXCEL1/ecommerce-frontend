import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer } from 'recharts';
import { PackageCheck, Users, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios'; // ✅ your configured axios with baseURL
import { useSelector } from 'react-redux';

const AdminDashboardPage = () => {
    const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 0, totalUsers: 0, totalSales: 0 });
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
    if (!user?.token) return; // Wait until token is available

    const fetchStats = async () => {
        try {
            const res = await axios.get('/admin/stats', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setStats(res.data);
        } catch (error) {
            console.error('❌ Failed to fetch admin stats:', error.message);
        }
    };

    fetchStats();
}, [user?.token]);


    const orderData = [
        { day: 'Mon', orders: 12 },
        { day: 'Tue', orders: 19 },
        { day: 'Wed', orders: 7 },
        { day: 'Thu', orders: 14 },
        { day: 'Fri', orders: 9 },
        { day: 'Sat', orders: 15 },
        { day: 'Sun', orders: 11 },
    ];

    const salesData = [
        { month: 'Jan', sales: 3000 },
        { month: 'Feb', sales: 4500 },
        { month: 'Mar', sales: 3500 },
        { month: 'Apr', sales: 5000 },
        { month: 'May', sales: 4200 },
        { month: 'Jun', sales: 6000 },
    ];

    const cards = [
        {
            title: 'Manage Products',
            icon: <PackageCheck className="text-blue-600 w-8 h-8" />,
            path: '/admin/products',
            count: stats.totalProducts,
            color: 'bg-blue-100',
        },
        {
            title: 'Manage Orders',
            icon: <ClipboardList className="text-green-600 w-8 h-8" />,
            path: '/admin/orders',
            count: stats.totalOrders,
            color: 'bg-green-100',
        },
        {
            title: 'Manage Users',
            icon: <Users className="text-yellow-600 w-8 h-8" />,
            path: '/admin/users',
            count: stats.totalUsers,
            color: 'bg-yellow-100',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">Admin Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {cards.map((card, index) => (
                    <Link
                        key={index}
                        to={card.path}
                        className={`p-6 rounded-xl shadow-md hover:shadow-xl transition bg-white dark:bg-gray-800 flex items-center justify-between`}
                    >
                        <div>
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{card.title}</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{card.count}</p>
                        </div>
                        <div className={`p-3 rounded-full ${card.color}`}>
                            {card.icon}
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Orders Bar Chart */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Orders This Week</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={orderData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" stroke="#ccc" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="orders" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Sales Line Chart */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Monthly Sales (₦)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" stroke="#ccc" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Total Sales Footer */}
            <div className="mt-10 text-center text-xl font-bold text-green-600 dtark:text-green-400">
                Total Sales: ₦{stats.totalSales?.toLocaleString()}
            </div>
        </div>
    );
};

export default AdminDashboardPage;
