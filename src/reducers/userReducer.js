import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  WISHLIST_REQUEST,
  WISHLIST_SUCCESS,
  WISHLIST_FAIL,
  WISHLIST_ADD_PRODUCT_FAIL,
  WISHLIST_ADD_PRODUCT_REQUEST,
  WISHLIST_ADD_PRODUCT_SUCCESS,
  WISHLIST_REMOVE_PRODUCT_REQUEST,
  WISHLIST_REMOVE_PRODUCT_SUCCESS,
  WISHLIST_REMOVE_PRODUCT_FAIL,
  CART_REMOVE_PRODUCT_REQUEST,
  CART_ADD_PRODUCT_REQUEST,
  CART_REQUEST,
  CART_REMOVE_PRODUCT_SUCCESS,
  CART_ADD_PRODUCT_SUCCESS,
  CART_SUCCESS,
  CART_REMOVE_PRODUCT_FAIL,
  CART_ADD_PRODUCT_FAIL,
  CART_FAIL,
  CART_UPDATE_PRODUCT_FAIL,
  CART_UPDATE_PRODUCT_REQUEST,
  CART_UPDATE_PRODUCT_SUCCESS,
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_FAIL,
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAIL,
  REMOVE_ADDRESS_REQUEST,
  REMOVE_ADDRESS_SUCCESS,
  REMOVE_ADDRESS_FAIL,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAIL,
  ORDERS_REQUEST,
  ORDERS_SUCCESS,
  ORDERS_FAIL,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
} from '../constants/userConstants';

export const initialState = {
  auth: {},
  wishlist: {},
  cart: {},
  address: {},
};

export const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN_REQUEST:
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
    case USER_LOGIN_SUCCESS:
      localStorage.setItem('token', payload.encodedToken);
      return { loading: false, userInfo: payload.user, isAuthenticated: true };
    case USER_SIGNUP_FAIL:
    case USER_LOGIN_FAIL:
      return { loading: false, error: payload };
    case USER_LOGOUT:
      localStorage.removeItem('token');
      return {};
    default:
      return state;
  }
};

export const wishlistReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case WISHLIST_REMOVE_PRODUCT_REQUEST:
    case WISHLIST_ADD_PRODUCT_REQUEST:
    case WISHLIST_REQUEST:
      return { ...state, loading: true, error: false };
    case WISHLIST_REMOVE_PRODUCT_SUCCESS:
    case WISHLIST_ADD_PRODUCT_SUCCESS:
    case WISHLIST_SUCCESS:
      return { ...state, loading: false, wishlist: payload };
    case WISHLIST_REMOVE_PRODUCT_FAIL:
    case WISHLIST_ADD_PRODUCT_FAIL:
    case WISHLIST_FAIL:
      return { loading: false, wishlist: [], error: payload };
    default:
      return state;
  }
};

export const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_UPDATE_PRODUCT_REQUEST:
    case CART_REMOVE_PRODUCT_REQUEST:
    case CART_ADD_PRODUCT_REQUEST:
    case CART_REQUEST:
      return { ...state, loading: true, error: false };
    case CART_UPDATE_PRODUCT_SUCCESS:
    case CART_REMOVE_PRODUCT_SUCCESS:
    case CART_ADD_PRODUCT_SUCCESS:
    case CART_SUCCESS:
      return { ...state, loading: false, cart: payload };
    case CART_UPDATE_PRODUCT_FAIL:
    case CART_REMOVE_PRODUCT_FAIL:
    case CART_ADD_PRODUCT_FAIL:
    case CART_FAIL:
      return { loading: false, cart: [], error: payload };
    default:
      return state;
  }
};

export const addressReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_ADDRESS_REQUEST:
    case REMOVE_ADDRESS_REQUEST:
    case ADD_ADDRESS_REQUEST:
    case GET_ADDRESS_REQUEST:
      return { ...state, loading: true, error: false };
    case UPDATE_ADDRESS_SUCCESS:
    case REMOVE_ADDRESS_SUCCESS:
    case ADD_ADDRESS_SUCCESS:
    case GET_ADDRESS_SUCCESS:
      return { loading: false, address: payload };
    case GET_ADDRESS_FAIL:
      return { loading: false, error: payload, address: [] };
    case UPDATE_ADDRESS_FAIL:
    case REMOVE_ADDRESS_FAIL:
    case ADD_ADDRESS_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const orderReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case PLACE_ORDER_REQUEST:
    case ORDERS_REQUEST:
      return { ...state, loading: true, error: false };
    case PLACE_ORDER_SUCCESS:
    case ORDERS_SUCCESS:
      return { ...state, loading: false, orders: payload };
    case PLACE_ORDER_FAIL:
    case ORDERS_FAIL:
      return { loading: false, orders: [], error: payload };
    default:
      return state;
  }
};

export const orderDetailsReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, orderDetails: payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
