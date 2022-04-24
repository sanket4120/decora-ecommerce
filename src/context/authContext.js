import { createContext, useContext, useReducer } from 'react';
import { initialState, authReducer } from '../reducers/authReducer';

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
  const [authState, setAuth] = useReducer(authReducer, initialState.auth);

  return (
    <AuthContext.Provider value={{ authState, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);

export default AuthProvider;
