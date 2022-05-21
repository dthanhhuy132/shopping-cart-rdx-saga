import {ListResponse, ListParams, ProductInterface } from "../models";
import axiosClient from "./axiosClient"

const productApi = {
  getAll() {
    const url = '/products'
    return axiosClient.get(url)
  }
}

export default productApi;