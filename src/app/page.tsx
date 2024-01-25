import {
  getPlayer,
  getPlayerStats,
  getFixtures,
  getFixturePlayers,
  getFixturePlayerStats,
} from '@/utils'
import {
  PlayerProps,
  CompetitionStatsProps,
  FixtureProps,
  PlayerStatsProps,
} from '@/types'
import { CompetitionStats, Fixture, PlayerFixtureStats } from '@/components'
import Image from 'next/image'

interface HomeProps {
  player: PlayerProps
  playerStatsArray: CompetitionStatsProps[]
  fixtureArray: FixtureProps[]
  playerFixtureStatsArray: PlayerStatsProps[]
}

async function fetchPlayerData(): Promise<HomeProps> {
  const playerId = '32862'
  const season = '2023'
  const teamId = '548'
  const player = await getPlayer(playerId, season)
  const playerStatsArray = await getPlayerStats(playerId, teamId, season)
  const fixtureArray = await getFixtures(teamId, season)

  const currentDate = new Date()
  const twoMonthAgo = new Date()
  twoMonthAgo.setDate(currentDate.getDate() - 60)

  const filteredFixtures = fixtureArray
    .filter((fixture: FixtureProps) => {
      const fixtureDate = new Date(fixture.fixture.date)
      return fixtureDate >= twoMonthAgo && fixtureDate <= currentDate
    })
    .sort((a: FixtureProps, b: FixtureProps) => {
      const dateA = new Date(a.fixture.date)
      const dateB = new Date(b.fixture.date)
      return dateA.getTime() - dateB.getTime()
    })

  // const upcomingFixtures = fixtureArray
  //   .filter((fixture) => {
  //     const fixtureDate = new Date(fixture.fixture.date)
  //     return fixtureDate > currentDate
  //   })
  //   .sort((a, b) => {
  //     const dateA = new Date(a.fixture.date)
  //     const dateB = new Date(b.fixture.date)
  //     return dateA.getTime() - dateB.getTime()
  //   })

  const fixturePlayersPromises = filteredFixtures.map(
    async (fixture: FixtureProps) => {
      const fixturePlayersArray = await getFixturePlayers(fixture, teamId)
      return fixturePlayersArray
    }
  )

  const fixturePlayersArray = await Promise.all(fixturePlayersPromises)

  const fixturesWithPlayer = filteredFixtures.filter(
    (fixture: FixtureProps, index: number) => {
      const hasPlayer = fixturePlayersArray[index].includes(32862)
      return hasPlayer
    }
  )

  const playerFixtureStatsArray = []

  const playerFixtureIds = fixturesWithPlayer.map(
    (fixture: FixtureProps) => fixture.fixture.id
  )

  for (const playerFixtureId of playerFixtureIds) {
    const playerFixtureStats = await getFixturePlayerStats(
      teamId,
      playerId,
      playerFixtureId
    )

    playerFixtureStatsArray.push(playerFixtureStats[0])
  }

  return {
    player,
    playerStatsArray,
    fixtureArray: fixturesWithPlayer,
    playerFixtureStatsArray,
  }
}

function Home({
  player,
  playerStatsArray,
  fixtureArray,
  playerFixtureStatsArray,
}: HomeProps) {
  return (
    <div>
      <h1>Player Information:</h1>
      <h2>{player.name}</h2>
      <Image src={player.photo} alt={player.name} width={200} height={200} />
      <p>{player.height}</p>
      <p>{player.weight}</p>

      {playerStatsArray.map((stats, index) => (
        <CompetitionStats key={index} stats={stats} />
      ))}

      {fixtureArray.map((fixture, index) => (
        <Fixture key={index} fixture={fixture} />
      ))}
      {playerFixtureStatsArray.map((playerFixtureStats, index) => (
        <PlayerFixtureStats key={index} playerStats={playerFixtureStats} />
      ))}
    </div>
  )
}

export default async function HomePage() {
  const { player, playerStatsArray, fixtureArray, playerFixtureStatsArray } =
    await fetchPlayerData()

  return (
    <Home
      player={player}
      playerStatsArray={playerStatsArray}
      fixtureArray={fixtureArray}
      playerFixtureStatsArray={playerFixtureStatsArray}
    />
  )
}
