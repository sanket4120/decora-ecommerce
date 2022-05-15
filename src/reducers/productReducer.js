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
  PRODUCT_LIST_APPLY_FILTER,
  PRODUCT_LIST_REMOVE_FILTER,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants';

export const initialState = {
  topProducts: { products: [] },
  featuredProducts: { products: [] },
  productList: {
    products: [],
    filters: {
      searchParam: '',
      rating: '',
      category: '',
      sortBy: '',
      searchQuery: '',
      price: '',
    },
  },
  product: {},
};

export const topProductsReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: payload };
    case PRODUCT_TOP_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const featuredProductsReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_FEATURED_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_FEATURED_SUCCESS:
      return { loading: false, products: payload };
    case PRODUCT_FEATURED_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const productListReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, error: null, loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, products: payload };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, products: [], error: payload };
    case PRODUCT_LIST_APPLY_FILTER:
      return { ...state, filters: { ...state.filters, ...payload } };
    case PRODUCT_LIST_REMOVE_FILTER:
      return { ...state, filters: { ...initialState.filters } };
    default:
      return state;
  }
};

export const productDetailsReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
