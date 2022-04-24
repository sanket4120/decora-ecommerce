import { createContext } from 'react';
import CategoryProvider from './categoryContext';
import MessageProvider from './messageContext';
import ProductsProvider from './productsContext';
import UserProvider from './userContext';

const initialilState = {};
const GlobalContext = createContext(initialilState);

const GlobalProvider = ({ children }) => {
  return (
    <GlobalContext.Provider value={initialilState}>
      <MessageProvider>
        <UserProvider>
          <CategoryProvider>
            <ProductsProvider>{children}</ProductsProvider>
          </CategoryProvider>
        </UserProvider>
      </MessageProvider>
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
