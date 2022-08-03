import React from "react";
import { Link } from "react-router-dom";
import Burger from "../assets/burger.jpg";

const FoodPage = () => {
  return (
    <div className="md:mx-20 mb-20 mx-5 mt-20 flex gap-20 justify-between items-center">
      <img src={Burger} className="w-96 rounded-xl" />
      <div>
        <h1 className="text-xl font-bold">King Burger</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div className="mt-7 flex space-x-4">
          <Link to="/login">
            <button className="flex items-center space-x-2 py-3 px-8 bg-primary rounded-full text-white shadow-lg shadow-red-200 hover:opacity-75">
              Buy Now
            </button>
          </Link>
          <button className="flex items-center space-x-2 py-3 px-8 bg-primary rounded-full text-white shadow-lg hover:opacity-75">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodPage;
