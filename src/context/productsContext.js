import { createContext, useReducer, useContext } from 'react';
import {
  featuredProductsReducer,
  topProductsReducer,
} from '../reducers/productReducer';

const initialState = {
  topProducts: { products: [] },
  featuredProducts: { products: [] },
};

const ProductsContext = createContext(initialState);

const ProductsProvider = ({ children }) => {
  const [topProducts, setTopProducts] = useReducer(
    topProductsReducer,
    initialState.topProducts
  );
  const [featuredProducts, setFeaturedProducts] = useReducer(
    featuredProductsReducer,
    initialState.featuredProducts
  );

  return (
    <ProductsContext.Provider
      value={{
        topProducts,
        featuredProducts,
        setFeaturedProducts,
        setTopProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);

export default ProductsProvider;
