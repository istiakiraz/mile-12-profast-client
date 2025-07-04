import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from '../../../assets/banner/banner1.png'
import bannerImg2 from '../../../assets/banner/banner2.png'
import bannerImg3 from '../../../assets/banner/banner3.png'

const Hero = () => {
    return (
       <div className='lg:my-14 lg:w-11/12 mx-auto' >
         <Carousel infiniteLoop={true} showStatus={false} showThumbs={false} autoPlay={true} >
                <div>
                    <img src={bannerImg1} />
                    
                </div>
                <div>
                    <img src={bannerImg2} />
                   
                </div>
                <div>
                    <img src={bannerImg3} />
                
                </div>
            </Carousel>
       </div>
    );
};

export default Hero;