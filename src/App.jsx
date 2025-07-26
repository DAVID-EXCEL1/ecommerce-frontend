import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import MyOrdersPage from './pages/MyOrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';

import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminRoute from './components/AdminRoute';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import OrderManagementPage from './pages/admin/OrderManagementPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';

import AdminLayout from './pages/admin/AdminLayout';
import UserLayout from './pages/UserLayout';
import UserRoute from './components/UserRoute';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AddProductPage from './pages/admin/AddProductPage';
import LandingPage from './pages/LandingPage';

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Auth Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />
                <Route path="/order/:id" element={<OrderDetailsPage />} />
                <Route
                    path="/checkout"
                    element={
                        <UserRoute>
                            <CheckoutPage />
                        </UserRoute>
                    }
                />
                <Route
                    path="/my-orders"
                    element={
                        <UserRoute>
                            <MyOrdersPage />
                        </UserRoute>
                    }
                />
                {/* User Routes with Layout */}
                <Route element={<UserLayout />}>
                    <Route path="/products" element={<HomePage />} />

                    <Route element={<UserLayout />}>
                        <Route
                            path="/home"
                            element={
                                <UserRoute>
                                    <HomePage />
                                </UserRoute>
                            }
                        />
                    </Route>
                </Route>

                {/* Admin Login Route */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route
                    path="manage-orders"
                    element={
                        <AdminRoute>
                            <OrderManagementPage />
                        </AdminRoute>
                    }
                />

                {/* Admin Routes with Layout */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route
                        path="dashboard"
                        element={
                            <AdminRoute>
                                <AdminDashboardPage />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="add-product"
                        element={
                            <AdminRoute>
                                <AddProductPage />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="products"
                        element={
                            <AdminRoute>
                                <AdminProductsPage />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="orders"
                        element={
                            <AdminRoute>
                                <AdminOrdersPage />
                            </AdminRoute>
                        }
                    />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<div className="p-10 text-center text-xl">404 - Page Not Found</div>} />
            </Routes>
        </Router>
    );
}

export default App;
