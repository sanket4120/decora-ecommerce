import { useEffect } from 'react';
import axios from 'axios';
import { useCategory } from '../context/categoryContext';
import {
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  CATEGORY_FAIL,
} from '../constants/categoryConstants';

export const useGetCategories = () => {
  const { state, dispatch } = useCategory();

  useEffect(() => {
    const getCategories = async () => {
      dispatch({ type: CATEGORY_REQUEST });
      try {
        const res = await axios.get('/api/categories');
        dispatch({ type: CATEGORY_SUCCESS, payload: res.data.categories });
      } catch (e) {
        dispatch({ type: CATEGORY_FAIL, payload: e.message });
      }
    };

    getCategories();
  }, [dispatch]);

  return state;
};
