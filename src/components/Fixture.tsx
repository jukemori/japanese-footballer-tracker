import { FixtureArrayProps } from '@/types'

function Fixture({ fixture }: FixtureArrayProps) {
  const fixtureTime = new Date(fixture.fixture.date)
  const localTime = fixtureTime.toLocaleString()
  return (
    <div>
      <h2>Competition: {fixture.league.name}</h2>
      <p>Date {localTime}</p>
      <p>Home: {fixture.goals.home}</p>
      <p>Away: {fixture.goals.away}</p>
    </div>
  )
}

export default Fixture
