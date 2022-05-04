/* eslint-disable no-debugger */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, getBrandAccount } from '../../../services/onboarding/index';

const accountInfoState = {
  BusinessDetails: {},
  BankDetails: {},
  ContactDetails: {},
};

const initialState = {
  auth: false,
  userPayload: {},
  accountInfo: accountInfoState,
};

export const loginThunk = createAsyncThunk(
  '/authorizer/login',
  async (accountInfo) => {
    const response = await login(accountInfo);
    return response;
  }
);

export const getBrandThunk = createAsyncThunk(
  '/brand/details/{emailId}',
  async (emailId) => {
    const response = await getBrandAccount(emailId);
    debugger;
    localStorage.setItem('brandId', response.BrandId);
    return response;
  }
);

const authSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.userPayload = action.payload;
    });
    builder.addCase(getBrandThunk.fulfilled, (state, action) => {
      state.accountInfo = action.payload;
    });
  },
});

export default authSlice.reducer;
