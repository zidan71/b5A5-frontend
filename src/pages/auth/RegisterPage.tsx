/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useRegisterMutation } from "../../features/auth/authApi";
import { useAppDispatch } from "../../hooks/useApp";
import { setCredentials } from "../../features/auth/authslice";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"sender" | "receiver">("sender");

  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await register({ name, email, password, role }).unwrap();
      dispatch(setCredentials({ user: res.user, token: res.token }));
      toast.success("Account created!");
      if (res.user.role === "sender") navigate("/sender-dashboard");
      else navigate("/receiver-dashboard");
    } catch (err: any) {
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
            minLength={6}
          />
        </div>
        <div>
          <label className="block mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "sender" | "receiver")}
            className="w-full p-2 border rounded"
          >
            <option value="sender">Sender</option>
            <option value="receiver">Receiver</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
        >
          {isLoading ? "Creating..." : "Register"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600">
          Login
        </Link>
      </p>
    </div>
  );
}
