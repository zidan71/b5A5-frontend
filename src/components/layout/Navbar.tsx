import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/useApp";
import { logout } from "../../features/auth/authslice";
import DashboardButton from "../DashboardButton";

export default function Navbar() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">
        Parcel Delivery
      </Link>
      <div className="space-x-4">
        {user ? (
          <>

  <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
      
          <Link to="/track" className="hover:text-gray-200">Track Parcel</Link>
      
          <Link to="/faq" className="hover:underline">FAQ</Link>

          <DashboardButton></DashboardButton>
            <span>{user.name}</span>
            <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
              Logout
            </button>
          </>
        ) : (
          <>
           <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
      
          <Link to="/track" className="hover:text-gray-200">Track Parcel</Link>
      
          <Link to="/faq" className="hover:underline">FAQ</Link>
          <Link to="/login" className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}
