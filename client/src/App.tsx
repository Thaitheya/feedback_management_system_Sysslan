import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import FeedbackForm from "./pages/Feedbackform";
import MyFeedback from "./pages/MyFeedback";
import AllFeedback from "./pages/AllFeedback";
import FeedbackCategory from "./components/FeedbackCategory";
import { Navigate } from "react-router-dom";
function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feedback" element={<FeedbackCategory />} />
          <Route path="/feedback/:category" element={<FeedbackForm />} />
          <Route path="/my-feedback" element={<MyFeedback />} />
          <Route path="/feedback/all" element={<AllFeedback />} />
        </Routes>
    </>
  );
}

export default App;
