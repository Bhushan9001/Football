import axios from "axios";
import { getAuthorizationHeader } from "./authUtils";
import { handleApiError } from "./handleApiError";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/standings`;

export const getStandings = async (leagueId, seasonId) => {
  try {
    const response = await axios.post(
      API_BASE_URL,
      { league_id: leagueId, season_id: seasonId },
      {
        headers: getAuthorizationHeader(),
      },
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
