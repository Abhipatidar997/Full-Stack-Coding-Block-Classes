import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
const Home = () => {
 
    const [productData, setproductData] = useState([])
    
     useEffect(() => {
       getData()
     }, [])
     
     const navigate = useNavigate()
    


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

  return (
    <div className=' h-full w-full flex gap-5 px-15 py-7 flex-wrap'>
        {
            productData?.map((product , index)=>{
                return <div key={index} className='product h-[450px] w-[350px] shadow-2xl rounded-2xl overflow-hidden  '>
                    <div className="top h-[50%] flex justify-center"
                    onClick={()=>{
                        productDetailHandle(product._id)
                    }}
                    >
                        <img src={product.image} alt="" className='h-full w-auto' />
                    </div>
                    <div className="bottom p-5">
                        <p>{product.category}</p>
                        <h1 className='font-semibold text-2xl'>{product.title }</h1>
                        <h1 className='font-semibold text-xl'>Price : ₹{product.price }</h1>
                        <div className='flex justify-between mt-3'>
                            <button className='bg-blue-400 rounded-xl px-3 py-2 shadow-md shadow-blue-300 '
                            onClick={()=>{
                                editHandle(product._id)
                            }}
                            >Edit</button>
                            <button className='bg-green-300 rounded-xl px-3 py-2 shadow-md shadow-green-300'>Delete</button>
                        </div>
                    </div>
                </div>

            })
        }
    </div>
  )
}

export default Home
