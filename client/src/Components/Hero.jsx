import React from "react";
import home from "../Assets/homepage.png";

const Hero = () => {
  return (
    <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
      <img
        src={home}
        alt="Home background"
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-2 max-w-2xl">
          25% Off All New Items
        </h1>
        <p className="text-white text-lg md:text-xl mb-6">
          New Items Just Added
        </p>
        <button className="bg-green-500 text-white py-2 px-6 rounded-md text-sm md:text-base font-semibold w-28 md:w-32 hover:bg-green-600 transition-colors duration-300">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
