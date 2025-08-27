import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";

export default function LandingPage() {
  return (
    <div className="min-h-screen ">
      <Navbar></Navbar>

      <header className="flex-1 flex flex-col justify-center items-center bg-gray-300 h-96  p-10 text-center">
        <h2 className="text-4xl font-bold mb-4">Fast & Reliable Parcel Delivery</h2>
        <p className="mb-6 max-w-xl">Send and receive parcels across the country with real-time tracking and secure delivery.</p>
        <Link to="/register" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">Get Started</Link>
      </header>

    <main>
      <AboutPage></AboutPage>
      <ContactPage></ContactPage>
    </main>


      
    </div>
  );
}
