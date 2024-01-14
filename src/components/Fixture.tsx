import { FixtureArrayProps } from '@/types'

function Fixture({ fixture }: FixtureArrayProps) {
  return (
    <div>
      <h2>Competition: {fixture.league.name}</h2>
      <p>Date {fixture.fixture.date}</p>
      <p>Home: {fixture.goals.home}</p>
      <p>Away: {fixture.goals.away}</p>
    </div>
  )
}

export default Fixture