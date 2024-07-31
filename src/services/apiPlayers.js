import axios from "axios";
import { getAuthorizationHeader } from "./authUtils";
import { handleApiError } from "./handleApiError";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

export const getTeamPlayers = async (teamId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/players-squads`,
      {
        team_id: teamId,
      },
      {
        headers: getAuthorizationHeader(),
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getTeamPlayerDetails = async (playerId, seasonId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/players`,
      {
        player_id: playerId,
        season_id: seasonId,
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
