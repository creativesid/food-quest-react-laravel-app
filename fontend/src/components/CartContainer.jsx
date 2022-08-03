import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { motion } from "framer-motion";
import Burger1 from "../assets/burger.jpg";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotal,
  removeFromCart,
} from "../features/cart/cartSlice";

const CartContainer = ({ setshowCart }) => {
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state) => state.cart
  );

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    dispatch(getTotal());
  }, [cartItems, cartTotalQuantity, cartTotalAmount]);

  const checkout = (item) => {
    navigateTo("/checkout", {
      state: {
        items: item,
        cartTotalQuantity,
        cartTotalAmount,
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-[375px] h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => setshowCart(false)}
        >
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center space-x-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
          onClick={() => dispatch(clearCart())}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* bottom section */}
      <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col justify-between">
        {/* cart Items section */}
        <div className="w-full h-[500px] px-6 py-10 flex flex-col space-y-3 overflow-y-scroll">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center space-x-2"
              >
                <img
                  src={item.image}
                  className="w-20 h-20 max-w-[60px] rounded-full object-cover"
                  alt=""
                />

                {/* name section */}
                <div className="flex flex-col space-y-2">
                  <p className="text-base text-textColor">{item.name}</p>
                  <p className="text-sm block text-primary font-semibold">
                    Rs {item.price}
                  </p>
                </div>

                {/* button section */}
                <div className="group flex items-center space-x-7 justify-between">
                  <div className="flex items-center space-x-2">
                    <motion.div
                      whileTap={{ scale: 0.75 }}
                      className="cursor-pointer"
                    >
                      <BiMinus
                        className="text-textColor "
                        onClick={() => dispatch(decreaseCart(item))}
                      />
                    </motion.div>

                    <p className="w-5 h-5 rounded-sm bg-cartBg text-textColor flex items-center justify-center">
                      {item.cartQuantity}
                    </p>

                    <motion.div
                      whileTap={{ scale: 0.75 }}
                      className="cursor-pointer"
                    >
                      <BiPlus
                        className="text-textColor"
                        onClick={() => dispatch(addToCart(item))}
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    whileTap={{ scale: 0.75 }}
                    onClick={() => dispatch(removeFromCart(item))}
                    className="cursor-pointer"
                  >
                    <BiTrash className="text-textColor " />
                  </motion.div>
                </div>
              </div>
            ))
          ) : (
            <p>
              Go Back To <Link to="/">Shop</Link>
            </p>
          )}
        </div>

        {/* cart total section */}
        <div className="w-full space-y-4 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
          <div className="w-full border-b border-gray-600"></div>

          <div className="w-full flex items-center justify-between">
            <p className="text-textColor text-xl font-semibold">Total</p>
            <p className="text-textColor text-xl font-semibold">
              Rs {cartTotalAmount}
            </p>
          </div>
          {user ? (
            <motion.button
              onClick={() => checkout(cartItems)}
              whileTap={{ scale: 0.8 }}
              type="button"
              className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-white text-lg my-2 hover:shadow-lg"
            >
              Check Out
            </motion.button>
          ) : (
            <Link to={"/login"} className="w-full">
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr bg-primary text-white text-lg my-2 hover:shadow-lg"
              >
                Login to check out
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CartContainer;
