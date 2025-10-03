import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const CreateProduct = () => {


    const [title, settitle] = useState('')
    const [image, setimage] = useState('')
    const [description, setdescription] = useState('')
    const [price, setprice] = useState('')
    const [category, setcategory] = useState('')

    const token = localStorage.getItem("token")


    const navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:4000/products/create", {
            title,
            image,
            description,
            price,
            category
        },{
            headers :{
                Authorization : `bearer ${token}`
            }
        })
        .then((res)=>{
            console.log(res);
            navigate("/")
            
            
        })
        .catch((err)=>{
            console.log(err);
            
        })

    }


  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <form action="" method="post" className='border border-black p-10 rounded-2xl'
        onSubmit={handleSubmit}
      >
        <h1 className='text-center'>Create Product</h1>
        <br />

        <label htmlFor="title">Title :</label>
        <input type="text" name="title" id="title"
        className='border border-black rounded px-2 py-1 ml-3 w-[80%]'
        placeholder='enter product title'
        value={title}
        onChange={(e)=>{
            settitle(e.target.value)
        }}
        />

        <br />
        <br />

        <label htmlFor="image">Image :</label>
        <input type="text" name="iamge" id="image"
        className='border border-black rounded px-2 py-1 ml-3'
        value={image}
        onChange={(e)=>{
            setimage(e.target.value)
        }}

        />

        <br />
        <br />

        <label htmlFor="description">Description :</label>
        <input type="text" name="description" id="description"
        className='border border-black rounded px-2 py-1 ml-3'
        value={description}
        onChange={(e)=>{
            setdescription(e.target.value)
        }}
        
        />

        <br />
        <br />
        <label htmlFor="price">Price :</label>
        <input type="number" name="price" id="price"
        className='border border-black rounded px-2 py-1 ml-3'
        value={price}
        onChange={(e)=>{
            setprice(e.target.value)
        }}
        
        />

        <br />
        <br />
        <label htmlFor="category">Category :</label>
        <input type="text" name="category" id="category"
        className='border border-black rounded px-2 py-1 ml-3'
       value={category}
        onChange={(e)=>{
            setcategory(e.target.value)
        }}
        
        />

        <br />
        <br />

        <div className='flex justify-center'>
            <button 
            className='text-center border border-black bg-blue-500 text-white py-1 px-3 rounded-2xl'>Post</button>
        
            </div>
        <br />
      </form>
    </div>
  )
}

export default CreateProduct
