import axios from "axios";
import type { FeedbackRequest } from "../types/Feedback";

const api = axios.create({
  baseURL: "http://localhost:8081",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const addFeedback = async (feedback: FeedbackRequest) => {
  const response = await api.post("/feedback/add-feedback", feedback);
  return response.data;
};

export const getMyFeedback = async () => {
  const response = await api.get("/feedback/myfeedback");
  return response.data;
};

export const getAllFeedback = async () => {
  const response = await api.get("/feedback/all");
  return response.data;
};