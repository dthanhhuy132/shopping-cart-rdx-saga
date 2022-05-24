import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import productReducer from './product/productSlice';
import rootSaga from './rootSaga';
import cartReducer from './cart/cartSlice';

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    Cart: cartReducer,
    Product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware), 
});

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;












