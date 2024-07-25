import axios from "axios";
import { getAuthorizationHeader } from "./authUtils";
import { handleApiError } from "./handleApiError";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/teams`;

export const getLeagueTeams = async (country) => {
  try {
    const response = await axios.post(
      API_BASE_URL,
      {
        country,
      },
      {
        headers: getAuthorizationHeader(),
      },
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
