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
            <Route
              path='/wishlist'
              element={
                <AuthRequired>
                  <Wishlist />
                </AuthRequired>
              }
            />
            <Route
              path='/cart'
              element={
                <AuthRequired>
                  <Cart />
                </AuthRequired>
              }
            />
            <Route
              path='/account'
              element={
                <AuthRequired>
                  <Account />
                </AuthRequired>
              }
            />
          </Routes>
        </div>
        <Footer />
      </GlobalProvider>
    </div>
  );
}

export default App;
