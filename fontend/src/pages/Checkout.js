import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";
import { singleFood, placeOrder, reset } from "../features/data/dataSlice";

const Checkout = () => {
  const [placingOrders, setplacingOrders] = useState(false);
  const [shippingDetails, setshippingDetails] = useState({
    address: "",
    country: "",
    state: "",
    city: "",
    postalcode: "",
  });
  const location = useLocation();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { placeOrderData, isLoading, isError, isSuccess } = useSelector(
    (state) => state.data
  );

  useEffect(() => {
    if (!user) navigateTo("/login");
    if (placeOrderData?.status == 1) {
      toast.success("order placed");
      navigateTo("/orders");
    }
  }, [placeOrderData]);

  const onSubmit = () => {
    if (
      shippingDetails.city &&
      shippingDetails.state &&
      shippingDetails.country &&
      shippingDetails.address &&
      shippingDetails.postalcode
    ) {
      location.state.items.forEach((element) => {
        const data = {
          ...shippingDetails,
          user_id: user.id,
          product_id: element.id,
          qty: element.cartQuantity,
        };
        dispatch(placeOrder(data));
      });
      if (isSuccess) {
        setplacingOrders(true);
        dispatch(clearCart());
        toast.success("successfully placed your order");
        navigateTo("/orders");
      }
    } else {
      toast.error("fill all the fiels");
    }
  };

  if (isError) return <p className="mt-32 text-center">Something went wrong</p>;
  if (placingOrders) toast.info("placing order...");

  return (
    <div className="md:mx-20 mx-5 mt-10">
      <div class="container mx-auto">
        <div class="flex flex-col w-full px-0 mx-auto md:flex-row">
          <div class="flex flex-col md:w-full">
            <h2 class="mb-4 font-bold md:text-xl text-heading">
              Shipping Address
            </h2>
            <form class="justify-center w-full mx-auto">
              <div class="">
                <div class="mt-4"></div>
                <div class="mt-4">
                  <div class="w-full">
                    <label
                      for="Address"
                      class="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Address
                    </label>
                    <textarea
                      onChange={(e) =>
                        setshippingDetails({
                          ...shippingDetails,
                          address: e.target.value,
                        })
                      }
                      class="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      name="Address"
                      cols="20"
                      rows="4"
                      placeholder="Address"
                      required
                    ></textarea>
                  </div>
                </div>
                <div class="space-x-0 lg:flex lg:space-x-4">
                  <div class="w-full lg:w-1/2">
                    <label
                      for="city"
                      class="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      City
                    </label>
                    <input
                      onChange={(e) =>
                        setshippingDetails({
                          ...shippingDetails,
                          city: e.target.value,
                        })
                      }
                      name="city"
                      type="text"
                      required
                      placeholder="City"
                      class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div class="w-full lg:w-1/2 ">
                    <label
                      for="postcode"
                      class="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Country
                    </label>
                    <input
                      onChange={(e) =>
                        setshippingDetails({
                          ...shippingDetails,
                          country: e.target.value,
                        })
                      }
                      name="country"
                      type="text"
                      required
                      placeholder="country"
                      class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div class="space-x-0 lg:flex lg:space-x-4">
                  <div class="w-full lg:full mt-3">
                    <label
                      for="postcode"
                      class="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      State
                    </label>
                    <input
                      onChange={(e) =>
                        setshippingDetails({
                          ...shippingDetails,
                          state: e.target.value,
                        })
                      }
                      name="state"
                      type="text"
                      required
                      placeholder="state"
                      class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div class="w-full lg:full mt-3">
                    <label
                      for="postcode"
                      class="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Postcode
                    </label>
                    <input
                      onChange={(e) =>
                        setshippingDetails({
                          ...shippingDetails,
                          postalcode: e.target.value,
                        })
                      }
                      name="postcode"
                      type="number"
                      required
                      placeholder="Post Code"
                      class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div class="mt-4">
                  <button
                    type="button"
                    onClick={(e) => onSubmit()}
                    class="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900"
                  >
                    Process
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div class="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
            <div class="pt-12 md:pt-0 2xl:ps-4">
              <h2 class="text-xl font-bold">Order Summary</h2>
              <div class="mt-8">
                <div class="flex flex-col space-y-4">
                  {location?.state?.items.map((item, index) => (
                    <div key={index} class="flex space-x-4">
                      <div>
                        <img
                          src={item?.image}
                          alt="image"
                          class="w-20 h-20 object-cover"
                        />
                      </div>
                      <div>
                        <h2 class="text-xl font-bold">{item?.name}</h2>
                        <span class="text-red-600">Rs</span> {item?.price} X{" "}
                        {item?.cartQuantity} ={" "}
                        {item?.price * item?.cartQuantity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div class="flex p-4 mt-4">
                <h2 class="text-xl font-bold">
                  ITEMS {location?.state?.cartTotalQuantity}
                </h2>
              </div>
              <div class="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Subtotal
                <span class="ml-2">Rs {location?.state?.cartTotalAmount}</span>
              </div>
              <div class="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Shipping Tax<span class="ml-2">Free</span>
              </div>
              <div class="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Total
                <span class="ml-2">Rs {location?.state?.cartTotalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
