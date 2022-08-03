import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { url } from "../api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useSelector((state) => state.auth);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!user) navigateTo("/login");

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${url}/orders`, {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        });
        setOrders(res.data);
        setIsLoading(false);
      } catch (error) {
        navigateTo("/");
      }
    };

    fetchOrders();
  }, []);

  //   if (isError) return <p className="mt-32 text-center">Something went wrong</p>;
  if (isLoading) return <p className="mt-32 text-center">Loading...</p>;

  return (
    <div className="md:mx-20 mx-5 mt-10">
      <div class="overflow-x-auto w-full shadow-md">
        <table class="mx-auto  w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
          <thead class="bg-gray-900">
            <tr class="text-white text-left">
              <th class="font-semibold text-sm uppercase px-6 py-4">Name</th>
              <th class="font-semibold text-sm uppercase px-6 py-4">
                Price (RS)
              </th>
              <th class="font-semibold text-sm uppercase px-6 py-4 text-center">
                Quantity
              </th>
              <th class="font-semibold text-sm uppercase px-6 py-4 text-center">
                status
              </th>
              {/* <th class="font-semibold text-sm uppercase px-6 py-4 text-center">
                Date
              </th> */}
            </tr>
          </thead>
          {orders && orders.length > 0 ? (
            orders.map((item, index) => (
              <tbody class="divide-y divide-gray-200" key={index}>
                <tr>
                  <td class="px-6 py-4">
                    <div class="flex items-center space-x-3">
                      <div class="inline-flex w-10 h-10">
                        <img
                          class="w-10 h-10 object-cover rounded-full"
                          alt="User avatar"
                          src={item.image}
                        />
                      </div>
                      <div>
                        <p> {item.name} </p>
                        <p class="text-gray-500 text-sm font-semibold tracking-wide">
                          {item.cat_name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <p class=""> {item.price} </p>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <p class=""> {item.qty} </p>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span class="text-white text-sm  py-2 bg-green-600 font-semibold px-4 rounded-full">
                      {item.order_status}
                    </span>
                  </td>
                  {/* <td class="px-6 py-4 text-center">{item.created_at}</td> */}
                </tr>
              </tbody>
            ))
          ) : (
            <p className="p-4">No order Found </p>
          )}
        </table>
      </div>
    </div>
  );
};

export default Orders;
