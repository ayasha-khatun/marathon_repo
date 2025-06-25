import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Navbar';
import Footer from '../Pages/Shared/Footer';
import DynamicTitle from '../Pages/Shared/DynamicTitle';

const RootLayouts = () => {
    return (
        <div>
            <DynamicTitle></DynamicTitle>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayouts;