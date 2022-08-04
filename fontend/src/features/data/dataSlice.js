import userEvent from "@testing-library/user-event";
import axios from "axios";
import { url } from "../../api";

// get categories
const categories = async () => {
  const res = await axios.get(`${url}/categories`);
  return res.data;
};

// get Foods
const foods = async (cat) => {
  if (cat) {
    const res = await axios.get(`${url}/products/${cat}`);
    return res.data;
  } else {
    const res = await axios.get(`${url}/products`);
    return res.data;
  }
};

// get Foods
const singleFood = async (id) => {
  const res = await axios.get(`${url}/products/product/${id}`);
  return res.data;
};

// get adress
const addresses = async (id) => {
  const res = await axios.get(`${url}/address${id}`);
  return res.data;
};

// place order
const placeOrder = async (data, token) => {
  const res = await axios.post(
    `${url}/order`,
    { dataArray: data },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return res;
};

// all orders
const orders = async (token) => {
  const res = await axios.get(`${url}/orders`, null, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return res.data;
};

const authService = {
  categories,
  foods,
  singleFood,
  placeOrder,
  orders,
};

export default authService;
