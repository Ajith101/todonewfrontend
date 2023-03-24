import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-orange-500 text-white text-3xl font-bold font-signature-1 px-4 md:px-10 py-5 md:py-6 w-full">
      <h1 onClick={() => navigate(`/`)}>Todo App</h1>
    </div>
  );
};

export default Header;
