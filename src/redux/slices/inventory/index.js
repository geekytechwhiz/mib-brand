/* eslint-disable no-param-reassign */
/* eslint-disable no-debugger */
import { getProducts } from "services/inventory";
// import { PRODUCT_TYPES } from '../../lib/constants/index.js';

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const productId = `P${new Date().getTime().toString()}`;
const initialState = {
  products: [],
  categories: {
    Category: "",
    ProductCategory: "",
  },
  vitalInfo: {
    ProductId: productId,
    ProductType: "Exclusive",
    BrandName: "",
    Tittle: "",
    NumberOfItems: "",
    UnitCount: "",
    UnitType: "",
    ModelName: "",
    WarrantyDescription: "",
    Manufacturer: "",
    TraceId: "",
    Stock: "",
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
  "/inventory/products/product/{brandId}",
  async (brandId) => {
    const response = await getProducts(brandId);
    debugger;
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
      state.products = action.payload;
    });
  },
});
export const { vitalInfo, offers, medias, description, categories, variant } =
  inventorySlice.actions;
export default inventorySlice.reducer;
