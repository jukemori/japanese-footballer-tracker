import {
  getPlayer,
  getPlayerStats,
  getFixtures,
  getFixturePlayers,
  getFixturePlayerStats,
} from '@/utils'
import { PlayerProps, CompetitionStatsProps, FixtureProps } from '@/types'
import { CompetitionStats, Fixture } from '@/components'
import Image from 'next/image'

interface HomeProps {
  player: PlayerProps
  playerStatsArray: CompetitionStatsProps[]
  fixtureArray: FixtureProps[]
}

async function fetchPlayerData(): Promise<HomeProps> {
  const player = await getPlayer()
  const playerStatsArray = await getPlayerStats()
  const fixtureArray = await getFixtures()
  const playerFixtureStatsArray = await getFixturePlayerStats()

  console.log('player fixture', playerFixtureStatsArray)

  const currentDate = new Date()
  const monthAgo = new Date()
  monthAgo.setDate(currentDate.getDate() - 30)

  const filteredFixtures = fixtureArray
    .filter((fixture: FixtureProps) => {
      const fixtureDate = new Date(fixture.fixture.date)
      return fixtureDate >= monthAgo && fixtureDate <= currentDate
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
      const fixturePlayersArray = await getFixturePlayers(fixture)
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

  return {
    player,
    playerStatsArray,
    fixtureArray: fixturesWithPlayer,
  }
}

function Home({ player, playerStatsArray, fixtureArray }: HomeProps) {
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
    </div>
  )
}

export default async function HomePage() {
  const { player, playerStatsArray, fixtureArray } = await fetchPlayerData()

  return (
    <Home
      player={player}
      playerStatsArray={playerStatsArray}
      fixtureArray={fixtureArray}
    />
  )
}
