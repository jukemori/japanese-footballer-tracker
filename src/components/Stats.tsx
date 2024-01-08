import { StatsArrayProps } from '@/types'

function Stats({ stats }: StatsArrayProps) {
  return (
    <div>
      <h2>{stats.team.name}</h2>
      <p>League: {stats.league.name}</p>
      <p>Country: {stats.league.country}</p>
      {/* Add other stats rendering here */}
    </div>
  )
}

export default Stats
