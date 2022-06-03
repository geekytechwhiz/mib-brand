/* eslint-disable no-debugger */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { useDispatch } from "react-redux";
// import { setLoading } from "../root/rootSlice";
import {
  getAllOrders,
  getAllReturns,
  updateReturns,
  updateOrder,
  getCancelledOrders,
} from "../../../services/orders/index";

const initialState = {
  orders: [],
  returns: [],
  cancelled: [],
  selectedOrders: [],
  readyToDispatch: [],
};
export const getOrderThunk = createAsyncThunk(
  "oms/brand/order",
  async (brandId) => {
    // const dispatch = useDispatch();
    // dispatch(setLoading(true));
    const response = await getAllOrders(brandId);
    // dispatch(setLoading(false));
    return response;
  }
);

export const updateOrderThunk = createAsyncThunk(
  "oms/brand/order/update",
  async (req) => {
    const response = await updateOrder(req);

    if (!response) return null;
    const orders = await getAllOrders(req.BrandId);
    return orders;
  }
);
export const getReturnsThunk = createAsyncThunk(
  "oms/brand/order/returns",
  async (brandId) => {
    const response = await getAllReturns(brandId);
    return response;
  }
);
export const updateReturnOrderThunk = createAsyncThunk(
  "oms/brand/order/update/returns",
  async (req) => {
    const response = await updateReturns(req);

    if (!response) return null;
    const orders = await getAllReturns(req.BrandId);
    return orders;
  }
);

export const getCancelledOrdersThunk = createAsyncThunk(
  "oms/brand/order/cancel",
  async (brandId) => {
    const response = await getCancelledOrders(brandId);
    return response;
  }
);
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setSelectedOrders: (state, action) => {
      state.selectedOrders = action.payload;
    },
    setMarkReadyToDispatch: (state, action) => {
      state.readyToDispatch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderThunk.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(updateOrderThunk.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(getReturnsThunk.fulfilled, (state, action) => {
      state.returns = action.payload;
    });
    builder.addCase(updateReturnOrderThunk.fulfilled, (state, action) => {
      state.returns = action.payload;
    });
    builder.addCase(getCancelledOrdersThunk.fulfilled, (state, action) => {
      state.cancelled = action.payload;
    });
  },
});
export const { setSelectedOrders, setMarkReadyToDispatch } = orderSlice.actions;
export default orderSlice.reducer;
