import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogin, MdLogout } from "react-icons/md";
import { IoBagRemoveOutline } from "react-icons/io5";
import Logo from "../assets/logo.png";
import Avatar from "../assets/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { reset } from "../features/auth/authSlice";
import { getTotal } from "../features/cart/cartSlice";

const Nav = ({ setshowCart, showCart }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems, cartTotalQuantity } = useSelector((state) => state.cart);
  const [isMenu, setIsMenu] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, [cartItems]);

  const logout = () => {
    localStorage.removeItem("user");
    dispatch(reset());
    window.location.href = "/";
  };

  return (
    <div className="md:mx-20 mx-5">
      <div className="flex justify-between py-5 items-center">
        <Link to="/">
          <img src={Logo} className="w-10" />
        </Link>
        <ul className="flex sm:space-x-8 space-x-4 items-center font-medium">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="#foods">Foods</a>
          </li>
          <li>
            <div
              onClick={() => setshowCart(!showCart)}
              className="cursor-pointer relative"
            >
              <IoBagRemoveOutline className="text-2xl" />
              <div className="absolute -top-3 left-3 text-orange-700 flex items-center justify-center w-5 h-5 text-sm font-medium bg-orange-100 p-3 rounded-full">
                {cartTotalQuantity}
              </div>
            </div>
          </li>
          <li>
            {user ? (
              <div className="relative">
                <motion.img
                  whileTap={{ scale: 0.6 }}
                  src={Avatar}
                  onClick={() => setIsMenu(!isMenu)}
                  className="w-8 h-8 object-cover drop-shadow-lg cursor-pointer"
                />
                {isMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    className="w-40 bg-gray-50 shadow-xl border rounded-lg absolute top-12 right-0 flex flex-col"
                  >
                    <Link
                      to="/orders"
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base "
                    >
                      Your Orders
                    </Link>
                    <p
                      onClick={logout}
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base "
                    >
                      Logout <MdLogout />
                    </p>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="flex items-center space-x-2 py-3 px-8 bg-primary rounded-full text-white shadow-lg shadow-red-200 hover:opacity-75">
                  <MdLogin /> <p>Login</p>
                </button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
