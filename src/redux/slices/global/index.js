/* eslint-disable no-param-reassign */
const { createSlice } = require("@reduxjs/toolkit");

const initialState = { showSuccess: false };

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    successNotification: (state, action) => {
      state.showSuccess = action.payload;
    },
  },
});

export default globalSlice.reducer;
