import axios from "axios";
import { getAuthorizationHeader } from "./authUtils";
import { handleApiError } from "./handleApiError";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/standings`;

export const getStandings = async (leagueId) => {
  try {
    const currentYear = new Date().getFullYear();
    const response = await axios.post(
      API_BASE_URL,
      { league_id: leagueId, season_id: currentYear },
      {
        headers: getAuthorizationHeader(),
      },
    );
    console.log("API Response:", response.data.data);
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};