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
    <div className='h-screen w-full flex justify-center items-center'>
        <div className='h-[80%] w-[80%] border border-black flex'>
          <div className="left h-full w-[50%]">
            <img src={productDetail.image} alt="" className='w-auto h-full object-contain'/>
          </div>
          <div className="right h-[70%] w-[50%] p-10">
            <div className="top flex flex-col gap-5">
                <h1 className='font-semibold text-3xl'>{productDetail.title}</h1>
                <p>{productDetail.description}</p>
                <h2 className='font-semibold text-xl'>Price : {productDetail.price}</h2>
            </div>
            <br />
            <br />
            <br />
            
            <div className='flex justify-between mt-3'>
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
 