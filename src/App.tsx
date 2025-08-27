import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Footer from "./components/layout/Footer";
import PrivateRoute from "./components/PrivateRoute";
import SenderDashboard from "./pages/dashboards/SenderDashboard";
import ReceiverDashboard from "./pages/dashboards/ReceiverDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import LandingPage from "./pages/public/LandingPage";
import TrackParcelPage from "./pages/auth/TrackParcelPage";
import ContactPage from "./pages/public/ContactPage";
import AboutPage from "./pages/public/AboutPage";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
     
      <main className="flex-1 p-4">
        <Routes>

           <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* <Route path="/faq" element={<FAQPage />} /> */}


    <Route path="/track" element={<TrackParcelPage />} />

  {/* protected routes */}

   <Route
        path="/admin-dashboard"
        element={
          <PrivateRoute roles={["admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/sender-dashboard"
        element={
          <PrivateRoute roles={["sender"]}>
            <SenderDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/receiver-dashboard"
        element={
          <PrivateRoute roles={["receiver"]}>
            <ReceiverDashboard />
          </PrivateRoute>
        }
      />


          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
