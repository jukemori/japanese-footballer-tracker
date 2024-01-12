import { getPlayer, getPlayerStats, getFixtures } from '@/utils'
import { PlayerProps, StatsProps, FixtureProps } from '@/types'
import { Stats, Fixture } from '@/components'
import Image from 'next/image'

export default async function Home() {
  const player: PlayerProps = await getPlayer()
  const playerStatsArray: StatsProps[] = await getPlayerStats()
  const fixtureArray: FixtureProps[] = await getFixtures()
  fixtureArray.sort((a, b) => {
    const dateA = new Date(a.fixture.date)
    const dateB = new Date(b.fixture.date)
    return dateA - dateB
  })

  return (
    <div>
      <h1>Player Information:</h1>
      <h2>{player.name}</h2>
      <Image src={player.photo} alt={player.name} width={200} height={200} />
      <p>{player.height}</p>
      <p>{player.weight}</p>

      {playerStatsArray.map((stats: StatsProps, index: number) => (
        <Stats key={index} stats={stats} />
      ))}

      {fixtureArray.map((fixture: FixtureProps, index: number) => (
        <Fixture key={index} fixture={fixture} />
      ))}
    </div>
  )
}
