import React from "react";

const Button = ({ name, handlefunction, productId }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-2 shadow-md shadow-blue-400 transition-colors duration-200 font-medium"
      onClick={() => {
        handlefunction(productId);
      }}
    >
      {name}
    </button>
  );
};

export default Button;
