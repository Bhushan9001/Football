import axios from "axios";
import { getAuthorizationHeader } from "./authUtils";
import { handleApiError } from "./handleApiError";



const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/odds`;

export const getOdds = async (season_id,fixture,league) => {
    try {

        const response = await axios.get(`https://v3.football.api-sports.io/?$season=${season_id}&bet=1&bookmaker=6&fixture=${fixture}&league=${league}`,
            {
                headers:{
                    'Content-Type': 'application/json',
                    'x-rapidapi-host':'v3.football.api-sports.io',
                    'x-rapidapi-key': import.meta.env.VITE_API_KEY
                  } 
            }
        )
        console.log(response.data);
        return response.data.response;

    } catch (error) {
        handleApiError(error);
    }

}