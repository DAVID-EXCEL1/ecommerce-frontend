import axios from '../utils/axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('/products');
                const data = Array.isArray(res.data) ? res.data : res.data.products;
                setProducts(data);
            } catch (error) {
                console.error('❌ Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);


    return (
        <div className="max-w-7xl mx-auto p-4">
            <Header/>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">🛒 Products</h1>
                <Link to="/cart" className="text-blue-600 font-medium hover:underline">View Cart</Link>
            </div>
            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="border p-4 rounded shadow">
                            <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover mb-2" />
                            <h2 className="font-semibold">{product.name}</h2>
                            <p>₦{product.price}</p>
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="bg-green-500 text-white px-2 py-1 rounded mt-2"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <Link to="/admin/login" className="text-sm text-blue-600 underline">
                Go to Admin Login
            </Link>

        </div>
    );
};

export default HomePage;