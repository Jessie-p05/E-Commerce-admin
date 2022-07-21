import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFethching: false,
    error: false,
  },
  reducers: {
    //Get all products
    getProductStart: (state) => {
      state.isFethching = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.isFethching = false;
      state.products = action.payload;
    },
    getProductFailure: (state) => {
      state.error = true;
      state.isFethching = false;
    },
  },
});

export const {
  getProductStart,
  getProductFailure,
  getProductSuccess,
} = productSlice.actions;
export default productSlice.reducer;
