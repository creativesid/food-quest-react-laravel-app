import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";

const Login = () => {
  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user) navigateTo("/");
    if (isError) toast.error(message);
    if (isSuccess || user) navigateTo("/");

    dispatch(reset());
  }, [isError, user, isSuccess, message, dispatch]);

  const onsubmit = () => {
    if (data.email && data.password) {
      dispatch(login(data));
    }
  };

  if (isLoading) return <p className="text-center">Loading</p>;

  return (
    <div className="md:mx-20 mx-5 h-screen flex justify-center items-center">
      <div className="flex flex-col space-y-3 -mt-32">
        <input
          type="text"
          placeholder="e.g. email@gmail.com"
          onChange={(e) => setdata({ ...data, email: e.target.value })}
          className="p-3 pr-20 bg-white border rounded-lg shadow-lg"
        />
        <input
          type="password"
          placeholder="your password"
          onChange={(e) => setdata({ ...data, password: e.target.value })}
          className="p-3 bg-white border rounded-lg shadow-lg"
        />
        <button
          onClick={onsubmit}
          className="flex items-center justify-center space-x-2 py-3 px-8 bg-primary rounded-full text-white shadow-lg shadow-red-200 hover:opacity-75"
        >
          Login
        </button>
        <p className="text-center">
          Not have any account{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
