import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'

const ProductDetail = () => {
    const params = useParams()
    const navigate = useNavigate()
    const productId = params.productId

    const [productDetail, setproductDetail] = useState({})
    useEffect(() => {
     getProductDetail(productId)
    }, [])
    
    const token = localStorage.getItem("token")

    const getProductDetail =(productId)=>{
        axios.get(`http://localhost:4000/products/details/${productId}`, {
           headers :{
                Authorization : `bearer ${token}`
            }
        })
        .then((res)=>{
          console.log(res.data.product);
          setproductDetail(res.data.product);
        })
        .catch((err)=>{
          console.log(err);
        })
    }

    const deleteHandle = (productId)=>{
       axios.delete(`http://localhost:4000/products/delete/${productId}`,{
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

    const editHandle = (productId)=>{
        navigate(`/products/update/${productId}`)
    }

  return (
    <div className='min-h-screen w-full flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-4xl bg-white border border-gray-300 rounded-2xl shadow-lg flex flex-col lg:flex-row overflow-hidden'>
          <div className="left h-96 lg:h-auto lg:w-1/2 flex justify-center items-center bg-gray-100">
            <img src={productDetail.image} alt={productDetail.title || 'Product Image'} className='max-w-full max-h-full object-contain p-4'/>
          </div>
          <div className="right w-full lg:w-1/2 p-6 lg:p-10 flex flex-col justify-between">
            <div className="top flex flex-col gap-4 mb-8">
                <h1 className='font-semibold text-3xl text-gray-800'>{productDetail.title}</h1>
                <p className='text-gray-600 text-lg leading-relaxed'>{productDetail.description}</p>
                <h2 className='font-semibold text-2xl text-green-600'>Price: ₹{productDetail.price}</h2>
            </div>
            
            <div className='flex justify-between mt-auto'>
                <Button name={"Delete"} handlefunction={deleteHandle} productId={productId}/>
                <Button name={"Edit"} handlefunction={editHandle} productId={productId}/>
            </div>
          </div>
        </div>
         <div>
      
    </div>
    </div>
  )
}

export default ProductDetail
