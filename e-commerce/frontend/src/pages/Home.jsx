import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Home = () => {
    const navigate = useNavigate();
    const [productData, setProductData] = useState([]);  // CamelCase
    const [loading, setLoading] = useState(true);  // New: Loading state
    const [error, setError] = useState('');  // New: Error state
    const [deleteLoading, setDeleteLoading] = useState({});  // New: Per-product delete loading

    useEffect(() => {
        getData();
    }, []);  // Empty dep fine; add [token] if token changes trigger refetch

    const getData = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        setLoading(true);
        setError("");  // Clear previous errors

        axios
            .get("http://localhost:4000/", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                console.log(res.data.products);  // Remove in production
                setProductData(res.data.products || []);
            })
            .catch((err) => {
                console.log(err.response?.data);  // Better logging
                if (err.response?.status === 401) {
                    localStorage.removeItem("token");  // Clear invalid token
                    navigate("/login");
                } else {
                    setError(err.response?.data?.message || "Failed to fetch products. Please try again.");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const productDetailHandle = (productId) => {
        navigate(`/products/detail/${productId}`);
    };

    const editHandle = (productId) => {
        navigate(`/products/update/${productId}`);  // Fixed to match Update component
    };

    const deleteHandle = (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;  // Confirmation
        }

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        setDeleteLoading((prev) => ({ ...prev, [productId]: true }));  // Start loading for this product
        setError("");  // Clear errors

        axios
            .delete(`http://localhost:4000/products/delete/${productId}`, {  // Assuming endpoint
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                console.log(res);  // Remove in production
                // Optimistic update: Remove from state
                setProductData((prev) => prev.filter((product) => product._id !== productId));
                // Optional: Full refresh if needed
                // getData();
            })
            .catch((err) => {
                console.log(err.response?.data);
                setError(err.response?.data?.message || "Failed to delete product.");
                if (err.response?.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            })
            .finally(() => {
                setDeleteLoading((prev) => ({ ...prev, [productId]: false }));
            });
    };

    // Loading Spinner
    if (loading) {
        return (
            <div className='min-h-screen flex justify-center items-center bg-gray-50'>
                <div className='text-lg text-gray-600'>Loading products...</div>
            </div>
        );
    }

    // Error Display
    if (error) {
        return (
            <div className='min-h-screen flex justify-center items-center bg-gray-50'>
                <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center'>
                    <div className='text-red-600 mb-4'>{error}</div>
                    <button
                        onClick={getData}
                        className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600'
                    >
                        Retry
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className='ml-2 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600'
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gray-50 py-7 px-6'>  {/* Added min-h-screen for full coverage */}
            <div className='h-full w-full flex gap-5 flex-wrap justify-center'>
                {productData.length === 0 ? (
                    <div className='text-center text-gray-600 py-12 w-full'>
                        <p className='text-lg'>No products yet. <button onClick={() => navigate("/create")} className='text-blue-500 underline'>Create one!</button></p>
                    </div>
                ) : (
                    productData.map((product) => (
                        <div key={product._id} className='product h-[450px] w-[350px] shadow-2xl rounded-2xl overflow-hidden bg-white hover:shadow-3xl transition-shadow duration-300'>
                            <div 
                                className="top h-[50%] flex justify-center items-center cursor-pointer bg-gray-100"
                                onClick={() => productDetailHandle(product._id)}
                            >
                                <img 
                                    src={product.image} 
                                    alt={product.title} 
                                    className='h-full w-auto max-w-full object-contain p-2'
                                    onError={(e) => {  // Fallback for broken image
                                        e.target.src = '/placeholder-image.jpg';  // Default placeholder
                                    }}
                                />
                            </div>
                            <div className="bottom p-5 flex flex-col justify-between h-[50%]">
                                <div>
                                    {product.category && <p className='text-gray-600 text-sm mb-2'>{product.category}</p>}
                                    <h1 className='font-semibold text-2xl mb-2 text-gray-800'>{product.title}</h1>
                                    <h1 className='font-semibold text-xl text-green-600 mb-4'>
                                        Price: ₹{parseFloat(product.price || 0).toFixed(2)}
                                    </h1>
                                </div>
                                <div className='flex justify-between mt-3'>
                                    <button 
                                        className='bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-2 shadow-md shadow-blue-300 transition-colors duration-200 font-medium disabled:opacity-50'
                                        onClick={() => editHandle(product._id)}
                                        disabled={deleteLoading[product._id]}  // Disable during delete
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className='bg-red-500 hover:bg-red-600 text-white rounded-xl px-4 py-2 shadow-md shadow-red-300 transition-colors duration-200 font-medium disabled:opacity-50'
                                        onClick={() => deleteHandle(product._id)}
                                        disabled={deleteLoading[product._id]}
                                    >
                                        {deleteLoading[product._id] ? "Deleting..." : "Delete"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
