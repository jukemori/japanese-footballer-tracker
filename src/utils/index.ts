import axios from 'axios';

export const getPlayer = async () => {
  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/players',
    params: {
      id: '32862',
      season: '2023'
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const result = response.data;
    console.log('result', result);
    const player = result.response[0].player;
    return player;
  } catch (error) {
    console.error('Error:', error);
    return (error as Error).message;
  }
};


export const getPlayerStats = async () => {
  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/players',
    params: {
      id: '32862',
      team: '548',
      season: '2023'
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const result = response.data;
    const playerStats = result.response[0].statistics;
    console.log('stats', playerStats);
    return playerStats;
  } catch (error) {
    console.error('Error:', error);
    return (error as Error).message;
  }
};
