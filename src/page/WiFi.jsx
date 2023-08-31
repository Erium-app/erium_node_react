import React, { useState } from 'react'
import Wifi from './WiFi/Wifi'
import LocalNetwork from './WiFi/LocalNetwork'

const WiFi = () => {
  const[active, setActive] = useState('wifi')
  return (
    <div className="w-full p-10 text-gray-800 ">
      <h1 className="w-full text-3xl font-medium">Wi-Fi</h1>
      
                  <div className='flex flex-row justify-center gap-4 text-black text-center'>
                    <button  className={`m-2 outline-none align-middle text-lg  ${active === 'wifi'? "border-b-4 font-semibold border-blue-400" : "" }`} onClick={()=>setActive('wifi')}> Wi-Fi</button>
                    <button  className={`m-2 outline-none align-middle text-lg  ${active === 'localnetwork'? "border-b-4 font-semibold border-blue-400" : "" }`} onClick={()=>setActive('localnetwork')}>Local Network</button> 
                  </div>
                    <div className=''>
                      {
                      active === 'wifi'?
                        <Wifi/>:
                        <LocalNetwork/>
                        }
                    </div>
          
    </div>
  )
}

export default WiFi