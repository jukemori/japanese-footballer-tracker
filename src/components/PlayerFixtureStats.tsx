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
        <p>Number: {playerStats.games.number}</p>
        <p>Position: {playerStats.games.position}</p>
      </div>
      <div>
        <strong>Shots:</strong>
        <p>Total: {playerStats.shots.total}</p>
        <p>On: {playerStats.shots.on}</p>
      </div>
    </div>
  );
}

export default PlayerFixtureStats
