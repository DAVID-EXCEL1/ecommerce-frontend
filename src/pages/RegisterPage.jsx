import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/login');
    }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({ name, email, password }));
    };

    return (
        <div className="max-w-md mx-auto mt-10 px-4">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Name" className="w-full p-3 border rounded" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" className="w-full p-3 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" className="w-full p-3 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="bg-green-600 hover:bg-green-700 w-full text-white py-2 rounded" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;