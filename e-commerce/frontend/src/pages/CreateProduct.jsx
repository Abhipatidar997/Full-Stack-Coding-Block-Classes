import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const [title, setTitle] = useState('');  // CamelCase
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');  // New: Error messages
    const [loading, setLoading] = useState(false);  // New: Loading state

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");  // Clear previous errors
        setLoading(true);  // Start loading

        // Basic client-side validation
        if (!title || !image || !description || !price || !category) {
            setError("Please fill all fields.");
            setLoading(false);
            return;
        }
        if (parseFloat(price) <= 0) {
            setError("Price must be greater than 0.");
            setLoading(false);
            return;
        }
        if (!token) {
            setError("Please login first.");
            setLoading(false);
            navigate("/login");  // Redirect to login if no token
            return;
        }

        console.log(title, image, description, price, category);  // Remove in production

        axios
            .post("http://localhost:4000/products/create", {
                title,
                image,
                description,
                price: parseFloat(price),  // Ensure number type
                category
            }, {
                headers: {
                    Authorization: `Bearer ${token}`  // Capital B common
                }
            })
            .then((res) => {
                console.log(res);  // Remove in production
                // Clear form on success
                setTitle('');
                setImage('');
                setDescription('');
                setPrice('');
                setCategory('');
                navigate("/");
            })
            .catch((err) => {
                console.log(err.response?.data);  // Better logging
                setError(err.response?.data?.message || "Failed to create product. Please try again.");  // User-friendly
            })
            .finally(() => {
                setLoading(false);  // Always stop loading
            });
    };

    return (
        <div className='min-h-screen w-full flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
            <form 
                onSubmit={handleSubmit} 
                className='w-full max-w-md bg-white border border-gray-300 p-8 rounded-2xl shadow-lg'
            >
                <h1 className='text-center text-3xl font-bold mb-8 text-gray-800'>Create Product</h1>

                {/* Error Display */}
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
                        disabled={loading}
                        required
                        minLength="3"
                    />
                </div>

                <div className='mb-6'>
                    <label htmlFor="image" className='block text-sm font-medium text-gray-700 mb-2'>Image URL:</label>
                    <input
                        type="url"  // Better for URLs
                        name="image"
                        id="image"
                        className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        placeholder='Enter image URL (e.g., https://example.com/image.jpg)'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        disabled={loading}
                        required
                    />
                </div>

                <div className='mb-6'>
                    <label htmlFor="description" className='block text-sm font-medium text-gray-700 mb-2'>Description:</label>
                    <textarea  // Changed to textarea for multi-line
                        name="description"
                        id="description"
                        className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        placeholder='Enter product description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={loading}
                        required
                        rows="3"  // Height
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
                        disabled={loading}
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
                        disabled={loading}
                        required
                        minLength="2"
                    />
                </div>

                <div className='flex justify-center'>
                    <button
                        type="submit"
                        disabled={loading}
                        className='w-full max-w-xs text-center border border-transparent bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-xl shadow-md transition-colors duration-200 font-medium'
                    >
                        {loading ? "Creating..." : "Post"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;
