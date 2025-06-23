import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperNav from "./SwiperNav";

const testimonials = [
  {
    name: "Awlad Hossin",
    title: "Senior Product Designer",
    text: "This courier service is incredibly fast. My parcels were delivered within hours inside Dhaka. Highly recommended!",
  },
  {
    name: "Rasel Ahamed",
    title: "CTO",
    text: "We rely on this delivery partner for all our e-commerce orders. Their fulfillment support is just outstanding.",
  },
  {
    name: "Nasir Uddin",
    title: "CEO",
    text: "As a corporate client, I’m very satisfied with their warehouse and inventory management solutions.",
  },
  {
    name: "Shamim Reza",
    title: "UX Designer",
    text: "Not only was the delivery quick, but their customer service was also extremely helpful and friendly.",
  },
  {
    name: "Tania Akter",
    title: "Project Manager",
    text: "They made nationwide delivery feel like local service. Tracking is accurate and delivery is always on time.",
  },
  {
    name: "Shahriar Hasan",
    title: "Marketing Lead",
    text: "Reverse logistics was a game-changer for our business. Clients now trust us more for easy return policies.",
  },
  {
    name: "Mehnaz Chowdhury",
    title: "Customer Support",
    text: "We needed a reliable partner for COD orders, and they exceeded expectations every single time.",
  },
  {
    name: "Fahim Rahman",
    title: "Business Analyst",
    text: "With their express delivery, we managed to reduce customer complaints by 40%. That’s huge!",
  },
  {
    name: "Jannatul Ferdous",
    title: "Content Writer",
    text: "I love how easy it is to schedule a pick-up and get updates in real time. Very professional service.",
  },
  {
    name: "Kamrul Islam",
    title: "Web Developer",
    text: "Packaging was neat and secure. Products arrived in perfect condition even in remote areas.",
  },
];


const ReviewSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="py-16 w-11/12 relative mx-auto lg:w-full mb-16">
      <Swiper
        
        centeredSlides={true}
        loop={true}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 3 , spaceBetween:20  },
          1024: { slidesPerView: 4.3 , spaceBetween:30 },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper  "
      >
        {testimonials.map((review, idx) => {
          const total = testimonials.length;
          const left2 = (activeIndex - 2 + total) % total;
          const left1 = (activeIndex - 1 + total) % total;
          const right1 = (activeIndex + 1) % total;
          const right2 = (activeIndex + 2) % total;

          let y = 70;
          let opacity = 0.3;

          if (idx === activeIndex) {
            y = 0;
            opacity = 1;
          } else if (idx === left1 || idx === right1) {
            y = 50;
            opacity = 0.3;
          } else if (idx === left2 || idx === right2) {
            y = 80;
            opacity = 0.2;
          }

          return (
            <SwiperSlide key={idx} className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity, y }}
                transition={{ duration: 0.6 }}
                className={`bg-white rounded-2xl p-6 mb-16 shadow-md flex flex-col justify-between text-center w-full h-full`}
              >
                <div>
                  <div className="text-4xl text-secondary font-bold mb-4">
                    “
                  </div>
                  <p className="text-gray-700 mb-6 text-sm md:text-base px-4">
                    {review.text}
                  </p>
                  <hr className="border-dashed border-gray-300 mb-6 w-1/2 mx-auto" />
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                    <div className="text-left">
                      <h4 className="text-base font-semibold text-neutral">
                        {review.name}
                      </h4>
                      <p className="text-sm text-gray-500">{review.title}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          );
        })}

        {/* Pagination Below Swiper */}
        <div className="flex justify-center space-x-2  ">
          <div className="swiper-pagination !static " />
        </div>

        {/* Custom Controls */}

        <SwiperNav></SwiperNav>
      </Swiper>
    </div>
  );
};

export default ReviewSection;
