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
} from '../constants/userConstants';

export const initialState = {
  auth: {},
  wishlist: {},
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
