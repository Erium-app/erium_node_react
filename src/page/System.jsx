import React, { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
import Info from './System/Info'
import AutoUpdate from './System/AutoUpdate'
import Profile from './System/Profile'
import Power from './System/Power'
import Notification from './System/Notification'
import Network from './System/Network'
import Updates from './System/Updates'
import Peer from './System/Peer'
import Advance from './System/Advance'
import Security from './System/Security'
import Hardware from './System/Hardware'

const System = () => {
    // const router = useRouter()
    const[active, setActive] = useState('Info')

    
  return (
    
        <div className="w-full p-10 text-gray-800 ">
          <h1 className="w-full text-3xl font-medium">System</h1>

          <div className="flex flex-row justify-center gap-4 text-black text-center">
            <button
              className={`m-2 align-middle text-lg  ${
                active === "Info"
                  ? "border-b-4 font-semibold border-blue-400"
                  : ""
              }`}
              onClick={() => setActive("Info")}
            >
              {" "}
              Info
            </button>
            <button
              className={`m-2 align-middle text-lg  ${
                active === "AutoUpdate"
                  ? "border-b-4 font-semibold border-blue-400"
                  : ""
              }`}
              onClick={() => setActive("AutoUpdate")}
            >
              {" "}
              Auto Update
            </button>
            <button
              className={`m-2 align-middle text-lg  ${
                active === "Profile"
                  ? "border-b-4 font-semibold border-blue-400"
                  : ""
              }`}
              onClick={() => setActive("Profile")}
            >
              {" "}
              Profile
            </button>
            <button
              className={`m-2 align-middle text-lg  ${
                active === "Power"
                  ? "border-b-4 font-semibold border-blue-400"
                  : ""
              }`}
              onClick={() => setActive("Power")}
            >
              Power
            </button>
            <button
              className={`m-2 align-middle text-lg  ${
                active === "Notification"
                  ? "border-b-4 font-semibold border-blue-400"
                  : ""
              }`}
              onClick={() => setActive("Notification")}
            >
              Notification
            </button>
            <button
              className={`m-2 align-middle text-lg  ${
                active === "Network"
                  ? "border-b-4 font-semibold border-blue-400"
                  : ""
              }`}
              onClick={() => setActive("Network")}
            >
              Network
            </button>
            <button
              className={`m-2 align-middle text-lg  ${
                active === "Updates"
                  ? "border-b-4 font-semibold border-blue-400"
                  : ""
              }`}
              onClick={() => setActive("Updates")}
            >
              Updates
            </button>
            <button
              className={`m-2 align-middle text-lg  ${
                active === "Peer"
                  ? "border-b-4 font-semibold border-blue-400"
                  : ""
              }`}
              onClick={() => setActive("Peer")}
            >
              Peer
            </button>
            <button
              className={`m-2 align-middle text-lg  ${
                active === "Security"
                  ? "border-b-4 font-semibold border-blue-400"
                  : ""
              }`}
              onClick={() => setActive("Security")}
            >
              Security
            </button>
            <button
              className={`m-2 align-middle text-lg  ${
                active === "Hardware"
                  ? "border-b-4 font-semibold border-blue-400"
                  : ""
              }`}
              onClick={() => setActive("Hardware")}
            >
              Hardware
            </button>
            <button
              className={`m-2 align-middle text-lg  ${
                active === "Advance"
                  ? "border-b-4 font-semibold border-blue-400"
                  : ""
              }`}
              onClick={() => setActive("Advance")}
            >
              Advance
            </button>
          </div>
          <div className='mt-5 h-[75vh] overflow-auto scrollbar-none'>
                      {
                      active === 'Info'?
                        <Info/>:
                        active === 'AutoUpdate'?
                        <AutoUpdate/>:
                        active === 'Profile'?
                        <Profile/>:
                        active === 'Power'?
                        <Power/>:
                        active === 'Notification'?
                        <Notification/>:
                        active === 'Network'?
                        <Network/>:
                        active === 'Updates'?
                        <Updates/>:
                        active === 'Peer'?
                        <Peer/>:
                        active === 'Security'?
                        <Security/>:
                        active === 'Hardware'?
                        <Hardware/>:
                        active === 'Advance'?
                        <Advance/>:
                        ''
                        }
                    </div>

        </div>

  );
}

export default System