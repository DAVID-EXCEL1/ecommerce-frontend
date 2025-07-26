import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { useSelector } from 'react-redux';

const AdminProductsPage = () => {
    const { user } = useSelector((state) => state.auth);
    const [products, setProducts] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        name: '',
        price: '',
        stock: '',
        imageUrl: '',
    });

    const fetchProducts = async () => {
        try {
            const res = await axios.get('/products');
            setProducts(res.data);
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`/products/${editingId}`, form, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
            } else {
                await axios.post('/products', form, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
            }

            setForm({ name: '', price: '', stock: '', imageUrl: '' });
            setEditingId(null);
            fetchProducts();
        } catch (err) {
            console.error('Error saving product:', err);
        }
    };

    const handleEdit = (product) => {
        setForm({
            name: product.name,
            price: product.price,
            stock: product.stock,
            imageUrl: product.imageUrl,
        });
        setEditingId(product._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`/products/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                fetchProducts();
            } catch (err) {
                console.error('Delete failed:', err);
            }
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

            {/* Product Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2" required />
                <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="border p-2" required />
                <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} className="border p-2" required />
                <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} className="border p-2" required />
                <button className="col-span-full bg-blue-600 text-white py-2 rounded">
                    {editingId ? 'Update Product' : 'Add Product'}
                </button>
            </form>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="border p-4 rounded shadow">
                        <img src={product.imageUrl} alt={product.name} className="h-32 w-full object-cover rounded mb-2" />
                        <h2 className="font-semibold">{product.name}</h2>
                        <p>₦{product.price}</p>
                        <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                        <div className="flex justify-between mt-2 space-x-2">
                            <button onClick={() => handleEdit(product)} className="bg-yellow-400 px-3 py-1 rounded text-white">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(product._id)} className="bg-red-600 px-3 py-1 rounded text-white">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminProductsPage;
