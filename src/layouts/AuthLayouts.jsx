import React from 'react';
import { Outlet } from 'react-router';
import authImg from '../assets/pic/authImage.png'
import Logo from '../shared/Logo';

const AuthLayouts = () => {
    return (
     <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side - Login */}
      <div className="flex flex-col relative justify-center items-center px-8">
        <div className='absolute  top-20 left-20 ' >
            <Logo />
        </div>
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:flex items-center justify-center bg-[#fafdf0]">
        <img src={authImg} alt="auth visual" className="w-4/6" />
      </div>
    </div>

   
    
    );
};

export default AuthLayouts;