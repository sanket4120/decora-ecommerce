import { useEffect } from 'react';
import axios from 'axios';
import { useProducts } from '../context/productsContext';
import {
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_FEATURED_REQUEST,
  PRODUCT_FEATURED_SUCCESS,
  PRODUCT_FEATURED_FAIL,
} from '../constants/productConstants';

//get top rated products
export const useGetTopProducts = () => {
  const { topProducts, setTopProducts: dispatch } = useProducts();

  useEffect(() => {
    (async () => {
      dispatch({ type: PRODUCT_TOP_REQUEST });
      try {
        const res = await axios.get('/api/products');
        let products = res.data.products
          .sort((productA, productB) => {
            const { rating: ratingA } = productA;
            const { rating: ratingB } = productB;
            return ratingA < ratingB ? 1 : ratingA > ratingB ? -1 : 0;
          })
          .slice(0, 3);
        dispatch({ type: PRODUCT_TOP_SUCCESS, payload: products });
      } catch (e) {
        dispatch({ type: PRODUCT_TOP_FAIL, payload: e.message });
      }
    })();
  }, [dispatch]);

  return topProducts;
};

//get featured products(latest/discounted)
export const useGetFeaturedProducts = () => {
  const { featuredProducts, setFeaturedProducts: dispatch } = useProducts();

  useEffect(() => {
    (async () => {
      dispatch({ type: PRODUCT_FEATURED_REQUEST });
      try {
        const res = await axios.get('/api/products');
        let products = res.data.products;
        dispatch({ type: PRODUCT_FEATURED_SUCCESS, payload: products });
      } catch (e) {
        dispatch({ type: PRODUCT_FEATURED_FAIL, payload: e.message });
      }
    })();
  }, [dispatch]);

  return featuredProducts;
};
