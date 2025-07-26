// components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login'); // or /admin/login if admin
    };

    return (
        <header className="bg-white shadow-md px-4 py-3 md:px-8">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                    🛍️ <span className="hidden sm:inline">MyShop</span>
                </Link>

                {/* Navigation */}
                <nav className="flex items-center space-x-4 sm:space-x-6 text-sm sm:text-base">
                    <Link to="/" className="hover:text-blue-600 font-medium">Home</Link>

                    <Link to="/cart" className="relative hover:text-blue-600 font-medium">
                        Cart
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {user && (
                        <Link to="/my-orders" className="hover:text-blue-600 font-medium">
                            My Orders
                        </Link>
                    )}

                    {user && (
                        <div className="hidden sm:flex items-center space-x-2 text-gray-700">
                            <span className="font-medium">Hi, {user.name}</span>
                            {user.role === 'admin' && (
                                <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs">Admin</span>
                            )}
                        </div>
                    )}

                    {user ? (
                        <>
                            <Link to="/profile" className="hover:text-blue-600 font-medium">Profile</Link>
                            {user.role === 'admin' && (
                                <Link to="/admin/dashboard" className="hover:text-blue-600 font-medium">
                                    Dashboard
                                </Link>
                            )}
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-blue-600 font-medium">Login</Link>
                            <Link to="/register" className="hover:text-blue-600 font-medium">Register</Link>
                        </>
                    )}

                    {user && (
                        <button
                            onClick={handleLogout}
                            className="text-sm text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
