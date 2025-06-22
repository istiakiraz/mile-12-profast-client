import React from 'react';
import Hero from './HomeComponents/Hero';
import OurServices from './HomeComponents/OurServices';
import ClientLogoSection from './HomeComponents/ClientLogoSection';
import MerchantCardSection from './HomeComponents/MerchantCardSection';
import ReviewSection from './HomeComponents/ReviewSection';

const HomePage = () => {
    return (
        <div>
            <Hero></Hero>
            <OurServices></OurServices>
            <ClientLogoSection></ClientLogoSection>
            <MerchantCardSection></MerchantCardSection>
            <ReviewSection></ReviewSection>
        </div>
    );
};

export default HomePage;