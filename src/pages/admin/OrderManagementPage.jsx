// src/pages/admin/OrderManagementPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const OrderManagementPage = () => {
    const [orders, setOrders] = useState([]);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('/api/orders/admin/all', {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setOrders(res.data);
            } catch (err) {
                console.error('❌ Error fetching admin orders:', err);
            }
        };

        if (user?.role === 'admin') {
            fetchOrders();
        }
    }, [user]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">All Orders</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2">Order ID</th>
                            <th className="px-4 py-2">User</th>
                            <th className="px-4 py-2">Total</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="border-t">
                                <td className="px-4 py-2">{order._id.slice(-6)}</td>
                                <td className="px-4 py-2">{order.userId?.name}</td>
                                <td className="px-4 py-2">₦{order.totalAmount}</td>
                                <td className="px-4 py-2">{order.orderStatus}</td>
                                <td className="px-4 py-2">{new Date(order.orderedAt).toLocaleDateString()}</td>
                                <td className="px-4 py-2">
                                    {/* Add status update dropdown next */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderManagementPage;
