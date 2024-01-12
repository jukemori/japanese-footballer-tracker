import { getPlayer, getPlayerStats, getFixtures } from '@/utils';
import { PlayerProps, StatsProps, FixtureProps } from '@/types';
import { Stats, Fixture } from '@/components';
import Image from 'next/image';

interface HomeProps {
  player: PlayerProps;
  playerStatsArray: StatsProps[];
  fixtureArray: FixtureProps[];
}

async function fetchPlayerData(): Promise<HomeProps> {
  return {
    player: await getPlayer(),
    playerStatsArray: await getPlayerStats(),
    fixtureArray: await getFixtures(),
  };
}

function sortAndFilterFixtures(fixtureArray: FixtureProps[]): FixtureProps[] {
  const currentDate = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(currentDate.getDate() - 7);

  const filteredFixtures = fixtureArray
    .filter((fixture) => {
      const fixtureDate = new Date(fixture.fixture.date);
      return fixtureDate >= oneWeekAgo && fixtureDate <= currentDate;
    })
    .sort((a, b) => {
      const dateA = new Date(a.fixture.date);
      const dateB = new Date(b.fixture.date);
      return dateA.getTime() - dateB.getTime();
    });

  const upcomingFixtures = fixtureArray
    .filter((fixture) => {
      const fixtureDate = new Date(fixture.fixture.date);
      return fixtureDate > currentDate;
    })
    .sort((a, b) => {
      const dateA = new Date(a.fixture.date);
      const dateB = new Date(b.fixture.date);
      return dateA.getTime() - dateB.getTime();
    });

  return [...filteredFixtures, ...upcomingFixtures];
}

function Home({ player, playerStatsArray, fixtureArray }: HomeProps) {
  const filteredFixtures = sortAndFilterFixtures(fixtureArray);

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

      {filteredFixtures.map((fixture, index) => (
        <Fixture key={index} fixture={fixture} />
      ))}
    </div>
  );
}

export default async function HomePage() {
  const { player, playerStatsArray, fixtureArray } = await fetchPlayerData();

  return <Home player={player} playerStatsArray={playerStatsArray} fixtureArray={fixtureArray} />;
}
