import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import All from "../assets/all.png";
import { FaRupeeSign } from "react-icons/fa";
import { BsFillBagPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { foods, reset } from "../features/data/dataSlice";
import { addToCart } from "../features/cart/cartSlice";

const Foods = () => {
  const [currentCat, setcurrentCat] = useState("");
  const { categoriesData, fooodsData, isLoading, isError } = useSelector(
    (state) => state.data
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    dispatch(foods(currentCat));
    return () => dispatch(reset());
  }, [currentCat]);

  const checkout = (item) => {
    navigateTo("/checkout", {
      state: {
        items: item,
      },
    });
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isError) return <p className="mt-32 text-center">Something went wrong</p>;

  return (
    <div id="foods">
      <p className="text-primary text-base font-medium">Our Menu</p>
      <h1 className="capitalize text-2xl font-black leading-snug text-textColor">
        Menu that always make you fall in love
      </h1>
      {isLoading ? (
        <p className="mt-32 text-center">Loading...</p>
      ) : (
        <>
          {/* CATEGORIES */}
          <div className="grid md:grid-cols-8 sm:grid-cols-4 grid-cols-1 gap-2 mt-5">
            {categoriesData && categoriesData.length > 0 ? (
              <>
                <div
                  onClick={() => setcurrentCat("")}
                  className={`${
                    !currentCat ? "bg-primary text-white" : "bg-white"
                  } hover:bg-primary group sm:w-40 w-full cursor-pointer rounded-full drop-shadow-xl flex space-x-3 p-3 items-center`}
                >
                  <div className="w-10 p-2 rounded-full bg-white">
                    <img src={All} className="w-10" />
                  </div>
                  <p>All</p>
                </div>
                {categoriesData.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setcurrentCat(item.id)}
                    className={`${
                      currentCat == item.id
                        ? "bg-primary text-white"
                        : "bg-white"
                    } hover:bg-primary group sm:w-40 w-full cursor-pointer rounded-full drop-shadow-xl flex space-x-3 p-3 items-center`}
                  >
                    <div className="w-10 p-2 rounded-full bg-white">
                      <img src={item.image} className="w-10" />
                    </div>
                    <p>{item.name}</p>
                  </div>
                ))}
              </>
            ) : (
              <p>Nothing Found</p>
            )}
          </div>

          {/* Foods */}
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-10 gap-10">
            {fooodsData && fooodsData.length > 0 ? (
              fooodsData.map((item, index) => (
                <div
                  key={index}
                  className="w-full rounded-lg h-80 relative hover:shadow-lg hover:shadow-orange-300"
                >
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="text-white absolute top-4 left-5 z-10 bg-primary p-2 rounded-full"
                  >
                    <BsFillBagPlusFill className="text-lg font-black" />
                  </button>
                  <div className="absolute bottom-3 p-4 z-10">
                    <h1 className="text-xl text-white font-medium">
                      {item.name}
                    </h1>
                    <p className="text-2xl font-bold text-white flex space-x-2 items-center">
                      <FaRupeeSign className="text-yellow-300 text-base" />{" "}
                      {item.price}
                    </p>
                    {/* <button
                      onClick={() => checkout([item])}
                      className="flex mt-3 items-center space-x-2 py-3 px-8 bg-primary rounded-full text-white shadow-sm hover:opacity-75"
                    >
                      Buy Now
                    </button> */}
                  </div>
                  <div className="h-full w-full">
                    <div className="absolute rounded-xl opacity-75 h-full w-full bg-gradient-to-t from-black"></div>
                    <img
                      src={item.image}
                      className="w-full rounded-xl h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>Nothing Found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Foods;
