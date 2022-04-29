/* eslint-disable no-param-reassign */
/* eslint-disable no-debugger */
import { getProducts } from "services/inventory";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  Products: [],
  categories: {
    Category: "",
    ProductCategory: "",
  },
  vitalInfo: {
    ProductId: "",
    BrandId: "",
    BrandName: "",
    Tittle: "",
    NumberOfItems: "",
    UnitCount: "",
    UnitType: "",
    ModelName: "",
    WarrantyDescription: "",
    Manufacturer: "",
    TraceId: "",
  },
  offers: {
    YourPrice: "",
    MRP: "",
    SellingPrice: "",
    Quantity: "",
    Condition: "",
    CountryOfOrigin: "",
    DeliveryChannel: "",
    TaxCode: "",
  },
  medias: {
    ImageLinks: [],
  },
  description: {
    ProductDescription: "",
    KeyPoints: [],
  },
  variantDetails: {},
  moreDetails: {
    GST: "",
    BuddyMargin: "",
    LoyaltyPoint: "",
    MRP: "",
    LocalDeliveryCharge: "",
    ZonalDeliveryCharge: "",
    NationalDeliveryCharge: "",
    SellingPrice: "",
  },
};

export const getProductsThunk = createAsyncThunk(
  "/brand/details/{emailId}",
  async (emailId) => {
      
    const response = await getProducts(emailId);
    return response;
  }
);

const inventorySlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    categories: (state, action) => {
      state.categories = action.payload;
    },
    vitalInfo: (state, action) => {
      state.vitalInfo = action.payload;
    },
    offers: (state, action) => {
      state.offers = action.payload;
    },
    medias: (state, action) => {
      state.medias = action.payload;
    },
    description: (state, action) => {
      state.description = action.payload;
    },
    variant: (state, action) => {
      state.variant = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsThunk.fulfilled, (state, action) => {
      state.Products = action.payload;
    });
  },
});
export const { vitalInfo, offers, medias, description, categories, variant } =
  inventorySlice.actions;
export default inventorySlice.reducer;
