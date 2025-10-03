import React from 'react'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const handleLogout = ()=>{
      localStorage.removeItem("token")
      navigate("/login")
    }

  return (
    <div className='h-18 w-full bg-red-300 flex justify-between text-center items-center px-5'>
        <h2 className='font-bold text-2xl'>Shoppy</h2>
        <div className="search border border-black px-2 py-1 rounded w-[40%]">
            <input type="text" className='w-[90%] border-none outline-none' 
            
            />
            <i className="ri-search-line"></i>
        </div>
        <div className='flex gap-5'>
          {
            token && <button
        onClick={()=>{navigate("/create")}}
        className='border border-black p-2 rounded-2xl bg-emerald-300 text-white cursor-pointer'>Create Product</button>
          }

        {
          token ? <button 
        onClick={handleLogout}
        className='border border-black p-2 rounded-2xl bg-blue-300 text-white cursor-pointer'>Logout</button> :
          <button 
        onClick={()=>{navigate("/login")}}
        className='border border-black p-2 rounded-2xl bg-blue-300 text-white cursor-pointer'>Login</button>
        }

        </div>
    </div>
  )
}

export default Navbar
