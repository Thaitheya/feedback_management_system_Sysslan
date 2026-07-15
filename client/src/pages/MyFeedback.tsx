import { useEffect, useState } from "react";
import { getMyFeedback } from "../api/FeedbackApi";
import Navbar from "../components/Navbar";

export default function MyFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    try {
      const data = await getMyFeedback();
      setFeedbacks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-xl ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
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

      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">

          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            My Feedback
          </h2>

          {feedbacks.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No feedback submitted yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">

                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Title</th>
                    <th className="px-6 py-3 text-left">Category</th>
                    <th className="px-6 py-3 text-center">Rating</th>
                    <th className="px-6 py-3 text-left">Description</th>
                  </tr>
                </thead>

                <tbody>
                  {feedbacks.map((feedback: any) => (
                    <tr
                      key={feedback.feedbackId}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-medium">
                        {feedback.feedbackTitle}
                      </td>

                      <td className="px-6 py-4">
                        {feedback.category}
                      </td>

                      <td className="px-6 py-4 flex justify-center">
                        {renderStars(feedback.rating)}
                      </td>

                      <td className="px-6 py-4">
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