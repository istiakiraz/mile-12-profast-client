import React from 'react';
import img1 from '../../../assets/pic/location-merchant.png'
import img2 from '../../../assets/pic/be-a-merchant-bg.png'


const MerchantCardSection = () => {
    return (
        <div className='my-12 relative lg:w-11/12 p-8 py-16 mx-auto flex items-center justify-center rounded-3xl bg-[#03373d] ' >
            <div className='w-6/12 *:text-base-200' >
                <h1 data-aos="fade-down" className='text-4xl w-9/12 mb-6 font-bold ' >Merchant and Customer Satisfaction is Our First Priority</h1>
                <p data-aos="fade-up" className='opacity-70 w-8/12 mb-6' > We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time. </p>
                <div  data-aos="zoom-in-up" className='gap-2 flex items-center'>
                    <button   className='btn rounded-4xl shadow-none text-primary transition-colors duration-600 hover:text-secondary hover:bg-primary hover:btn-outline bg-secondary' >Become a Merchant</button>
                    <button  className='btn rounded-4xl transition-colors duration-600 border hover:bg-secondary hover:text-primary btn-outline text-secondary ' >Earn with Profast Courier</button>
                </div>
            </div>
            <img data-aos="fade-left" src={img1} alt="location img " />
            <img className='absolute top-0 left-40 ' src={img2} alt="" />
            

        </div>
    );
};

export default MerchantCardSection;