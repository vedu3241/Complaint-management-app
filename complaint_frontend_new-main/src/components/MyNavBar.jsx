import { useState } from "react";

const Nav = ({handleLogout} ) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className="sticky top-0 w-full flex justify-between bg-teal-500 items-center p-5 rounded-lg z-50">
      <h1 className="font-extrabold text-2xl text-white ml-5">Complaint System</h1>
      <button
        className={`font-bold p-2 text-lg rounded-xl border-2 border-cyan-400 transition-all cursor-pointer mr-5 outline-none ${isHovered ? 'bg-gray-200' : 'bg-white'} text-teal-500`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
};

export default Nav;

