import axios from "axios";
import { getAuthorizationHeader } from "./authUtils";
import { handleApiError } from "./handleApiError";

// const API_BASE_URL = `https://v3.football.api-sports.io/predictions?fixture=198772`;

export const getMatchOutComePredictions = async (fixture) => {
  try {
    const response = await axios.post(
      `https://v3.football.api-sports.io/predictions?${fixture}`,
      {
        headers:{
          'Content-Type': 'application/json',
          'x-rapidapi-host':'v3.football.api-sports.io',
          'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY
        } 
      },
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
