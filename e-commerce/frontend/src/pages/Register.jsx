import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
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
    <div className='h-screen w-full flex justify-center items-center'>

      <form method="post"
       onSubmit={handleSubmit}
      className='border border-black p-10 rounded-2xl'>

        <h1 className='font-bold text-center text-2xl mb-6'>Register Page</h1>

        <label htmlFor="username">Username :</label>
        <input type="text" name="username" id="username"
        className='border border-black rounded px-2 py-1 ml-3'
        placeholder='enter your username'
        value={username}
        onChange={(e)=>{
            setusername(e.target.value);
            
        }}
        />

        <br />
        <br />

        <label htmlFor="email">Email :</label>
        <input type="text" name="email" id="email"
        className='border border-black rounded px-2 py-1 ml-3 w-[80%]'
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
            className='text-center border border-black bg-blue-500 text-white py-1 px-3 rounded-2xl'>register</button>
        
            </div>
        <br />
        <p>if you have an account? <a href="/login">Sign-in</a></p>
      </form> 
    </div>
  )
}

export default Register
