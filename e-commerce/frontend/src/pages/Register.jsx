import React, { useState } from 'react'
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()

    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const handleSubmit = (e)=>{
        e.preventDefault()
       
        axios.post("http://localhost:4000/users/register", {username , email , password})
        .then((res)=>{
          console.log(res.data);
          localStorage.setItem("token",res.data.token)
          navigate("/")
        })
        .catch((err)=>{
          console.log(err);
        })
    }

  return (
    <div className='min-h-screen w-full flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <form 
        method="post"
        onSubmit={handleSubmit}
        className='w-full max-w-md bg-white border border-gray-300 p-8 rounded-2xl shadow-lg'
      >
        <h1 className='font-bold text-center text-3xl mb-8 text-gray-800'>Register Page</h1>

        <div className='mb-6'>
          <label htmlFor="username" className='block text-sm font-medium text-gray-700 mb-2'>Username:</label>
          <input 
            type="text" 
            name="username" 
            id="username"
            className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder='Enter your username'
            value={username}
            onChange={(e)=>{
                setusername(e.target.value);
            }}
          />
        </div>

        <div className='mb-6'>
          <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-2'>Email:</label>
          <input 
            type="email" 
            name="email" 
            id="email"
            className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder='Enter your email'
            value={email}
            onChange={(e)=>{
                setemail(e.target.value);
            }}
          />
        </div>

        <div className='mb-6'>
          <label htmlFor="password" className='block text-sm font-medium text-gray-700 mb-2'>Password:</label>
          <input 
            type="password" 
            name="password" 
            id="password"
            className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder='Enter your password'
            value={password}
            onChange={(e)=>{
                setpassword(e.target.value);
            }}
          />
        </div>

        <div className='flex justify-center mb-6'>
          <button 
            type="submit"
            className='w-full max-w-xs text-center border border-transparent bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl shadow-md transition-colors duration-200 font-medium'
          >
            Register
          </button>
        </div>

        <p className='text-center text-sm text-gray-600'>
          If you have an account? <Link to="/login" className='text-blue-500 hover:text-blue-600 font-medium'>Sign-in</Link>
        </p>
      </form> 
    </div>
  )
}

export default Register
