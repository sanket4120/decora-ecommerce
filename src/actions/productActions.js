import axios from 'axios';
import {
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_FEATURED_REQUEST,
  PRODUCT_FEATURED_SUCCESS,
  PRODUCT_FEATURED_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../constants/productConstants';

//get top rated products
export const getTopProducts = async (dispatch) => {
  dispatch({ type: PRODUCT_TOP_REQUEST });
  try {
    const res = await axios.get('/api/products/top');
    dispatch({ type: PRODUCT_TOP_SUCCESS, payload: res.data.products });
  } catch (e) {
    dispatch({ type: PRODUCT_TOP_FAIL, payload: e.message });
  }
};

//get featured products(latest/discounted)
export const getFeaturedProducts = async (dispatch) => {
  dispatch({ type: PRODUCT_FEATURED_REQUEST });
  try {
    const res = await axios.get('/api/products/featured');
    let products = res.data.products;
    dispatch({ type: PRODUCT_FEATURED_SUCCESS, payload: products });
  } catch (e) {
    dispatch({ type: PRODUCT_FEATURED_FAIL, payload: e.message });
  }
};

export const getAllProducts = async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });
  try {
    const res = await axios.get('/api/products');
    let products = res.data.products;
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products });
  } catch (e) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: e.message });
  }
};
