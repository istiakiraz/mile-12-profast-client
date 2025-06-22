import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SwiperNav from './SwiperNav';

const testimonials = [
  {
    name: 'Awlad Hossin',
    title: 'Senior Product Designer',
    text: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
  },
  {
    name: 'Rasel Ahamed',
    title: 'CTO',
    text: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
  },
  {
    name: 'Nasir Uddin1',
    title: 'CEO',
    text: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
  },
  {
    name: 'Nasir Uddin2',
    title: 'CEO',
    text: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
  },
  {
    name: 'Nasir Uddin3',
    title: 'CEO',
    text: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
  },
  {
    name: 'Nasir Uddin4',
    title: 'CEO',
    text: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
  },
  {
    name: 'Nasir Uddin5',
    title: 'CEO',
    text: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
  },
];

const ReviewSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);


  return (
    <div className="py-16 w-11/12 mx-auto lg:w-full mb-16">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        pagination={{ clickable: true }}
        navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4.3 },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
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
            y = 70;
            opacity = 0.3;
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
                  <div className="text-4xl text-secondary font-bold mb-4">“</div>
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

        {/* Custom Controls */}
      <SwiperNav></SwiperNav>

      </Swiper>
    </div>
  );
};

export default ReviewSection;
