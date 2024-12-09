/* eslint-disable no-debugger */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: {
    show: false,
    status: "",
    message: "",
    title: "",
  },
  alerts: {
    show: false,
    status: "",
    message: "",
    title: "",
  },
  loading: false,
};

const rootSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    alert: (state, action) => {
      state.alerts = { ...action.payload };
    },
    notification: (state, action) => {
      state.notification = { ...action.payload };
    },
    setMiniSidenav: (state, action) => {
      state.miniSidenav = action.payload;
    },
    setTransparentSidenav: (state, action) => {
      state.transparentSidenav = action.payload;
    },
    setWhiteSidenav: (state, action) => {
      state.whiteSidenav = action.payload;
    },
    setSidenavColor: (state, action) => {
      state.sidenavColor = action.payload;
    },
    setTransparentNavbar: (state, action) => {
      state.transparentNavbar = action.payload;
    },
    setFixedNavbar: (state, action) => {
      state.fixedNavbar = action.payload;
    },
    setOpenConfigurator: (state, action) => {
      state.openConfigurator = action.payload;
    },
    setDirection: (state, action) => {
      state.direction = action.payload;
    },
    setLayout: (state, action) => {
      state.layout = action.payload;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});
export const {
  notification,
  alert,
  setTransparentSidenav,
  setWhiteSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  setDarkMode,
  setLoading,
} = rootSlice.actions;
export default rootSlice.reducer;
