import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListParams, ListResponse, PaginationParams, ProductInterface } from "../../models";

export interface productState {
  products: any,
 
}

const initialState: productState = {
  products: undefined,
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



