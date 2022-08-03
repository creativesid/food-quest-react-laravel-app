import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";

const SignUp = () => {
  const [data, setdata] = useState({
    name: "",
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
    if (data.name && data.email && data.password) {
      dispatch(register(data));
    }
  };

  if (isLoading) return <p className="text-center">Loading</p>;

  return (
    <div className="md:mx-20 mx-5 h-screen flex justify-center items-center">
      <div className="flex flex-col space-y-3 -mt-32">
        <input
          type="text"
          placeholder="e.g. John Doe"
          className="p-3 pr-20 bg-white border rounded-lg shadow-lg"
          onChange={(e) => setdata({ ...data, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="e.g. email@gmail.com"
          className="p-3 pr-20 bg-white border rounded-lg shadow-lg"
          onChange={(e) => setdata({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="your password"
          onChange={(e) => setdata({ ...data, password: e.target.value })}
          className="p-3 bg-white border rounded-lg shadow-lg"
        />
        {/* <input
          type="passwprd"
          placeholder="confirm password"
          className="p-3 bg-white border rounded-lg shadow-lg"
        /> */}
        <button
          onClick={onsubmit}
          className="flex items-center justify-center space-x-2 py-3 px-8 bg-primary rounded-full text-white shadow-lg shadow-red-200 hover:opacity-75"
        >
          Register
        </button>
        <p className="text-center">
          Already have an account{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
