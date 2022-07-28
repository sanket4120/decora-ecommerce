import { createContext, useContext, useReducer, useEffect } from 'react';
import {
  getOrders,
  getUserAddress,
  getUserCart,
  getUserWishlist,
} from '../actions/userActions';
import {
  initialState,
  authReducer,
  wishlistReducer,
  cartReducer,
  addressReducer,
  orderReducer,
  orderDetailsReducer,
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
  const [addressState, setAddress] = useReducer(
    addressReducer,
    initialState.address
  );
  const [ordersState, setOrders] = useReducer(orderReducer, initialState);
  const [orderDetailsState, setOrderDetails] = useReducer(
    orderDetailsReducer,
    initialState
  );

  useEffect(() => {
    if (authState.isAuthenticated) {
      const encodedToken = localStorage.getItem('token');
      setAuthToken(encodedToken);
      getUserWishlist(setWishlist);
      getUserCart(setCart);
      getUserAddress(setAddress);
      getOrders(setOrders);
    } else {
      localStorage.removeItem('token');
    }
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
        addressState,
        setAddress,
        ordersState,
        setOrders,
        orderDetailsState,
        setOrderDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
