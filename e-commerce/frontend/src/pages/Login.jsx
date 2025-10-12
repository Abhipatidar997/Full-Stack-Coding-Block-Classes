import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");  // CamelCase for consistency
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");  // New: For error messages
    const [loading, setLoading] = useState(false);  // New: Loading state

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");  // Clear previous errors
        setLoading(true);  // Start loading

        console.log(email, password);  // Remove in production

        axios
            .post("http://localhost:4000/users/login", { email, password })
            .then((res) => {
                console.log(res);  // Remove in production
                localStorage.setItem("token", res.data.token);
                setEmail("");  // Clear only on success
                setPassword("");
                navigate("/");
            })
            .catch((err) => {
                console.log(err.response.data);  // Remove in production
                setError(err.response?.data?.message || "Login failed. Please try again.");  // Show error to user
            })
            .finally(() => {
                setLoading(false);  // Stop loading
            });
    };

    return (
        <div className='min-h-screen w-full flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
            <form className='w-full max-w-md bg-white border border-gray-300 p-8 rounded-2xl shadow-lg' onSubmit={handleSubmit}>
                <h1 className='font-bold text-center text-3xl mb-8 text-gray-800'>Login Page</h1>

                {/* Error Display */}
                {error && (
                    <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg'>
                        {error}
                    </div>
                )}

                <div className='mb-6'>
                    <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-2'>Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}  // Disable during loading
                        required  // Basic HTML validation
                    />
                </div>

                <div className='mb-6'>
                    <label htmlFor="password" className='block text-sm font-medium text-gray-700 mb-2'>Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        required
                    />
                </div>

                <div className='flex justify-center mb-6'>
                    <button
                        type="submit"
                        disabled={loading}  // Disable button
                        className='w-full max-w-xs text-center border border-transparent bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-xl shadow-md transition-colors duration-200 font-medium'
                    >
                        {loading ? "Logging in..." : "Login"}  
                    </button>
                </div>

                <p className='text-center text-sm text-gray-600'>
                    If you don&apos;t have an account? <Link to="/register" className='text-blue-500 hover:text-blue-600 font-medium'>Signup</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
