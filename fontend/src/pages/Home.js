import React from "react";
import Foods from "../components/Foods";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div className="md:mx-20 mx-5">
      <Hero />
      <Foods />
    </div>
  );
};

export default Home;
