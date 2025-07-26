// src/pages/admin/AdminLoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, error, loading } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    useEffect(() => {
        if (user && user.role === 'admin') {
            navigate('/admin/dashboard');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (user && user.role !== 'admin') {
            alert('You are not an admin');
            navigate('/login');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (user?.role === 'admin') {
            navigate('/admin/dashboard');
        } else if (user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <div className="max-w-md mx-auto mt-20">
            <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Admin Email"
                    className="w-full p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                >
                    {loading ? 'Logging in...' : 'Login as Admin'}
                </button>
            </form>
        </div>
    );
};

export default AdminLoginPage;
