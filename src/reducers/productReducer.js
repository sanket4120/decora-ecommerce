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
};

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

export const productListReducer = (state, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, error: null, loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, products: [], error: action.payload };
    case PRODUCT_LIST_APPLY_FILTER:
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case PRODUCT_LIST_REMOVE_FILTER:
      return { ...state, filters: { ...initialState.filters } };
    default:
      return state;
  }
};
