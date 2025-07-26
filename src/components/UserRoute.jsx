import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UserRoute = ({ children }) => {
    const { user } = useSelector((state) => state.auth);

    if (!user) return <Navigate to="/login" />;
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" />;

    return children;
};

export default UserRoute;
