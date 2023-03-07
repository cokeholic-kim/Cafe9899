import Footer from './components/Footer';
import Globalstyle from './components/Globalstyle';
import Header from './components/Header';
import Mainpage from './main/Main';
import { Route, Routes } from 'react-router-dom';
import MenuPage from './page/MenuPage';
import About from './page/About';
import Catering from './page/Catering';
import Reservation from './page/Reservation';
import Login from './loginmodule/Login';
import Join from './loginmodule/Join';
import FindPass from './loginmodule/Findpass';
import UpdatePass from './loginmodule/updatePass';
import MenuManagement from './page/MenuManagement';
function App() {
  return (
    <>
      <Globalstyle/>
        <Routes>
          <Route path='/' element={<><Header/><Mainpage/><Footer/></>}/>
          <Route path='/Menu' element={<><Header/><MenuPage/><Footer/></>}/>
          <Route path='/About' element={<><Header/><About/><Footer/></>}/>
          <Route path='/Catering' element={<><Header/><Catering/><Footer/></>}/>
          <Route path='/Reservation' element={<><Header/><Reservation/><Footer/></>}/>
          <Route path='/MenuManage' element={<><Header/><MenuManagement/><Footer/></>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Join' element={<Join/>}/>
          <Route path='/findPass' element={<FindPass/>}/>
          <Route path='/updatePass' element={<UpdatePass/>}/>

        </Routes>
    </>
  );
}

export default App;
