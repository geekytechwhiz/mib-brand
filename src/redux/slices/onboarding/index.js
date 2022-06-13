/* eslint-disable no-debugger */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfileCompletionScore } from "lib/helper/index";
import {
  login,
  getBrandAccount,
  updateBankDetails,
} from "../../../services/onboarding/index";

const accountInfoState = {
  BusinessDetails: {},
  BankDetails: {},
  ContactDetails: {},
  AddressDetails: {},
  DocumentVerification: {
    AadhaarFront: {
      Uploaded: false,
      Verified: false,
      Url: "",
    },
    AadhaarBack: {
      Uploaded: false,
      Verified: false,
      Url: "",
    },
    BusinessProof: {
      Uploaded: false,
      Verified: false,
      Url: "",
    },
    Pan: {
      Uploaded: false,
      Verified: false,
      Url: "",
    },
  },
  ProfileCompletion: {
    AccountActivation: "",
    BusinessDetails: "",
    ContactDetails: "",
    AddressDetails: "",
    BankAccounts: "",
    Documents: "",
  },
};

const initialState = {
  auth: false,
  userPayload: {},
  accountInfo: accountInfoState,
  profileScore: 0,
};

export const loginThunk = createAsyncThunk(
  "/authorizer/login",
  async (accountInfo) => {
    const response = await login(accountInfo);
    return response;
  }
);

export const getBrandThunk = createAsyncThunk(
  "/brand/details/{emailId}",
  async (emailId) => {
    const response = await getBrandAccount(emailId);
    let score = 0;
    if (response && response.BrandId) {
      const { ProfileCompletion } = response;
      score = getProfileCompletionScore(ProfileCompletion);
      localStorage.setItem("brandId", response.BrandId);
    }
    return {
      response,
      score,
    };
  }
);

export const updateBankInfoThunk = createAsyncThunk(
  "/brand/bank-details/{emailId}",
  async (payload) => {
    const emailId = localStorage.getItem("emailId");
    const res = await updateBankDetails(payload, emailId);
    if (!res) return {};
    const response = await getBrandAccount(emailId);
    return response;
  }
);

const authSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.userPayload = action.payload;
    });
    builder.addCase(getBrandThunk.fulfilled, (state, action) => {
      state.accountInfo = action.payload.response;
      state.profileScore = action.payload.score;
    });
  },
});

export default authSlice.reducer;
