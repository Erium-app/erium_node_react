import React from 'react'
import { Routes,Route } from 'react-router-dom';
import Dashboard from '../page/Dashboard';
import Navbar from './Navbar';

const Profile = () => {
  return (
    <>
    <div className="w-screen max-h-screen flex justify-start items-start">
      <Navbar/>
        <Routes>
            <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
    </div>
    </>
  )
}

export default Profile
