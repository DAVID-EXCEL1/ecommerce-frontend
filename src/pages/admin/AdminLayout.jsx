import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate, Outlet, Link } from 'react-router-dom';

const AdminLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin/login');
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
                <h2 className="text-2xl font-bold">Admin</h2>
                <nav className="flex flex-col space-y-2">
                    <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link>
                    <Link to="/admin/products" className="hover:underline">Products</Link>
                    <Link to="/admin/orders" className="hover:underline">Orders</Link>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-3 py-1 rounded mt-4 hover:bg-red-600"
                    >
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-50">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
