import { handleApiError } from "./handleApiError";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const signIn = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signin`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const signUp = async (userData) => {
  try {
    console.log(userData);
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const sendEmail = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sendmail`, { email });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const verify = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
