import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../app/store";

export default function DashboardButton() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleGoDashboard = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    switch (user.role) {
      case "admin":
        navigate("/admin-dashboard");
        break;
      case "sender":
        navigate("/sender-dashboard");
        break;
      case "receiver":
        navigate("/receiver-dashboard");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <button
      onClick={handleGoDashboard}
      className="px-6 py-2 mt-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
    >
      Go to Dashboard
    </button>
  );
}
