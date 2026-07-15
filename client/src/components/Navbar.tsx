import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("userName");
  const role = localStorage.getItem("role");

  const isLoggedIn = !!token;

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-950 border-b border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div
            onClick={() =>
              navigate(isLoggedIn ? "/dashboard" : "/login")
            }
            className="cursor-pointer"
          >
            <h1 className="text-2xl font-bold text-indigo-400 hover:text-indigo-300 transition">
              Feedback Management System
            </h1>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-5">

            {isLoggedIn ? (
              <>
                {/* User Details */}
                <div className="text-right">
                  <p className="text-white font-semibold">
                    {username}
                  </p>

                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      role === "ADMIN"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-emerald-500/20 text-emerald-400"
                    }`}
                  >
                    {role}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-medium transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-indigo-300 font-medium transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white font-medium transition duration-300"
                >
                  Register
                </Link>
              </>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
}