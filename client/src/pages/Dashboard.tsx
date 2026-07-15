import Breadcrumb from "../components/Breadcrumb";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const username = localStorage.getItem("userName");
  const role = localStorage.getItem("role");

  return (
    <>
      <Navbar />
      <Breadcrumb />
      <div className="min-h-screen bg-slate-950 text-white p-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-8 mb-8">
            <h1 className="text-4xl font-bold">
              Welcome, <span className="text-indigo-400">{username}</span> 👋
            </h1>

            <p className="text-slate-400 mt-3">
              Role:{" "}
              <span
                className={`font-semibold ${
                  role === "ADMIN" ? "text-red-400" : "text-emerald-400"
                }`}
              >
                {role}
              </span>
            </p>

            <p className="text-slate-500 mt-2">
              Manage employee feedback efficiently from your dashboard.
            </p>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {role === "USER" && (
              <div
                onClick={() => navigate("/feedback")}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 cursor-pointer hover:border-indigo-500 hover:shadow-indigo-500/20 hover:shadow-lg hover:-translate-y-1 transition duration-300"
              >
                <div className="text-5xl mb-4">📝</div>

                <h2 className="text-2xl font-bold text-indigo-400">
                  Give Feedback
                </h2>
                <p className="text-slate-400 mt-3">
                  Submit feedback regarding salary, management, training, work
                  environment, and more.
                </p>
              </div>
            )}

            {/* Feedback List */}
            <div
              onClick={() => navigate("/feedback/all")}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 cursor-pointer hover:border-emerald-500 hover:shadow-emerald-500/20 hover:shadow-lg hover:-translate-y-1 transition duration-300"
            >
              <div className="text-5xl mb-4">📋</div>

              <h2 className="text-2xl font-bold text-emerald-400">
                {role === "ADMIN" ? "All Feedback" : "My Feedback"}
              </h2>

              <p className="text-slate-400 mt-3">
                {role === "ADMIN"
                  ? "View every feedback submitted by employees."
                  : "View your submitted feedback."}
              </p>
            </div>

            {/* Profile */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-purple-500 transition duration-300">
              <div className="text-5xl mb-4">👤</div>

              <h2 className="text-2xl font-bold text-purple-400">Profile</h2>

              <div className="mt-4 space-y-3 text-slate-300">
                <p>
                  <span className="font-semibold">Username:</span> {username}
                </p>

                <p>
                  <span className="font-semibold">Role:</span>{" "}
                  <span
                    className={`${
                      role === "ADMIN" ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {role}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
