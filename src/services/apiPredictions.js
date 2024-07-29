import axios from "axios";
import { getAuthorizationHeader } from "./authUtils";
import { handleApiError } from "./handleApiError";

// const API_BASE_URL = `https://v3.football.api-sports.io/predictions?fixture=198772`;

export const getMatchOutComePredictions = async (fixture) => {
  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/predictions?fixture=${fixture}`,
      {
        headers:{
          'Content-Type': 'application/json',
          'x-rapidapi-host':'v3.football.api-sports.io',
          'x-rapidapi-key': import.meta.env.VITE_API_KEY
        } 
      },
    );
    // console.log(response.data.response[0])
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
