import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const handleLogout = () => {
      localStorage.removeItem("token")
      navigate("/login")
    }

  return (
    <nav className='h-16 w-full bg-white shadow-lg flex justify-between items-center px-6 sm:px-10 lg:px-16 sticky top-0 z-50'>
        {/* Logo Section */}
        <div 
          className='flex items-center cursor-pointer select-none'
          onClick={() => navigate('/')}
        >
          <div className='bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 shadow-md'>
            <span className='font-bold text-lg'>S</span>
          </div>
          <h2 className='font-extrabold text-2xl text-gray-900 tracking-wide'>Shoppy</h2>
        </div>

        {/* Search Bar */}
        <div className="relative w-1/2 max-w-lg hidden md:flex items-center">
            <input 
                type="text" 
                className='w-full rounded-full border border-gray-300 bg-gray-100 py-2 pl-12 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                placeholder='Search products...'
            />
            <svg 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
        </div>

        {/* Buttons */}
        <div className='flex items-center gap-4 sm:gap-6'>
          {token && (
            <button
              onClick={() => navigate("/create")}
              className='bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-full shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-emerald-300'
              aria-label="Create Product"
            >
              Create Product
            </button>
          )}

          {token ? (
            <button 
              onClick={handleLogout}
              className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-full shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300'
              aria-label="Logout"
            >
              Logout
            </button>
          ) : (
            <button 
              onClick={() => navigate("/login")}
              className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-full shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300'
              aria-label="Login"
            >
              Login
            </button>
          )}
        </div>
    </nav>
  )
}

export default Navbar
