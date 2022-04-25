import axios from 'axios';
import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  WISHLIST_REQUEST,
  WISHLIST_SUCCESS,
  WISHLIST_FAIL,
  WISHLIST_ADD_PRODUCT_REQUEST,
  WISHLIST_ADD_PRODUCT_SUCCESS,
  WISHLIST_ADD_PRODUCT_FAIL,
  WISHLIST_REMOVE_PRODUCT_REQUEST,
  WISHLIST_REMOVE_PRODUCT_SUCCESS,
  WISHLIST_REMOVE_PRODUCT_FAIL,
  CART_REQUEST,
  CART_SUCCESS,
  CART_FAIL,
  CART_ADD_PRODUCT_REQUEST,
  CART_ADD_PRODUCT_SUCCESS,
  CART_ADD_PRODUCT_FAIL,
  CART_REMOVE_PRODUCT_REQUEST,
  CART_REMOVE_PRODUCT_SUCCESS,
  CART_REMOVE_PRODUCT_FAIL,
  CART_UPDATE_PRODUCT_REQUEST,
  CART_UPDATE_PRODUCT_SUCCESS,
  CART_UPDATE_PRODUCT_FAIL,
} from '../constants/userConstants';
import { setMessage } from './messageActions';

export const signup = async (dispatch, setMessages, userDetails) => {
  dispatch({ type: USER_SIGNUP_REQUEST });

  try {
    const res = await axios.post('/api/auth/signup', {
      ...userDetails,
    });

    const { createdUser: user, encodedToken } = res.data;

    dispatch({ type: USER_SIGNUP_SUCCESS, payload: { user, encodedToken } });
  } catch (e) {
    const errors = e.response.data.errors;

    if (errors) {
      errors.map((error) => setMessage(setMessages, error, 'danger'));
    }

    dispatch({ type: USER_SIGNUP_FAIL, payload: errors });
  }
};

export const login = async (dispatch, setMessages, loginCredentials) => {
  dispatch({ type: USER_LOGIN_REQUEST });

  try {
    const res = await axios.post('/api/auth/login', {
      ...loginCredentials,
    });

    const { foundUser: user, encodedToken } = res.data;

    dispatch({ type: USER_LOGIN_SUCCESS, payload: { user, encodedToken } });
  } catch (e) {
    const errors = e.response.data.errors;

    if (errors) {
      errors.map((error) => setMessage(setMessages, error, 'danger'));
    }

    dispatch({ type: USER_LOGIN_FAIL, payload: errors });
  }
};

export const logout = (dispatch) => {
  dispatch({ type: USER_LOGOUT });
};

export const getUserWishlist = async (dispatch) => {
  dispatch({ type: WISHLIST_REQUEST });
  try {
    const res = await axios.get(`/api/user/wishlist`);
    dispatch({ type: WISHLIST_SUCCESS, payload: res.data.wishlist });
  } catch (e) {
    dispatch({ type: WISHLIST_FAIL, payload: e.response.data });
  }
};

export const addProductToWishlist = async (dispatch, setMessages, product) => {
  dispatch({ type: WISHLIST_ADD_PRODUCT_REQUEST });
  try {
    const res = await axios.post('/api/user/wishlist', { product });
    dispatch({
      type: WISHLIST_ADD_PRODUCT_SUCCESS,
      payload: res.data.wishlist,
    });
    setMessage(setMessages, `${product.title} Added to wishlist`, 'success');
  } catch (e) {
    const errors = e.response.data.errors;

    if (errors) {
      errors.map((error) => setMessage(setMessages, error, 'danger'));
    }

    dispatch({ type: WISHLIST_ADD_PRODUCT_FAIL, payload: errors });
  }
};

export const removeProductFromWishlist = async (
  dispatch,
  setMessages,
  product
) => {
  dispatch({ type: WISHLIST_REMOVE_PRODUCT_REQUEST });
  try {
    const res = await axios.delete(`/api/user/wishlist/${product._id}`);
    dispatch({
      type: WISHLIST_REMOVE_PRODUCT_SUCCESS,
      payload: res.data.wishlist,
    });
    setMessage(
      setMessages,
      `${product.title} Removed from wishlist`,
      'success'
    );
  } catch (e) {
    const errors = e.response.data.errors;

    if (errors) {
      errors.map((error) => setMessage(setMessages, error, 'danger'));
    }

    dispatch({ type: WISHLIST_REMOVE_PRODUCT_FAIL, payload: errors });
  }
};

export const getUserCart = async (dispatch) => {
  dispatch({ type: CART_REQUEST });
  try {
    const res = await axios.get(`/api/user/cart`);
    dispatch({ type: CART_SUCCESS, payload: res.data.cart });
  } catch (e) {
    dispatch({ type: CART_FAIL, payload: e.response.data });
  }
};

export const addProductToCart = async (dispatch, setMessages, product) => {
  dispatch({ type: CART_ADD_PRODUCT_REQUEST });
  try {
    const res = await axios.post('/api/user/cart', { product });
    dispatch({
      type: CART_ADD_PRODUCT_SUCCESS,
      payload: res.data.cart,
    });
    setMessage(setMessages, `${product.title} Added to cart`, 'success');
  } catch (e) {
    const errors = e.response.data.errors;

    if (errors) {
      errors.map((error) => setMessage(setMessages, error, 'danger'));
    }

    dispatch({ type: CART_ADD_PRODUCT_FAIL, payload: errors });
  }
};

export const removeProductFromCart = async (dispatch, setMessages, product) => {
  dispatch({ type: CART_REMOVE_PRODUCT_REQUEST });
  try {
    const res = await axios.delete(`/api/user/cart/${product._id}`);
    dispatch({
      type: CART_REMOVE_PRODUCT_SUCCESS,
      payload: res.data.cart,
    });
    setMessage(setMessages, `${product.title} Removed from cart`, 'success');
  } catch (e) {
    const errors = e.response.data.errors;

    if (errors) {
      errors.map((error) => setMessage(setMessages, error, 'danger'));
    }

    dispatch({ type: CART_REMOVE_PRODUCT_FAIL, payload: errors });
  }
};

export const updateCart = async (dispatch, setMessages, product) => {
  dispatch({ type: CART_UPDATE_PRODUCT_REQUEST });
  try {
    const res = await axios.post(`/api/user/cart/${product._id}`, {
      qty: product.qty,
    });
    dispatch({
      type: CART_UPDATE_PRODUCT_SUCCESS,
      payload: res.data.cart,
    });
    setMessage(
      setMessages,
      `You've changed '${product.title}' QUANTITY to '${product.qty}'`,
      'success'
    );
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      errors.map((error) => setMessage(setMessages, error, 'danger'));
    }
    dispatch({ type: CART_UPDATE_PRODUCT_FAIL, payload: errors });
  }
};
