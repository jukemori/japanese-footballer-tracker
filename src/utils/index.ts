import axios from 'axios';
import { FixtureProps } from '@/types';

const makeApiRequest = async (urlProps: string, paramsProps: object) => {
  const options = {
    method: 'GET',
    url: urlProps,
    params: paramsProps,
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const result = response.data;
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw new Error((error as Error).message);
  }
};

export const getPlayer = async () => {
  const url = 'https://api-football-v1.p.rapidapi.com/v3/players';
  const params = {
    id: '32862',
    season: '2023'
  };

  try {
    const result = await makeApiRequest(url, params)
    // console.log('result', result);
    const player = result.response[0].player;
    return player;
  } catch (error) {
    console.error('Error:', error);
    return (error as Error).message;
  }
};


export const getPlayerStats = async () => {
  const url = 'https://api-football-v1.p.rapidapi.com/v3/players';
  const params = {
    id: '32862',
    team: '548',
    season: '2023'
  };

  try {
    const result = await makeApiRequest(url, params);
    const playerStats = result.response[0].statistics;
    // console.log('stats', playerStats);
    return playerStats;
  } catch (error) {
    console.error('Error:', error);
    return (error as Error).message;
  }
};

export const getFixtures = async () => {
  const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures';
  const params = {
    team: '548',
    season: '2023'
  };

  try {
    const result = await makeApiRequest(url, params);
    const fixtures = result.response;
    return fixtures;
  } catch (error) {
    console.error('Error:', error);
    return (error as Error).message;
  }
};


export const getFixturePlayers = async (fixture: FixtureProps) => {
  const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures/players';
  const teamId = '548';

  try {
    const allPlayersArray = [];
    const fixtureId = fixture.fixture.id;
    const params = {
      fixture: fixtureId,
      team: teamId,
    };

    const result = await makeApiRequest(url, params);

    for (const player of result.response[0].players) {
      allPlayersArray.push(player.player.id);
    }

    return allPlayersArray;
  } catch (error) {
    console.error('Error:', error);
    return (error as Error).message;
  }
};

export const getFixturePlayerStats = async () => {
  const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures/players';
  const teamId = '548';
  const playerId ='32862'

  try {
    const playerStatsArray = [];
    const fixtureId = '1038141';
    const params = {
      fixture: fixtureId,
      team: teamId,
    };

    const result = await makeApiRequest(url, params);

    for (const player of result.response[0].players) {
      // console.log( 'player', player)
      if( player.player.id === playerId) {

        console.log('statistics', player.statistics[0])
        playerStatsArray.push(player.statistics[0])
        break;
      }
    }

    return playerStatsArray;
  } catch (error) {
    console.error('Error:', error);
    return (error as Error).message;
  }
};