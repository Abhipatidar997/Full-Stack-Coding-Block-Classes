import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateProduct from "./pages/CreateProduct";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Update from "./pages/Update";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-64px)] bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<h1 className="text-center mt-20 text-3xl font-semibold text-gray-700">About</h1>} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/products/detail/:productId" element={<ProductDetail />} />
          <Route path="/products/update/:productId" element={<Update />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
