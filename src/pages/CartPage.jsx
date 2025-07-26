import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { increaseQty, decreaseQty } from '../redux/slices/cartSlice';
import Header from '../components/Header';


const CartPage = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);


    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <Header/>

            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

            {cartItems.length === 0 ? (
                <p>Your cart is empty. <Link to="/" className="text-blue-500">Go Shopping</Link></p>
            ) : (
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div key={item._id} className="border p-4 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold">{item.name}</h3>
                                <p>₦{item.price}</p>

                                <div className="flex items-center mt-2">
                                    <button
                                        onClick={() => dispatch(decreaseQty(item._id))}
                                        className="bg-gray-300 px-2 rounded-l"
                                    >−</button>
                                    <span className="px-4">{item.quantity}</span>
                                    <button
                                        onClick={() => dispatch(increaseQty(item._id))}
                                        className="bg-gray-300 px-2 rounded-r"
                                    >+</button>
                                </div>
                            </div>

                            <button
                                onClick={() => dispatch(removeFromCart(item._id))}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="text-right mt-6">
                        <h3 className="text-xl font-bold">Total: ₦{total}</h3>
                        <Link to="/checkout" className="mt-4 bg-green-600 text-white px-4 py-2 rounded inline-block">
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
