import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import CartContainer from "./components/CartContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { categories, reset } from "./features/data/dataSlice";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

function App() {
  const [showCart, setshowCart] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categories());
    return () => dispatch(reset());
  }, []);

  return (
    <div className="w-full h-auto">
      <Nav setshowCart={setshowCart} showCart={showCart} />
      {showCart && (
        <CartContainer setshowCart={setshowCart} showCart={showCart} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
