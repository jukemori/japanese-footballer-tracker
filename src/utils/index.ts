import axios from 'axios';

export const fetchData = async () => {
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
    const data = response.data.response[0];
    console.log('data', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return (error as Error).message;
  }
};
