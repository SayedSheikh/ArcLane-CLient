import { Button } from "flowbite-react";
import React from "react";

const HeroCarosel = ({ item }) => {
  return (
    <div>
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          {item.title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 animate-slide-up opacity-90">
          {item.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl">
            Explore Apartments
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg rounded-xl transition-all duration-200 hover:scale-105 backdrop-blur-sm">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroCarosel;
