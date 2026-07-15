import { useEffect, useState } from "react";
import { getAllFeedback } from "../api/FeedbackApi";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";

export default function AllFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    try {
      const data = await getAllFeedback();
      setFeedbacks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex justify-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${
              star <= rating ? "text-yellow-400" : "text-gray-600"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <Breadcrumb />

      <div className="min-h-screen bg-slate-900 p-8">
        <div className="max-w-7xl mx-auto bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-6">

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white">
              Feedback List
            </h2>

            <p className="text-slate-400 mt-1">
              View and manage all submitted feedback.
            </p>
          </div>

          {feedbacks.length === 0 ? (
            <div className="bg-slate-900 rounded-xl py-16 text-center text-slate-400 border border-slate-700">
              No feedback available.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-700">

              <table className="w-full">

                <thead className="bg-indigo-700 text-white">
                  <tr>
                    <th className="px-5 py-4 text-left">Title</th>
                    <th className="px-5 py-4 text-left">User</th>
                    <th className="px-5 py-4 text-center">Role</th>
                    <th className="px-5 py-4 text-center">Category</th>
                    <th className="px-5 py-4 text-center">Rating</th>
                    <th className="px-5 py-4 text-left">Description</th>
                  </tr>
                </thead>

                <tbody>
                  {feedbacks.map((feedback: any, index) => (
                    <tr
                      key={feedback.feedbackId}
                      className={`border-b border-slate-700 transition hover:bg-slate-700 ${
                        index % 2 === 0 ? "bg-slate-800" : "bg-slate-900"
                      }`}
                    >
                      <td className="px-5 py-4 font-semibold text-white">
                        {feedback.feedbackTitle}
                      </td>

                      <td className="px-5 py-4 text-slate-300">
                        {feedback.user?.userName}
                      </td>

                      <td className="px-5 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            feedback.role === "ADMIN"
                              ? "bg-red-500/20 text-red-300"
                              : "bg-emerald-500/20 text-emerald-300"
                          }`}
                        >
                          {feedback.role}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-center">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300">
                          {feedback.category}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        {renderStars(feedback.rating)}
                      </td>

                      <td className="px-5 py-4 text-slate-300">
                        {feedback.description}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}