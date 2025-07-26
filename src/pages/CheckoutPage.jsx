import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const CheckoutPage = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [shipping, setShipping] = useState({
        street: '', city: '', postalCode: '', country: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

    const handleChange = (e) => {
        setShipping({ ...shipping, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const order = {
            userId: user._id,
            items: cartItems.map((item) => ({
                productId: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            totalAmount: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
            shippingAddress: shipping,
            paymentMethod,
            orderStatus: 'Pending'
        };

        try {
            const res = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify(order)
            });

            const data = await res.json();

            if (res.ok) {
                dispatch(clearCart());
                navigate('/order-success');
            } else {
                alert(data.message || 'Failed to place order');
            }
        } catch (err) {
            console.error('Order Error:', err);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <Header/>
            <h2 className="text-2xl font-bold mb-6">Checkout</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="street" placeholder="Street" onChange={handleChange} required className="w-full p-3 border rounded" />
                <input name="city" placeholder="City" onChange={handleChange} required className="w-full p-3 border rounded" />
                <input name="postalCode" placeholder="Postal Code" onChange={handleChange} required className="w-full p-3 border rounded" />
                <input name="country" placeholder="Country" onChange={handleChange} required className="w-full p-3 border rounded" />

                <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full p-3 border rounded"
                >
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="Credit Card" disabled>Credit Card (coming soon)</option>
                </select>

                <button type="submit" className="bg-green-600 hover:bg-green-700 w-full text-white py-2 rounded">
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default CheckoutPage;
