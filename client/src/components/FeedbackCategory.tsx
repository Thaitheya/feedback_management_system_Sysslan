import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import workEnvironment from "../assets/Workenvironment.jpg";
import salary from "../assets/Salary.jpg";
import management from "../assets/management.jpg";
import training from "../assets/training.jpg";
import general from "../assets/General.jpg";
import other from "../assets/other.jpg";
import Breadcrumb from "./Breadcrumb";
export default function FeedbackCategory() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Work Environment",
      value: "WORK_ENVIRONMENT",
      image: workEnvironment,
      icon: "🏢",
      description: "Office, workplace and facilities",
    },
    {
      title: "Salary",
      value: "SALARY",
      image: salary,
      icon: "💰",
      description: "Salary, benefits and compensation",
    },
    {
      title: "Management",
      value: "MANAGEMENT",
      image: management,
      icon: "👨‍💼",
      description: "Leadership and management",
    },
    {
      title: "Training",
      value: "TRAINING",
      image: training,
      icon: "📚",
      description: "Learning and skill development",
    },
    {
      title: "General",
      value: "GENERAL",
      image: general,
      icon: "💬",
      description: "General feedback and suggestions",
    },
    {
      title: "Other",
      value: "OTHER",
      image: other,
      icon: "📌",
      description: "Anything else",
    },
  ];
  return (
    <>
      <Navbar />
<Breadcrumb />
      <div className="min-h-screen bg-slate-950 py-12 px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white">
            Choose Feedback Category
          </h1>

          <p className="text-slate-400 mt-3 text-lg">
            Select a category to submit your valuable feedback
          </p>
        </div>

        {/* Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.value}
              onClick={() => navigate(`/feedback/${category.value}`)}
              className="
    cursor-pointer
    bg-slate-900
    border
    border-slate-800
    rounded-2xl
    overflow-hidden
    transition-all
    duration-300
    hover:-translate-y-2
    hover:border-indigo-500
    hover:shadow-xl
    hover:shadow-indigo-500/20
  "
            >
              <div className="flex">
                {/* Image */}
                <div className="w-2/5">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {category.title}
                    </h2>

                    <p className="text-slate-400 mt-3">
                      {category.description}
                    </p>
                  </div>

                  <button
                    className="
          mt-6
          bg-indigo-600
          hover:bg-indigo-700
          text-white
          py-2
          rounded-lg
          font-semibold
          transition
        "
                  >
                    Give Feedback
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
