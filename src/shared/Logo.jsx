import React from 'react';
import logo from '../assets/pic/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
       
          <div>
               <Link to='/' >
               <div className='flex items-end'>
            <img className='mb-2 w-8 ' src={logo} alt="pro fast logo" />
            <p className=' font-bold -ml-4 text-3xl' >Profast</p>
        </div></Link>
          </div>
        
    );
};

export default Logo;