import React from 'react';
import Hero from './HomeComponents/Hero';
import OurServices from './HomeComponents/OurServices';
import ClientLogoSection from './HomeComponents/ClientLogoSection';

const HomePage = () => {
    return (
        <div>
            <Hero></Hero>
            <OurServices></OurServices>
            <ClientLogoSection></ClientLogoSection>
        </div>
    );
};

export default HomePage;