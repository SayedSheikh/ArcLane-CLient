import React from "react";

const AboutBuilding = () => {
  return (
    <section className="px-4 py-16 max-w-7xl mx-auto font-inter text-gray-800 dark:text-gray-200">
      {/* Main Heading & Intro */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-primary">
          About the Building
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover the story, architecture, and amenities that make our building
          more than just a place to live — it’s a community crafted for comfort
          and lifestyle.
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: Image */}
        <div
          data-aos="fade-right"
          data-aos-offset="100"
          data-aos-easing="ease-in-sine"
          className="overflow-hidden rounded-lg shadow-lg">
          <img
            src="/about the buikding.jpg"
            alt="Modern Apartment Building"
            className="max-h-[350px] w-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>

        {/* Right: Text Block */}
        <div
          data-aos="fade-left"
          data-aos-offset="100"
          data-aos-easing="ease-in-sine">
          <h3 className="text-2xl font-bold mb-4">
            Modern Architecture Meets Comfort
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
            Our building represents the perfect blend of contemporary design and
            functional living. With spacious apartments, premium finishes, and
            thoughtful layouts, every detail has been carefully crafted to
            enhance your living experience.
            <br /> <br />
            Located in a prime area with easy access to shopping centers,
            schools, hospitals, and public transportation, PrimeBuilding offers
            the perfect balance of urban convenience and peaceful residential
            living.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutBuilding;
