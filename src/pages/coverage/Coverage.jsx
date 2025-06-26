import React from 'react';
import CoverageMap from './CoverageMap';
import { useLoaderData } from 'react-router';

const Coverage = () => {

    const warehouseData = useLoaderData()

    return (
        <div className='bg-base-100 my-8 w-11/12 mx-auto rounded-xl ' >
            <div className='py-16 w-11/12 mx-auto'>
                <h1 className='font-bold text-primary text-4xl' >We are available in 64 districts</h1>
              
               

                <div>
                     <CoverageMap warehouseData={warehouseData} ></CoverageMap>
                </div>
                 
             
            </div>
        </div>
    );
};

export default Coverage;