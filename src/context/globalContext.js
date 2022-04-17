import { createContext } from 'react';
import CategoryProvider from './categoryContext';
import MessageProvider from './messageContext';
import ProductsProvider from './productsContext';
import AuthProvider from './authContext';

const initialilState = {};
const GlobalContext = createContext(initialilState);

const GlobalProvider = ({ children }) => {
  return (
    <GlobalContext.Provider value={initialilState}>
      <MessageProvider>
        <AuthProvider>
          <CategoryProvider>
            <ProductsProvider>{children}</ProductsProvider>
          </CategoryProvider>
        </AuthProvider>
      </MessageProvider>
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
