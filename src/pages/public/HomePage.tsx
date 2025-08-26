import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-4">Parcel Delivery System</h1>
      <p className="text-lg mb-6 text-center max-w-lg">
        Send and receive parcels seamlessly. Track shipments and manage deliveries easily.
      </p>
      <div className="flex space-x-4">
        <Link to="/login" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
          Login
        </Link>
        <Link to="/register" className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700">
          Register
        </Link>
      </div>
    </div>
  );
}
