import axios from "axios";
import { getAuthorizationHeader } from "./authUtils";
import { handleApiError } from "./handleApiError";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/leagues`;

export const getAllLeagues = async () => {
  try {
    const response = await axios.get(API_BASE_URL, {
      headers: getAuthorizationHeader(),
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
