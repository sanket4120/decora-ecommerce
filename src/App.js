import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Homepage from './pages/homepage/Homepage';
import './App.css';
import GlobalProvider from './context/globalContext';
import Shop from './pages/shop/Shop';
import Footer from './components/footer/Footer';
import useAddLibrary from './utils/useAddLibrary';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Messages from './components/messages/Messages';
import Wishlist from './pages/wishlist/Wishlist';
import Cart from './pages/cart/Cart';
import AuthRequired from './components/authRequired/AuthRequired';
import Account from './pages/account/Account';
import Product from './pages/product/Product';
import NotFound from './pages/notFound/NotFound';
import User from './components/user/User';
import AddressManagement from './components/addressManagement/AddressManagement';
import AddressList from './components/addressManagement/addressList/AddressList';
import NewAddress from './components/addressManagement/newAddress/NewAddress';
import Checkout from './pages/checkout/Checkout';
import Orders from './pages/orders/Orders';
import OrderDetails from './pages/orderDetails/OrderDetails';

function App() {
  useAddLibrary('https://modulo.netlify.app/js/main.js');

  return (
    <div className='app'>
      <GlobalProvider>
        <Navbar />
        <div className='container relative'>
          <Messages />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<AuthRequired />}>
              <Route path='wishlist' element={<Wishlist />} />
              <Route path='cart' element={<Cart />} />
              <Route path='checkout' element={<Checkout />} />
              <Route path='account' element={<Account />}>
                <Route index element={<User />} />
                <Route path='orders' element={<Orders />} />

                <Route path='address' element={<AddressManagement />}>
                  <Route index element={<AddressList />} />
                  <Route path='new' element={<NewAddress />} />
                </Route>
              </Route>
            </Route>
            <Route path='/account/orders/:orderId' element={<OrderDetails />} />
            <Route path='/product/:productId' element={<Product />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </GlobalProvider>
    </div>
  );
}

export default App;
