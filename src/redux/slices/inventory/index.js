/* eslint-disable no-param-reassign */
/* eslint-disable no-debugger */
import { useDispatch } from "react-redux";
import {
  PRODUCT_STATUS_PUBLISHED,
  PRODUCT_STATUS_INACTIVE,
} from "lib/constants";
import { getProducts, patchProductStatus } from "../../../services/inventory";
import { setLoading } from "../root/rootSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const productId = `P${new Date().getTime().toString()}`;
const initialState = {
  products: [],
  inActiveProducts: [],
  categories: {
    Category: "",
    ProductCategory: "",
  },
  vitalInfo: {
    ProductId: productId,
    ProductType: "Exclusive",
    BrandName: "",
    Title: "",
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
  async (payload) => {
    const dispatch = useDispatch();
    dispatch(setLoading(true));
        
    const response = await getProducts(payload.brandId, payload.status);
    dispatch(setLoading(false));

    return response;
  }
);
export const getInactiveProductsThunk = createAsyncThunk(
  "/inventory/products/brand/{brandId}/{Status}",
  async (payload) => {
    const dispatch = useDispatch();
    dispatch(setLoading(true));
    const response = await getProducts(payload.brandId, payload.status);
    dispatch(setLoading(false));

    return response;
  }
);

export const patchProductStatusThunk = createAsyncThunk(
  "/inventory/products/brand/{brandId}/status",
  async (payload) => {
    const brandId = localStorage.getItem("brandId");
    const response = await patchProductStatus(payload, brandId);
    if (!response) return null;
    const active = await getProducts(brandId, PRODUCT_STATUS_PUBLISHED);
    const inActive = await getProducts(brandId, PRODUCT_STATUS_INACTIVE);

    return {
      active,
      inActive,
    };
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
    builder.addCase(patchProductStatusThunk.fulfilled, (state, action) => {
      state.products = action.payload.active;
      state.inActiveProducts = action.payload.inActive;
    });
    builder.addCase(getInactiveProductsThunk.fulfilled, (state, action) => {
      state.inActiveProducts = action.payload;
    });
  },
});
export const { vitalInfo, offers, medias, description, categories, variant } =
  inventorySlice.actions;
export default inventorySlice.reducer;
