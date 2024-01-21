import { PlayerStatsProps } from "@/types";

interface PlayerStatsArrayProps {
  playerStats: PlayerStatsProps
}
const PlayerFixtureStats = ({playerStats}: PlayerStatsArrayProps) => {
  console.log('ps', playerStats)
  return (
    <div>
      <h2>Player Fixture Stats</h2>
      <div>
        <strong>Games:</strong>
        <p>Minutes: {playerStats.games.minutes}</p>
        <p>Rating: {playerStats.games.rating}</p>
      </div>
      <div>
        <strong>Shots:</strong>
        <p>Total: {playerStats.shots.total}</p>
      </div>
      <div>
        <strong>Passes:</strong>
        <p>Total: {playerStats.passes.total}</p>
        <p>Key passes: {playerStats.passes.key}</p>
      </div>
      <div>
        <strong>Dribbles:</strong>
        <p>Attempts: {playerStats.dribbles.attempts}</p>
        <p>Success: {playerStats.dribbles.success}</p>
      </div>
      <div>
        <strong>Fouls:</strong>
        <p>Drawn: {playerStats.fouls.drawn}</p>
        <p>Comitted: {playerStats.fouls.committed}</p>
      </div>
    </div>
  );
}

export default PlayerFixtureStats
