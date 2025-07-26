import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    useEffect(() => {
        if (user?.role === 'admin') {
            navigate('/admin/dashboard');
        } else if (user) {
            navigate('/home');
        }
    }, [user, navigate]);


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    return (
        <div className="max-w-md mx-auto mt-10 px-4">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="email" placeholder="Email" className="w-full p-3 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" className="w-full p-3 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="bg-blue-600 hover:bg-blue-700 w-full text-white py-2 rounded" disabled={loading}>
                    {loading ? 'Loading...' : 'Login'}
                </button>
                <p className="text-sm text-center mt-4">
                    Are you an admin? <Link to="/admin/login" className="text-blue-600 hover:underline">Login here</Link>
                </p>

            </form>
        </div>
    );
};

export default LoginPage;