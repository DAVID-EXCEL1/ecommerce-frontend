import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useSelector } from 'react-redux';

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useSelector((state) => state.auth); // get user from redux

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('/orders/admin/all', {
                    headers: {
                        Authorization: `Bearer ${user?.token}`, // ✅ use user.token, not token
                    },
                });
                setOrders(res.data);
            } catch (error) {
                console.error('Failed to fetch admin orders:', error);
            }
        };

        if (user?.token) fetchOrders(); // only call if token exists
    }, [user]);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Orders</h2>
            {orders.length === 0 ? (
                <p>No orders yet.</p>
            ) : (
                <ul className="space-y-3">
                    {orders.map((order) => (
                        <li key={order._id} className="border p-4 rounded shadow">
                            <p>Order ID: {order._id}</p>
                            <p>Amount: ₦{order.totalAmount}</p>
                            <p>Status: {order.orderStatus}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminOrdersPage;
