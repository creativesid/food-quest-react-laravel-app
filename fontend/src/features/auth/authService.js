import axios from "axios";
import { url } from "../../api";

// register user
const register = async (userData) => {
  const res = await axios.post(`${url}/register`, userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

// login user
const login = async (userData) => {
  const res = await axios.post(`${url}/login`, userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

const authService = {
  register,
  login,
};

export default authService;
