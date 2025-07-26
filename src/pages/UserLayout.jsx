import React from 'react';
import Header from '../components/Header'; // your user header

const UserLayout = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
};

export default UserLayout;
