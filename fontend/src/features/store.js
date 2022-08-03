import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import cartReducer from "./cart/cartSlice";
import dataReducer from "./data/dataSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
    cart: cartReducer,
  },
});
