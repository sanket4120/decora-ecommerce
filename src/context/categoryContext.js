import { createContext, useReducer, useContext } from 'react';
import { categoryReducer } from '../reducers/categoryReducer';

const initialState = { categories: [] };

const CategoryContext = createContext(initialState);

const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState);

  return (
    <CategoryContext.Provider value={{ state, dispatch }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);

export default CategoryProvider;
