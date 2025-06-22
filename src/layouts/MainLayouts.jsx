import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import 'aos/dist/aos.css'; 
import Aos from 'aos';

Aos.init();

const MainLayouts = () => {
    return (
        <div className='bg-base-300 pt-4 ' >
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayouts;