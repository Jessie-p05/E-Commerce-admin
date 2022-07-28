import { gridColumnLookupSelector } from "@material-ui/data-grid";
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
    //delete one product
    deleteProductStart: (state) => {
      state.isFethching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.isFethching = false;
      state.products.splice(state.products.findIndex((item)=>item._id===action.payload),1);
    },
    deleteProductFailure: (state) => {
      state.error = true;
      state.isFethching = false;
    },
    //update one product
    updateProductStart: (state) => {
      state.isFethching = true;
      state.error = false;
    },
    updateProductSuccess: (state, action) => {
      state.isFethching = false;
      const index = state.products.findIndex((item)=>item._id===action.payload._id);
      console.log(action.payload);
      state.products[index] = action.payload;
    },
    updateProductFailure: (state) => {
      state.error = true;
      state.isFethching = false;
    },
    //add one product
    addProductStart: (state) => {
      state.isFethching = true;
      state.error = false;
    },
    addProductSuccess: (state, action) => {
      state.isFethching = false;
      state.products.push(action.payload) ;
    },
    addProductFailure: (state) => {
      state.error = true;
      state.isFethching = false;
    },
  },
});

export const {
  getProductStart,
  getProductFailure,
  getProductSuccess,
  deleteProductStart,
  deleteProductFailure,
  deleteProductSuccess,
  updateProductStart,
  updateProductFailure,
  updateProductSuccess,
  addProductStart,
  addProductFailure,
  addProductSuccess,
} = productSlice.actions;
export default productSlice.reducer;
