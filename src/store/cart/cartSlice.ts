import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductInterface } from "../../models";


export interface AddProduct {
  productDetail: ProductInterface,
  quantity: number
}

interface ICart {
  cart: AddProduct[]
}

const initialState : ICart = {
  cart: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<any>) => {
      const addProduct: AddProduct = action.payload;
      const addProductId = action.payload.productDetail.productId;
      const newQuantityUpdate = addProduct.quantity
      
      const findIndex = state.cart.findIndex((x:any, index:number) => x.productDetail.productId === addProductId)

      if(findIndex >= 0) {
        state.cart[findIndex].quantity = state.cart[findIndex].quantity + newQuantityUpdate
      } else {
        state.cart.push(addProduct)
      }
      
    },

    descreaseProduct: (state, action) => {
      const addProductId = action.payload; 
      const findIndex = state.cart.findIndex((x:any, index:number) => x.productDetail.productId === addProductId)
      state.cart[findIndex].quantity = state.cart[findIndex].quantity - 1 
    },

    increaseProduct: (state, action) => {
      const addProductId = action.payload; 
      const findIndex = state.cart.findIndex((x:any, index:number) => x.productDetail.productId === addProductId)
      state.cart[findIndex].quantity = state.cart[findIndex].quantity + 1 
    },


    deleteProduce(state, action) {
      const addProductId = action.payload; 
      console.log('addProductId', addProductId)

      const findIndex = state.cart.findIndex((x:any, index:number) => x.productDetail.productId === addProductId)
      console.log('findIndex',findIndex)

      state.cart.splice(findIndex,1)
    },
  }

})

export const {addProduct, descreaseProduct, increaseProduct, deleteProduce} = cartSlice.actions

const cartReducer = cartSlice.reducer;
export default cartReducer;