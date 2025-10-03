import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
const Login = () => {


    const navigate = useNavigate()

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")


    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log( email , password);
        axios.post("http://localhost:4000/users/login", {email , password})
        .then((res)=>{
            console.log(res);
            localStorage.setItem("token",res.data.token)
            navigate("/")
        })
        .catch((err)=>{
            console.log(err.response.data);
            
        })

        setemail("")
        setpassword("")
    }

  return (
    <div className='h-screen w-full flex justify-center items-center'>

      <form method="post" className='border border-black p-10 rounded-2xl'>

        <h1 className='font-bold text-center text-2xl mb-6'>Login Page</h1>


        <br />

        <label htmlFor="email">Email :</label>
        <input type="text" name="email" id="email"
        className='border border-black rounded px-2 py-1 ml-3'
        placeholder='enter your email'
        value={email}
         onChange={(e)=>{
            setemail(e.target.value);
            
        }}
        />

        <br />
        <br />

        <label htmlFor="password">Password :</label>
        <input type="password" name="password" id="password"
        className='border border-black rounded px-2 py-1 ml-3'
        placeholder='enter your password'
        value={password}
         onChange={(e)=>{
            setpassword(e.target.value);
            
        }}
        />

        <br />
        <br />

        <div className='flex justify-center'>
            <button 
            onClick={handleSubmit}
            className='text-center border border-black bg-blue-500 text-white py-1 px-3 rounded-2xl'>Login</button>
        </div>
        <br />
        <p>if you dont have an account? <a href="/register">Signup</a></p>
      </form>
    </div>
  )
}

export default Login
