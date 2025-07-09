import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Button } from "flowbite-react";

import {
  HiBuildingOffice2,
  HiUsers,
  HiShieldCheck,
  HiMapPin,
} from "react-icons/hi2";
import { FaShield } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";
import CountUp from "react-countup";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=600&fit=crop&crop=center",
    title: "Luxury Living at Its Finest",
    subtitle: "Experience premium apartments with world-class amenities",
  },
  {
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200&h=600&fit=crop&crop=center",
    title: "Modern Architecture",
    subtitle: "Contemporary design meeting functional excellence",
  },
  {
    image:
      "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=1200&h=600&fit=crop&crop=center",
    title: "Your Dream Home Awaits",
    subtitle: "Premium locations with unmatched comfort and security",
  },
];

const Hero = () => {
  const [width, setWidth] = useState(window.innerWidth);

  console.log(width);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <section className="relative w-full sm:h-[calc(100vh-60px)] h-[110vh]">
      <Swiper
        spaceBetween={30}
        effect="fade"
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination, EffectFade]}
        className="w-full h-full">
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover absolute inset-0 -z-10"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black opacity-50 z-0" />

              {/* Content */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 text-white">
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-2">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-2xl mb-6 mt-1">
                  {slide.subtitle}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                  <Button className="cursor-pointer bg-primary dark:bg-primary hover:bg-primary/90 dark:hover:bg-primary/90">
                    Explore Apartments
                  </Button>
                  <Button className="bg-white dark:bg-white cursor-pointer text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-200 transition">
                    Contact Us
                  </Button>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-15 lg:gap-20 md:mt-15">
                  <div
                    data-aos={width > 770 ? "zoom-in-right" : "zoom-out"}
                    className="flex flex-col items-center justify-center gap-1">
                    <HiBuildingOffice2 className="text-3xl md:text-5xl text-blue-500" />
                    <p className="text-xl md:text-3xl font-bold mt-1">
                      <CountUp end={50} duration={3} />+
                    </p>
                    <p className="text-sm md:text-2xl">Apartments</p>
                  </div>

                  <div
                    data-aos="zoom-out"
                    className="flex flex-col items-center justify-center gap-1">
                    <HiUsers className="text-3xl md:text-5xl text-blue-500" />
                    <p className="text-xl md:text-3xl font-bold mt-1">
                      <CountUp end={200} duration={4} />+
                    </p>
                    <p className="text-sm md:text-2xl">Happy Residents</p>
                  </div>

                  <div
                    data-aos="zoom-out"
                    className="flex flex-col items-center justify-center gap-1">
                    <FaShieldAlt className="text-3xl md:text-5xl text-blue-500" />
                    <p className="text-xl md:text-3xl font-bold mt-1">24/7</p>
                    <p className="text-sm md:text-2xl">Security</p>
                  </div>

                  <div
                    data-aos={width > 770 ? "zoom-in-left" : "zoom-out"}
                    className="flex flex-col items-center justify-center gap-1">
                    <HiMapPin className="text-3xl md:text-5xl text-blue-500" />
                    <p className="text-xl md:text-3xl font-bold mt-1">Prime</p>
                    <p className="text-sm md:text-2xl">Location</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
