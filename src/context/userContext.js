import { createContext, useContext, useReducer, useEffect } from 'react';
import { getUserCart, getUserWishlist } from '../actions/userActions';
import {
  initialState,
  authReducer,
  wishlistReducer,
  cartReducer,
} from '../reducers/userReducer';
import setAuthToken from '../utils/setAuthToken';

const UserContext = createContext(initialState);

const UserProvider = ({ children }) => {
  const [authState, setAuth] = useReducer(authReducer, initialState.auth);
  const [wishlistState, setWishlist] = useReducer(
    wishlistReducer,
    initialState.wishlist
  );
  const [cartState, setCart] = useReducer(cartReducer, initialState.cart);

  useEffect(() => {
    if (authState.isAuthenticated) {
      getUserWishlist(setWishlist);
      getUserCart(setCart);
    }

    const encodedToken = localStorage.getItem('token');
    setAuthToken(encodedToken);
  }, [authState]);

  return (
    <UserContext.Provider
      value={{
        authState,
        setAuth,
        wishlistState,
        setWishlist,
        cartState,
        setCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
