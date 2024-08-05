import axios from "axios";
import { getAuthorizationHeader } from "./authUtils";
import { handleApiError } from "./handleApiError";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/fixtures`;

export const getAllFixtures = async (leagueId, seasonId) => {
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

export const getFixtureHead2HeadStats = async (teamOneId, teamTwoId) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/fixture/head-to-head`,
      { h2h: `${teamOneId}-${teamTwoId}` },
      {
        headers: getAuthorizationHeader(),
      },
    );
    // console.log(response.data.response.fixture);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getFixtureStats = async (teamId, fixtureId) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/fixture/statistics`,
      { team_id: teamId, fixture_id: fixtureId },
      {
        headers: getAuthorizationHeader(),
      },
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
