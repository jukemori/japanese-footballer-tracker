import {
  getPlayer,
  getPlayerStats,
  getFixtures,
  getFixturePlayers,
} from '@/utils'
import { PlayerProps, StatsProps, FixtureProps } from '@/types'
import { Stats, Fixture } from '@/components'
import Image from 'next/image'

interface HomeProps {
  player: PlayerProps
  playerStatsArray: StatsProps[]
  fixtureArray: FixtureProps[]
}

async function fetchPlayerData(): Promise<HomeProps> {
  const player = await getPlayer()
  const playerStatsArray = await getPlayerStats()
  const fixtureArray = await getFixtures()

  const currentDate = new Date()
  const twoWeeksAgo = new Date()
  twoWeeksAgo.setDate(currentDate.getDate() - 14)

  const filteredFixtures = fixtureArray
    .filter((fixture: FixtureProps) => {
      const fixtureDate = new Date(fixture.fixture.date)
      return fixtureDate >= twoWeeksAgo && fixtureDate <= currentDate
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

  console.log(fixturePlayersArray)

  const fixturesWithPlayer = filteredFixtures.filter(
    (fixture: FixtureProps, index: number) => {
      const hasPlayer = fixturePlayersArray[index].includes(32862)
      return hasPlayer
    }
  )

  console.log(fixturesWithPlayer)

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
        <Stats key={index} stats={stats} />
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
