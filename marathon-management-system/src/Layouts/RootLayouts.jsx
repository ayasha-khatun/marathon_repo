import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Navbar';
import Footer from '../Pages/Shared/Footer';
import DynamicTitle from '../Pages/Shared/DynamicTitle';
import BackToTop from '../Pages/BackToTop/BackToTop';

const RootLayouts = () => {
    return (
        <div>
            <DynamicTitle></DynamicTitle>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            <BackToTop></BackToTop>
        </div>
    );
};

export default RootLayouts;