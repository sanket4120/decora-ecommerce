import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Homepage from './pages/Homepage';
import { addLibrary } from './utils/addLibrary';
import './App.css';
import GlobalProvider from './context/globalContext';

function App() {
  return (
    <div className='app'>
      <GlobalProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
        </Routes>
      </GlobalProvider>
      {addLibrary('https://modulo.netlify.app/js/main.js')}
    </div>
  );
}

export default App;
