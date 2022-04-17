import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Homepage from './pages/homepage/Homepage';
import './App.css';
import GlobalProvider from './context/globalContext';
import Shop from './pages/shop/Shop';
import Footer from './components/footer/Footer';
import useAddLibrary from './utils/useAddLibrary';

function App() {
  useAddLibrary('https://modulo.netlify.app/js/main.js');

  return (
    <div className='app'>
      <GlobalProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/shop' element={<Shop />} />
        </Routes>
        <Footer />
      </GlobalProvider>
    </div>
  );
}

export default App;
