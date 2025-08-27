/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState } from "react";
import { useRegisterMutation } from "../../features/auth/authApi";
import { useAppDispatch } from "../../hooks/useApp";
import { setCredentials } from "../../features/auth/authslice";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const registerSchema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  role: yup.string().oneOf(["sender", "receiver"]).required("Role is required"),
});

type RegisterFormValues = yup.InferType<typeof registerSchema>;

export default function RegisterPage() {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    toast.dismiss();
    try {
      const res = await registerUser(data).unwrap();
      dispatch(setCredentials({ user: res.user, token: res.token }));
      toast.success("Account created!");

      if (res.user.role === "sender") navigate("/sender-dashboard");
      else navigate("/receiver-dashboard");
    } catch (err: any) {
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Create Account
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Register to start sending or receiving parcels
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              {...register("name")}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none dark:bg-gray-700 dark:text-gray-100 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none dark:bg-gray-700 dark:text-gray-100 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-1 text-gray-700 dark:text-gray-200">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none dark:bg-gray-700 dark:text-gray-100 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 pt-5 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200">Role</label>
            <select
              {...register("role")}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none dark:bg-gray-700 dark:text-gray-100 ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="sender">Sender</option>
              <option value="receiver">Receiver</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-60 font-medium"
          >
            {isLoading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
