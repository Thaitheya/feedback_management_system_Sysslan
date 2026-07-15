import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { AuthContext } from "../AuthProvider/AuthContext";
import Navbar from "../components/Navbar";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);

      login(response.token, response.userName, response.role);

      setMessage("");

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error: any) {
      setMessage(
        error.response?.data?.message ??
          "Invalid username or password"
      );
    }
  };

  return (

    <>
    <Navbar />
    <div className="h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-800 to-cyan-700 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-blue-700 to-indigo-900 text-white p-10">

          <h1 className="text-4xl font-bold leading-tight">
            Feedback
            <br />
            Management
            <br />
            System
          </h1>

          <p className="mt-5 text-base text-blue-100 leading-7">
            Collect, organize and manage feedback securely through one
            centralized platform.
          </p>

          <div className="mt-8 space-y-3">

            <div className="flex items-center gap-3">
              <span className="text-xl">📝</span>
              <span>Submit Feedback</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl">📊</span>
              <span>Track Feedback Status</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl">💬</span>
              <span>Manage Responses</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl">🔒</span>
              <span>Role-Based Secure Access</span>
            </div>

          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center bg-slate-950 p-6 md:p-8">

          <div className="w-full max-w-sm">

            <div className="text-center mb-5">

              <div className="text-5xl mb-2">
                💬
              </div>

              <h2 className="text-2xl font-bold text-white">
                Welcome Back
              </h2>

              <p className="text-white text-sm mt-1">
                Login to continue
              </p>

            </div>

            <form onSubmit={handleSubmit} className="space-y-3">

              <div>
                <label className="block mb-1 text-sm font-medium text-white">
                  Username
                </label>

                <input
                  type="text"
                  name="userName"
                  placeholder="Enter username"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-white">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {message && (
                <div className="rounded-lg p-2 text-sm text-center bg-red-100 border border-red-300 text-red-700">
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold hover:from-blue-700 hover:to-indigo-800 transition"
              >
                Login
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-gray-500">
              © 2026 Feedback Management System
            </div>

          </div>

        </div>

      </div>
    </div>
    </>
     );
}
