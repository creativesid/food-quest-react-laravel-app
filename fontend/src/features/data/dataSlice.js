import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dataService from "./dataService";

const initialState = {
  categoriesData: [],
  fooodsData: [],
  ordersData: [],
  singleFoodData: null,
  placeOrderData: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// categories
export const categories = createAsyncThunk(
  "data/categories",
  async (thunkAPI) => {
    try {
      return await dataService.categories();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// foods
export const foods = createAsyncThunk("data/foods", async (cat, thunkAPI) => {
  try {
    return await dataService.foods(cat);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// single food
export const singleFood = createAsyncThunk(
  "data/singleFood",
  async (id, thunkAPI) => {
    try {
      return await dataService.singleFood(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// place order
export const placeOrder = createAsyncThunk(
  "data/placeOrder",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await dataService.placeOrder(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// all orders
export const orders = createAsyncThunk("data/orders", async (thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await dataService.orders(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(categories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categoriesData = action.payload;
      })
      .addCase(categories.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
        state.categoriesData = null;
      })
      .addCase(singleFood.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(singleFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleFoodData = action.payload;
      })
      .addCase(singleFood.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
        state.singleFoodData = null;
      })
      .addCase(foods.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(foods.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.fooodsData = action.payload;
      })
      .addCase(foods.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
        state.fooodsData = null;
      })
      .addCase(placeOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.placeOrderData = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
        state.placeOrderData = null;
      })
      .addCase(orders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(orders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ordersData = action.payload;
      })
      .addCase(orders.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
        state.ordersData = null;
      });
  },
});

export const { reset } = dataSlice.actions;
export default dataSlice.reducer;
