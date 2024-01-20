import { StatsArrayProps } from '@/types'

function CompetitionStats({ stats }: StatsArrayProps) {
  return (
    <div>
      <h2>Competition: {stats.league.name}</h2>
      <p>Games Played: {stats.games.appearences}</p>
      <p>Goals: {stats.goals.total}</p>
      <p>Assists: {stats.goals.assists}</p>
    </div>
  )
}

export default CompetitionStats
