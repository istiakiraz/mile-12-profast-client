import React from "react";
import {
  FaTruck,
  FaGlobeAsia,
  FaBoxes,
  FaMoneyBillWave,
  FaBuilding,
  FaUndo,
} from "react-icons/fa";

const services = [
  {
    icon: <FaTruck className="text-4xl text-primary" />,
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
  },
  {
    icon: <FaGlobeAsia className="text-4xl text-primary" />,
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
  },
  {
    icon: <FaBoxes className="text-4xl text-primary" />,
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
  },
  {
    icon: <FaMoneyBillWave className="text-4xl text-primary" />,
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
  },
  {
    icon: <FaBuilding className="text-4xl text-primary" />,
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
  },
  {
    icon: <FaUndo className="text-4xl text-primary" />,
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
  },
];

const OurServices = () => {
  return (
    <section className="bg-[#03373d] lg:w-11/12 mx-auto mb-8 rounded-2xl py-16 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl text-base-200 pt-10 font-bold mb-4">
          Our Services
        </h2>
        <p className=" text-base-200 lg:w-7/12 mx-auto md:text-lg">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <div key={idx} data-aos="zoom-in" className="group">
            <div
              className="bg-base-200 p-6 py-8  h-[350px] rounded-2xl text-center shadow-md 
                   transform transition-transform duration-300 
                   group-hover:scale-105 group-hover:shadow-xl group-hover:bg-secondary"
            >
              <div
                className="my-6 p-5 rounded-full w-fit mx-auto flex justify-center 
                        bg-[linear-gradient(0deg,_rgba(255,255,255,0)_12%,_rgba(239,238,252,1))]"
              >
                {service.icon}
              </div>

              <h3 className="text-xl lg:text-2xl font-bold mx-6 mb-2">
                {service.title}
              </h3>

              <p className="text-base-content opacity-70 pb-8 w-8/12 mx-auto text-sm">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
