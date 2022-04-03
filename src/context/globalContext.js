import { createContext } from 'react';
import CategoryProvider from './categoryContext';
import ProductsProvider from './productsContext';

const initialilState = {};
const GlobalContext = createContext(initialilState);

const GlobalProvider = ({ children }) => {
  return (
    <GlobalContext.Provider value={initialilState}>
      <CategoryProvider>
        <ProductsProvider>{children}</ProductsProvider>
      </CategoryProvider>
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
