import {
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  CATEGORY_FAIL,
} from '../constants/categoryConstants';

export const categoryReducer = (state, action) => {
  switch (action.type) {
    case CATEGORY_REQUEST:
      return { loading: true, categories: [] };
    case CATEGORY_SUCCESS:
      return { loading: false, categories: action.payload };
    case CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
