import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OrderDetailsPage = () => {
    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(`https://ecommerce-api-f4f2.onrender.com/orders/${id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setOrder(res.data);
            } catch (error) {
                console.error('❌ Order fetch error:', error);
            }
        };

        fetchOrder();
    }, [id, user.token]);

    if (!order) return <p className="p-4">Loading order...</p>;

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-4">📦 Order Details</h2>

            <div className="mb-4">
                <p><strong>Status:</strong> {order.orderStatus}</p>
                <p><strong>Placed On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                <p><strong>Total:</strong> ₦{order.totalAmount.toFixed(2)}</p>
                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            </div>

            <div className="mb-4">
                <h3 className="font-semibold">Shipping Address</h3>
                <p>{order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
            </div>

            <div>
                <h3 className="font-semibold">Items:</h3>
                <ul className="mt-2 space-y-2">
                    {order.items.map((item, index) => (
                        <li key={index} className="border p-2 rounded">
                            <p>{item.name}</p>
                            <p>Qty: {item.quantity}</p>
                            <p>Price: ₦{item.price.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OrderDetailsPage;
