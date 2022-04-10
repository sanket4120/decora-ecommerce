import {
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_FEATURED_REQUEST,
  PRODUCT_FEATURED_SUCCESS,
  PRODUCT_FEATURED_FAIL,
} from '../constants/productConstants';

export const topProductsReducer = (state, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const featuredProductsReducer = (state, action) => {
  switch (action.type) {
    case PRODUCT_FEATURED_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_FEATURED_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_FEATURED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
