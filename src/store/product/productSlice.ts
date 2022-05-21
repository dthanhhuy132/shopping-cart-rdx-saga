import { createSlice } from "@reduxjs/toolkit";
import { ProductInterface } from "../../models";

interface productState {
  products: ProductInterface [],
 
}

const initialState: productState = {
  products: [],
}

const productSlice  = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getAllProductLoading: () => {},
    getAllProduct: (state, action) => {
      state.products = action.payload
    },
  }
})

// Export action 
export const {getAllProductLoading, getAllProduct} = productSlice.actions
// Export selector
// Export reducer

const productReducer = productSlice.reducer

export default productReducer



