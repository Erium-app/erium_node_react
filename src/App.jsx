import { useState } from 'react'
import { BrowserRouter, Routes,  Route } from "react-router-dom";
import Navbar from './component/Navbar';
import Login from './page/Login';
import Register from './page/Register';
// import Profile from './component/Profile';
import Dashboard from './page/Dashboard';
import {BiUser, BiCube} from 'react-icons/bi'
import {IoMdNotificationsOutline} from 'react-icons/io'
import WiFi from './page/WiFi';
import Vpn from './page/Vpn';
import Packages from './page/Packages';
import Stecker from './page/Stecker';
import Repository from './page/Repository';
import System from './page/System';
import Support from './page/Support';
import Comunity from './page/Comunity';
import { useAuth } from './context/AuthContext';

function App() {
  const [isLogin, setIsLogin] = useState(false)
  const { user } = useAuth();

  return (
    <>
    <BrowserRouter >
    <div className="w-screen max-h-screen flex justify-start items-start">
    { user ? <Navbar/>: ""}
      <Routes>

      <Route index element={<Login/>}/>
      <Route path="login" element={<Login/>} />
      <Route path="register" element={<Register/>} />
      { user ? 
      <Route path="profile">
        <Route path='dashboard' element={<Dashboard/>} />
        <Route path='wi-fi' element={<WiFi/>} />
        <Route path='vpn' element={<Vpn/>} />
        <Route path='package' element={<Packages/>} />
        <Route path='stecker' element={<Stecker/>} />
        <Route path='repository' element={<Repository/>} />
        <Route path='system' element={<System/>} />
        <Route path='comunity' element={<Comunity/>} />
        <Route path='support' element={<Support/>} />
      </Route>
      : 
      ""}

      </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
