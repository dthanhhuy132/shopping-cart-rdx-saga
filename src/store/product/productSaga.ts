import { PayloadAction } from '@reduxjs/toolkit'
import {call, put, take, takeLatest} from 'redux-saga/effects'
import productApi from '../../api/productApi'
import { ListParams, ListResponse, ProductInterface } from '../../models'
import { getAllProduct, getAllProductLoading } from './productSlice'

export function* getProductList() {
  try {
    const res:ListResponse<ProductInterface> =  yield call(productApi.getAll)

    yield put(getAllProduct(res))

  } catch (error) {
    console.log('failed to fetch student list,', error)
  }

}

export default function* productSaga() {
  //watch fetch student actiond
  yield takeLatest(getAllProductLoading, getProductList)
}