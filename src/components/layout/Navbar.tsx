import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/useApp";
import { logout } from "../../features/auth/authslice";
import DashboardButton from "../DashboardButton";
import { useState } from "react";

export default function Navbar() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gray-300 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">
        Parcel Delivery Api
      </Link>

      <button
        className="sm:hidden text-black focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <div
        className={`flex-col  sm:flex sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 absolute sm:static top-16 left-0 w-full sm:w-auto bg-gray-300 sm:bg-transparent p-4 sm:p-0 transition-all duration-200 ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        {user ? (
         <div className=" ">
           <>
            <Link to="/" className="hover:text-gray-200 pr-4">
              Home
            </Link>
            <Link to="/track" className="hover:text-gray-200 pr-4 ">
              Track Parcel
            </Link>
            <DashboardButton />
            <span className="px-4">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
         </div>
        ) : (
          <>
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/track" className="hover:text-gray-200">
              Track Parcel
            </Link>
            <Link
              to="/login"
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
