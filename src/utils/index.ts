import axios from 'axios'
import { FixtureProps } from '@/types'

const makeApiRequest = async (urlProps: string, paramsProps: object) => {
  const options = {
    method: 'GET',
    url: urlProps,
    params: paramsProps,
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    },
  }

  try {
    const response = await axios.request(options)
    const result = response.data
    return result
  } catch (error) {
    console.error('Error:', error)
    throw new Error((error as Error).message)
  }
}

export const getPlayer = async (id: string, season: string) => {
  const url = 'https://api-football-v1.p.rapidapi.com/v3/players'
  const params = {
    id: id,
    season: season,
  }

  try {
    const result = await makeApiRequest(url, params)
    const player = result.response[0].player
    return player
  } catch (error) {
    console.error('Error:', error)
    return (error as Error).message
  }
}

export const getPlayerStats = async (
  id: string,
  team: string,
  season: string
) => {
  const url = 'https://api-football-v1.p.rapidapi.com/v3/players'
  const params = {
    id: id,
    team: team,
    season: season,
  }

  try {
    const result = await makeApiRequest(url, params)
    const playerStats = result.response[0].statistics
    return playerStats
  } catch (error) {
    console.error('Error:', error)
    return (error as Error).message
  }
}

export const getFixtures = async (team: string, season: string) => {
  const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures'
  const params = {
    team: team,
    season: season,
  }

  try {
    const result = await makeApiRequest(url, params)
    const fixtures = result.response
    return fixtures
  } catch (error) {
    console.error('Error:', error)
    return (error as Error).message
  }
}

export const getFixturePlayers = async (
  fixture: FixtureProps,
  team: string
) => {
  const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures/players'

  try {
    const allPlayersArray = []
    const fixtureId = fixture.fixture.id
    const params = {
      fixture: fixtureId,
      team: team,
    }

    const result = await makeApiRequest(url, params)

    for (const player of result.response[0].players) {
      allPlayersArray.push(player.player.id)
    }

    return allPlayersArray
  } catch (error) {
    console.error('Error:', error)
    return (error as Error).message
  }
}

export const getFixturePlayerStats = async (
  teamId: string,
  playerId: string,
  fixtureId: string
) => {
  const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures/players'

  try {
    const playerStatsArray = []

    const params = {
      fixture: fixtureId,
      team: teamId,
    }

    const result = await makeApiRequest(url, params)

    for (const player of result.response[0].players) {
      if (player.player.id == playerId) {
        playerStatsArray.push(player.statistics[0])
        break
      }
    }

    return playerStatsArray
  } catch (error) {
    console.error('Error:', error)
    return (error as Error).message
  }
}
