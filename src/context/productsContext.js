import { createContext, useReducer, useContext } from 'react';
import {
  initialState,
  featuredProductsReducer,
  topProductsReducer,
  productListReducer,
} from '../reducers/productReducer';
import { filterProducts } from '../utils/filter';

const ProductsContext = createContext(initialState);

const ProductsProvider = ({ children }) => {
  const [topProductsState, setTopProducts] = useReducer(
    topProductsReducer,
    initialState.topProducts
  );
  const [featuredProductsState, setFeaturedProducts] = useReducer(
    featuredProductsReducer,
    initialState.featuredProducts
  );

  const [productListState, setProductList] = useReducer(
    productListReducer,
    initialState.productList
  );

  const { products, filters } = productListState;
  const filteredProducts = filterProducts(products, filters);

  return (
    <ProductsContext.Provider
      value={{
        topProductsState,
        featuredProductsState,
        productListState,
        filteredProducts,
        setFeaturedProducts,
        setTopProducts,
        setProductList,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);

export default ProductsProvider;
