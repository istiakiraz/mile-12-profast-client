import React from "react";
import logo1 from "../../../assets/brands/amazon.png";
import logo2 from "../../../assets/brands/amazon_vector.png";
import logo3 from "../../../assets/brands/casio.png";
import logo4 from "../../../assets/brands/moonstar.png";
import logo5 from "../../../assets/brands/randstad.png";
import logo6 from "../../../assets/brands/start-people 1.png";
import logo7 from "../../../assets/brands/start.png";
import Marquee from "react-fast-marquee";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const ClientLogoSection = () => {
  return (
    <div className="lg:w-11/12 mx-auto my-20">
      <h1 className="text-center text-primary text-3xl mb-4 font-bold ">
        We've helped thousands of sales teams
      </h1>

      <Marquee pauseOnHover speed={50} gradient={false}   style={{
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  }}
  className="overflow-hidden" >
        {
            logos.map((logo, index) =>(
                <div key={index} className="mx-14 cursor-grab mt-8 hover:scale-110 transition-transform duration-300 scroll-none flex items-center"  >
                    <img className="h-6 object-contain " src={logo} alt="logo" />

                </div>
            ))
        }


      </Marquee>
    </div>
  );
};

export default ClientLogoSection;
