import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';

const ProductDetail = () => {
    const { productId } = useParams();  // Destructure for cleaner code
    const navigate = useNavigate();

    const [productDetail, setProductDetail] = useState({});  // CamelCase
    const [loading, setLoading] = useState(true);  // New: Loading state
    const [error, setError] = useState('');  // New: Error state
    const [deleteLoading, setDeleteLoading] = useState(false);  // New: For delete action

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            setError("Please login to view product details.");
            setLoading(false);
            navigate("/login");
            return;
        }
        getProductDetail(productId);
    }, [productId, token, navigate]);  // Added dependencies for refetch if needed

    const getProductDetail = (id) => {
        setLoading(true);
        setError("");  // Clear previous errors

        axios
            .get(`http://localhost:4000/products/details/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`  // Capital B common
                }
            })
            .then((res) => {
                console.log(res.data.product);  // Remove in production
                setProductDetail(res.data.product || {});
            })
            .catch((err) => {
                console.log(err.response?.data);  // Better logging
                const message = err.response?.status === 404 
                    ? "Product not found." 
                    : err.response?.data?.message || "Failed to fetch product details.";
                setError(message);
                if (err.response?.status === 401) {
                    localStorage.removeItem("token");  // Clear invalid token
                    navigate("/login");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const deleteHandle = (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;  // Confirmation
        }

        setDeleteLoading(true);
        setError("");  // Clear errors

        axios
            .delete(`http://localhost:4000/products/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                console.log(res);  // Remove in production
                navigate("/");
            })
            .catch((err) => {
                console.log(err.response?.data);
                setError(err.response?.data?.message || "Failed to delete product.");
            })
            .finally(() => {
                setDeleteLoading(false);
            });
    };

    const editHandle = (id) => {
        navigate(`/products/update/${id}`);
    };

    // Loading Spinner (simple Tailwind)
    if (loading) {
        return (
            <div className='min-h-screen flex justify-center items-center bg-gray-50'>
                <div className='text-lg text-gray-600'>Loading product details...</div>
            </div>
        );
    }

    // Error Display
    if (error) {
        return (
            <div className='min-h-screen flex justify-center items-center bg-gray-50'>
                <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
                    <div className='text-red-600 text-center mb-4'>{error}</div>
                    <button
                        onClick={() => navigate("/")}
                        className='w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600'
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Empty Product Check
    if (!productDetail._id) {  // Assuming _id is present if product exists
        return (
            <div className='min-h-screen flex justify-center items-center bg-gray-50'>
                <div className='text-gray-600 text-lg'>Product not available.</div>
            </div>
        );
    }

    return (
        <div className='min-h-screen w-full flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='w-full max-w-4xl bg-white border border-gray-300 rounded-2xl shadow-lg flex flex-col lg:flex-row overflow-hidden'>
                <div className="left h-96 lg:h-auto lg:w-1/2 flex justify-center items-center bg-gray-100">
                    <img
                        src={productDetail.image}
                        alt={productDetail.title || 'Product Image'}
                        className='max-w-full max-h-full object-contain p-4'
                        onError={(e) => {  // Fallback for broken image
                            e.target.src = '/placeholder-image.jpg';  // Or a default URL
                            e.target.alt = 'Image not available';
                        }}
                    />
                </div>
                <div className="right w-full lg:w-1/2 p-6 lg:p-10 flex flex-col justify-between">
                    <div className="top flex flex-col gap-4 mb-8">
                        <h1 className='font-semibold text-3xl text-gray-800'>{productDetail.title}</h1>
                        <p className='text-gray-600 text-lg leading-relaxed'>{productDetail.description}</p>
                        <h2 className='font-semibold text-2xl text-green-600'>
                            Price: ₹{parseFloat(productDetail.price || 0).toFixed(2)}
                        </h2>
                        {productDetail.category && (
                            <p className='text-gray-500'>Category: {productDetail.category}</p>
                        )}
                    </div>

                    <div className='flex justify-between mt-auto gap-4'>
                        <Button
                            name={deleteLoading ? "Deleting..." : "Delete"}
                            handlefunction={deleteHandle}
                            productId={productId}
                            disabled={deleteLoading}  // Assuming Button supports disabled
                        />
                        <Button
                            name="Edit"
                            handlefunction={editHandle}
                            productId={productId}
                        />
                    </div>
                </div>
            </div>
            {/* Removed extra empty div */}
        </div>
    );
};

export default ProductDetail;
