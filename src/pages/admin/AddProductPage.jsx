import React, { useState } from 'react';
import axios from '../../utils/axios'; // ✅ Adjust if your axios file is elsewhere
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddProductPage = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        stock: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/products', formData, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            if (res.status === 201) {
                alert('✅ Product added successfully!');
                navigate('/admin/products');
            }
        } catch (error) {
            console.error('❌ Error adding product:', error);
            alert(error.response?.data?.message || 'Failed to add product');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />
                <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProductPage;
