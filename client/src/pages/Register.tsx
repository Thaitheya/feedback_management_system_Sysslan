import { useState } from "react";
import { registerUser } from "../api/authApi";
import type { RegisterRequest } from "../types/auth";
import Navbar from "../components/Navbar";

export default function Register() {
  const [formData, setFormData] = useState<RegisterRequest>({
    userName: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await registerUser(formData);

      localStorage.setItem("token", response.token);

      setMessage("Registration Successful");
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage("Something went wrong");
      }
    }
  };

  return (
    <>
    <Navbar />
    <div className="h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-800 to-cyan-700 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-indigo-700 to-blue-900 text-white p-10">
          <h1 className="text-4xl font-bold leading-tight">
            Feedback
            <br />
            Management
            <br />
            System
          </h1>

          <p className="mt-5 text-base text-blue-100 leading-7">
            Join the platform to submit, track and manage feedback securely with
            role-based access.
          </p>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xl">📝</span>
              <span>Submit Feedback</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl">📊</span>
              <span>Track Progress</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl">💬</span>
              <span>Collaborate with Teams</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl">🔒</span>
              <span>Secure Access</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-slate-950 p-6 md:p-8">
          <div className="w-full max-w-sm">
            <div className="text-center mb-5">
              <div className="text-5xl mb-2">🚀</div>

              <h2 className="text-2xl font-bold text-white">
                Create Account
              </h2>

              <p className="text-white text-sm mt-1">Register to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block mb-1 text-sm font-medium text-white">
                  Username
                </label>

                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Enter username"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-white">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
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
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {message && (
                <div
                  className={`rounded-lg p-2 text-sm text-center ${
                    message.includes("Successful")
                      ? "bg-green-100 border border-green-300 text-green-700"
                      : "bg-red-100 border border-red-300 text-red-700"
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold hover:from-blue-700 hover:to-indigo-800 transition"
              >
                Create Account
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-gray-500">
              © 2026 Feedback Management System
            </div>
          </div>
        </div>
      </div>
    </div>
  );
    </>
)}
