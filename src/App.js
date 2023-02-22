import './App.css';
import Footer from './components/Footer';
import Globalstyle from './components/Globalstyle';
import Header from './components/Header';
import Mainpage from './main/Main';
import { Route, Routes } from 'react-router-dom';
import MenuPage from './page/MenuPage';

function App() {
  return (
    <>
      <Globalstyle/>
      <Header/>
        <Routes>
          <Route path='/' element={<Mainpage/>}/>
          <Route path='/Menu' element={<MenuPage/>}/>
        </Routes>
      <Footer/>
    </>
  );
}

export default App;
