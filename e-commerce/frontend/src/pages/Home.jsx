import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const Home = () => {
    const navigate = useNavigate()
    const [productData, setproductData] = useState([])
    
    useEffect(() => {
        getData()
    }, [])
    
    function getData() {
        axios.get("http://localhost:4000/")
        .then((res)=>{
            console.log(res.data.products);
            setproductData(res.data.products)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const productDetailHandle = (productId)=>{
        navigate(`/products/detail/${productId}`)
    }

    const editHandle = (productId) => {
        navigate(`/products/edit/${productId}`)
    }

    const deleteHandle = (productId) => {
        // Add your delete logic here, e.g., API call
        console.log(`Delete product ${productId}`)
        // Optionally refresh data after delete
        getData()
    }

    return (
        <div className='h-full w-full flex gap-5 px-6 py-7 flex-wrap justify-center'>
            {
                productData?.map((product, index)=>{
                    return (
                        <div key={product._id || index} className='product h-[450px] w-[350px] shadow-2xl rounded-2xl overflow-hidden bg-white hover:shadow-3xl transition-shadow duration-300'>
                            <div 
                                className="top h-[50%] flex justify-center items-center cursor-pointer bg-gray-100"
                                onClick={()=>{
                                    productDetailHandle(product._id)
                                }}
                            >
                                <img src={product.image} alt={product.title} className='h-full w-auto max-w-full object-contain p-2' />
                            </div>
                            <div className="bottom p-5 flex flex-col justify-between h-[50%]">
                                <div>
                                    <p className='text-gray-600 text-sm mb-2'>{product.category}</p>
                                    <h1 className='font-semibold text-2xl mb-2 text-gray-800'>{product.title}</h1>
                                    <h1 className='font-semibold text-xl text-green-600 mb-4'>Price: ₹{product.price}</h1>
                                </div>
                                <div className='flex justify-between mt-3'>
                                    <button 
                                        className='bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-2 shadow-md shadow-blue-300 transition-colors duration-200 font-medium'
                                        onClick={()=>{
                                            editHandle(product._id)
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className='bg-red-500 hover:bg-red-600 text-white rounded-xl px-4 py-2 shadow-md shadow-red-300 transition-colors duration-200 font-medium'
                                        onClick={()=>{
                                            deleteHandle(product._id)
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home
