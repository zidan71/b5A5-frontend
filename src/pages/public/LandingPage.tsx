import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar></Navbar>

      {/* Hero Section */}
      <header className="flex-1 flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-800 p-10 text-center">
        <h2 className="text-4xl font-bold mb-4">Fast & Reliable Parcel Delivery</h2>
        <p className="mb-6 max-w-xl">Send and receive parcels across the country with real-time tracking and secure delivery.</p>
        <Link to="/register" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">Get Started</Link>
      </header>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6 text-center">
        &copy; {new Date().getFullYear()} Parcel Delivery. All rights reserved.
      </footer>
    </div>
  );
}
