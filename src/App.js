import Footer from './components/Footer';
import Globalstyle from './components/Globalstyle';
import Header from './components/Header';
import Mainpage from './main/Main';
import { Route, Routes } from 'react-router-dom';
import MenuPage from './page/MenuPage';
import About from './page/About';
import Catering from './page/Catering';
import Reservation from './page/Reservation';

function App() {
  return (
    <>
      <Globalstyle/>
      <Header/>
        <Routes>
          <Route path='/' element={<Mainpage/>}/>
          <Route path='/Menu' element={<MenuPage/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/Catering' element={<Catering/>}/>
          <Route path='/Reservation' element={<Reservation/>}/>
        </Routes>
      <Footer/>
    </>
  );
}

export default App;
