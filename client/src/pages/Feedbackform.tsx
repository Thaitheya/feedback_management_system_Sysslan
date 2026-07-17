import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { addFeedback } from "../api/FeedbackApi";
import Breadcrumb from "../components/Breadcrumb";
import feedbackBanner from "../assets/feedbackBanner.jpg"
export default function FeedbackForm() {
  const navigate = useNavigate();
  const { category } = useParams();

  const [formData, setFormData] = useState({
    feedbackTitle: "",
    description: "",
    category: category ?? "GENERAL",
    rating: 5,
  });

  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "rating" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.feedbackTitle.trim() === "") {
      setMessage("Feedback title is required.");
      return;
    }

    if (formData.feedbackTitle.trim().length < 5) {
      setMessage("Title must contain at least 5 characters.");
      return;
    }

    if (formData.description.trim() === "") {
      setMessage("Description is required.");
      return;
    }

    if (formData.description.trim().length < 10) {
      setMessage("Description must contain at least 10 characters.");
      return;
    }

    try {
      await addFeedback(formData);

      setMessage("Feedback submitted successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch {
      setMessage("Failed to submit feedback");
    }
  };

  return (
    <>
      <Navbar />
      <Breadcrumb />

      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-10">
        <div className="max-w-6xl w-full bg-slate-900 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side Image */}
          <div className="bg-slate-800 flex flex-col items-center justify-center p-10">
            <img
              src={feedbackBanner}
              alt="Feedback"
              className="w-150 h-96 object-contain"
            />

            <h2 className="text-3xl font-bold text-white mt-6">
              We Value Your Opinion
            </h2>

            <p className="text-slate-400 text-center mt-4">
              Your feedback helps us improve our workplace and create a better
              experience for everyone.
            </p>
          </div>

          {/* Right Side Form */}
          <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {category?.replace(/_/g, " ")} Feedback
            </h1>

            <p className="text-slate-400 mb-8">Please share your thoughts.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-slate-300 mb-2 block">
                  Feedback Title
                </label>

                <input
                  type="text"
                  name="feedbackTitle"
                  value={formData.feedbackTitle}
                  onChange={handleChange}
                  required
                  minLength={5}
                  maxLength={100}
                  placeholder="Enter feedback title"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 mb-2 block">Description</label>

                <textarea
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  minLength={10}
                  maxLength={500}
                  placeholder="Describe your feedback..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white resize-none"
                />
              </div>

              <div>
                <label className="text-slate-300 mb-2 block">Rating</label>

                <input
                  type="range"
                  min={1}
                  max={5}
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full accent-indigo-500"
                />

                <div className="text-center text-3xl mt-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= formData.rating
                          ? "text-yellow-400"
                          : "text-slate-600"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg text-white font-semibold">
                Submit Feedback
              </button>

              {message && (
                <p className="text-center text-green-400">{message}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
