import React from "react";

const Button = ({name , handlefunction, productId}) => {
  return (
    <>
      <button className="bg-blue-400 rounded-xl px-3 py-2 shadow-md shadow-blue-300 "
      onClick={()=>{
        handlefunction(productId)
      }}
      >
      {name}
      </button>
     
    </>
  );
};

export default Button;
