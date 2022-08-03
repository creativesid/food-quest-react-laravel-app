import React from "react";
import HeroBanner from "../assets/hero.png";

const Hero = () => {
  return (
    <div className="flex justify-between items-center w-full h-[90vh]">
      <div>
        <span className="text-orange-700 text-sm font-medium bg-orange-100 p-4 rounded-full">
          Free Delivery
        </span>
        <h1 className="mt-10 capitalize sm:text-6xl text-4xl font-black leading-snug text-textColor">
          We serve the Taste <br />{" "}
          <span className="text-primary">You Love</span>
        </h1>
        <p className="text-textColor text-xl">
          Our job is to filling your tummy with delicious food and with fast and
          free delivery.
        </p>
        <button className="mt-7 flex items-center space-x-2 py-3 px-8 bg-primary rounded-full text-white shadow-lg shadow-red-200 hover:opacity-75">
          <a href="#foods">Buy Now</a>
        </button>
      </div>
      <img src={HeroBanner} className="w-[900px]  md:block hidden" />
    </div>
  );
};

export default Hero;
