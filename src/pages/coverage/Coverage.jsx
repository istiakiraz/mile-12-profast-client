import React from 'react';
import CoverageMap from './CoverageMap';

const Coverage = () => {
    return (
        <div className='bg-base-100 my-8 w-11/12 mx-auto rounded-xl ' >
            <div className='py-16 w-11/12 mx-auto'>
                <h1 className='font-bold text-primary text-4xl' >We are available in 64 districts</h1>
              
                 <input className='bg-base-300 w-full lg:w-96 h-12 my-4 rounded-4xl px-4 ' type="text" placeholder='Search here' />

                <div>
                     <CoverageMap></CoverageMap>
                </div>
                 
             
            </div>
        </div>
    );
};

export default Coverage;