import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (!user) return;

                const res = await axios.get('http://localhost:5000/api/orders/myorders', {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setOrders(res.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [user]);


    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);


    return (
        <div className="p-4 max-w-4xl mx-auto">
            <Header/>
            <h2 className="text-xl font-bold mb-4">🧾 My Orders</h2>

            {orders.length === 0 ? (
                <p>No orders yet.</p>
            ) : (
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2">#</th>
                            <th className="p-2">Date</th>
                            <th className="p-2">Total</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Items</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order._id} className="border-t">
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="p-2">₦{order.totalAmount.toFixed(2)}</td>
                                <td className="p-2">{order.orderStatus}</td>
                                <td className="p-2">
                                    <Link to={`/order/${order._id}`} className="text-blue-500 underline">
                                        View
                                    </Link>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyOrdersPage;
