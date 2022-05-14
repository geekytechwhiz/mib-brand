/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllOrders } from "services/orders";

const initialState = {
  orders: [],
};

export const getOrderThunk = createAsyncThunk(
  "oms/brand/order",
  async (brandId) => {
    const response = await getAllOrders(brandId);
    return response;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrderThunk.fulfilled, (state, action) => {
      state.orders = action.payload.body ?? [];
    });
  },
});
export default orderSlice.reducer;
