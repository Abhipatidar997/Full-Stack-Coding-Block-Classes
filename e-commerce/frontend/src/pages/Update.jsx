import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Update = () => {
    const [title, settitle] = useState('')
    const [image, setimage] = useState('')
    const [description, setdescription] = useState('')
    const [price, setprice] = useState('')
    const [category, setcategory] = useState('')

    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const params = useParams()
    const productId = params.productId

    useEffect(() => {
        getProductData(productId)
    }, [])

    const getProductData = (productId) => {
        axios.get(`http://localhost:4000/products/details/${productId}`, {
            headers: {
                authorization: `bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data.product);
            const productData = res?.data?.product

            settitle(productData.title)
            setprice(productData.price)
            setdescription(productData.description)
            setcategory(productData.category)
            setimage(productData.image)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(category);

        axios.patch(`http://localhost:4000/products/update/${productId}`, {
            title,
            image,
            description,
            price,
            category
        }, {
            headers: {
                Authorization: `bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res);
            navigate("/")
        })
        .catch((err) => {
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
                <h1 className='text-center text-3xl font-bold mb-8 text-gray-800'>Update Product</h1>

                <div className='mb-6'>
                    <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-2'>Title:</label>
                    <input 
                        type="text" 
                        name="title" 
                        id="title"
                        className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        placeholder='Enter product title'
                        value={title}
                        onChange={(e) => settitle(e.target.value)}
                    />
                </div>

                <div className='mb-6'>
                    <label htmlFor="image" className='block text-sm font-medium text-gray-700 mb-2'>Image URL:</label>
                    <input 
                        type="text" 
                        name="image" 
                        id="image"
                        className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        placeholder='Enter image URL'
                        value={image}
                        onChange={(e) => setimage(e.target.value)}
                    />
                </div>

                <div className='mb-6'>
                    <label htmlFor="description" className='block text-sm font-medium text-gray-700 mb-2'>Description:</label>
                    <input 
                        type="text" 
                        name="description" 
                        id="description"
                        className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        placeholder='Enter product description'
                        value={description}
                        onChange={(e) => setdescription(e.target.value)}
                    />
                </div>

                <div className='mb-6'>
                    <label htmlFor="price" className='block text-sm font-medium text-gray-700 mb-2'>Price:</label>
                    <input 
                        type="number" 
                        name="price" 
                        id="price"
                        className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        placeholder='Enter product price'
                        value={price}
                        onChange={(e) => setprice(e.target.value)}
                    />
                </div>

                <div className='mb-6'>
                    <label htmlFor="category" className='block text-sm font-medium text-gray-700 mb-2'>Category:</label>
                    <input 
                        type="text" 
                        name="category" 
                        id="category"
                        className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        placeholder='Enter product category'
                        value={category}
                        onChange={(e) => setcategory(e.target.value)}
                    />
                </div>

                <div className='flex justify-center'>
                    <button 
                        type="submit"
                        className='w-full max-w-xs text-center border border-transparent bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl shadow-md transition-colors duration-200 font-medium'
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Update
