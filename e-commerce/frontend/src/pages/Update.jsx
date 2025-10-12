import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const { productId } = useParams();  // Destructure for cleaner code
    const [title, setTitle] = useState('');  // CamelCase
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);  // New: For fetch
    const [updateLoading, setUpdateLoading] = useState(false);  // New: For update
    const [error, setError] = useState('');  // New: Error state

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            setError("Please login to update product.");
            setLoading(false);
            navigate("/login");
            return;
        }
        getProductData(productId);
    }, [productId, token, navigate]);  // Added dependencies

    const getProductData = (id) => {
        setLoading(true);
        setError("");  // Clear previous errors

        axios
            .get(`http://localhost:4000/products/details/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`  // Standardized
                }
            })
            .then((res) => {
                console.log(res.data.product);  // Remove in production
                const productData = res?.data?.product;
                if (productData) {
                    setTitle(productData.title || '');
                    setImage(productData.image || '');
                    setDescription(productData.description || '');
                    setPrice(productData.price || '');
                    setCategory(productData.category || '');
                } else {
                    setError("Product not found.");
                }
            })
            .catch((err) => {
                console.log(err.response?.data);  // Better logging
                const message = err.response?.status === 404 
                    ? "Product not found." 
                    : err.response?.data?.message || "Failed to fetch product data.";
                setError(message);
                if (err.response?.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");  // Clear errors
        setUpdateLoading(true);

        // Basic client-side validation
        if (!title || !image || !description || !price || !category) {
            setError("Please fill all fields.");
            setUpdateLoading(false);
            return;
        }
        if (parseFloat(price) <= 0) {
            setError("Price must be greater than 0.");
            setUpdateLoading(false);
            return;
        }
        if (!token) {
            setError("Please login first.");
            setUpdateLoading(false);
            navigate("/login");
            return;
        }

        console.log(category);  // Remove in production

        axios
            .patch(`http://localhost:4000/products/update/${productId}`, {
                title,
                image,
                description,
                price: parseFloat(price),  // Ensure number
                category
            }, {
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
                setError(err.response?.data?.message || "Failed to update product. Please try again.");
            })
            .finally(() => {
                setUpdateLoading(false);
            });
    };

    // Loading Spinner
    if (loading) {
        return (
            <div className='min-h-screen flex justify-center items-center bg-gray-50'>
                <div className='text-lg text-gray-600'>Loading product data...</div>
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

    return (
        <div className='min-h-screen w-full flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
            <form 
                onSubmit={handleSubmit} 
                className='w-full max-w-md bg-white border border-gray-300 p-8 rounded-2xl shadow-lg'
            >
                <h1 className='text-center text-3xl font-bold mb-8 text-gray-800'>Update Product</h1>

                {/* Error Display for Update */}
                {error && (
                    <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg'>
                        {error}
                    </div>
                )}

                <div className='mb-6'>
                    <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-2'>Title:</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        placeholder='Enter product title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={updateLoading}
                        required
                        minLength="3"
                    />
                </div>

                <div className='mb-6'>
                    <label htmlFor="image" className='block text-sm font-medium text-gray-700 mb-2'>Image URL:</label>
                    <input
                        type="url"
                        name="image"
                        id="image"
                        className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        placeholder='Enter image URL (e.g., https://example.com/image.jpg)'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        disabled={updateLoading}
                        required
                    />
                </div>

                <div className='mb-6'>
                    <label htmlFor="description" className='block text-sm font-medium text-gray-700 mb-2'>Description:</label>
                    <textarea  // Changed to textarea
                        name="description"
                        id="description"
                        className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        placeholder='Enter product description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={updateLoading}
                        required
                        rows="3"
                        minLength="10"
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
                        onChange={(e) => setPrice(e.target.value)}
                        disabled={updateLoading}
                        required
                        min="0.01"
                        step="0.01"
                    />
                </div>

                <div className='mb-6'>
                    <label htmlFor="category" className='block text-sm font-medium text-gray-700 mb-2'>Category:</label>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        placeholder='Enter product category (e.g., electronics)'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        disabled={updateLoading}
                        required
                        minLength="2"
                    />
                </div>

                <div className='flex justify-center'>
                    <button
                        type="submit"
                        disabled={updateLoading}
                        className='w-full max-w-xs text-center border border-transparent bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-xl shadow-md transition-colors duration-200 font-medium'
                    >
                        {updateLoading ? "Updating..." : "Update"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Update;
