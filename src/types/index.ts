interface Team {
  id: number;
  name: string;
  logo: string;
}

interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
}

interface Games {
  appearences: number;
  lineups: number;
  minutes: number;
  number: number | null;
  position: string;
  rating: string | null;
  captain: boolean;
}

interface Substitutes {
  in: number;
  out: number;
  bench: number;
}

interface Shots {
  total: number | null;
  on: number | null;
}

interface Goals {
  total: number;
  conceded: number | null;
  assists: number | null;
  saves: number | null;
}

interface Passes {
  total: number | null;
  key: number | null;
  accuracy: number | null;
}

interface Tackles {
  total: number | null;
  blocks: number | null;
  interceptions: number | null;
}

interface Duels {
  total: number | null;
  won: number | null;
}

interface Dribbles {
  attempts: number | null;
  success: number | null;
  past: number | null;
}

interface Fouls {
  drawn: number | null;
  committed: number | null;
}

interface Cards {
  yellow: number;
  yellowred: number;
  red: number;
}

interface Penalty {
  won: number | null;
  commited: number | null;
  scored: number | null;
  missed: number | null;
  saved: number | null;
}

export interface PlayerProps {
  name: string;
  photo: string;
  height: number;
  weight: number;
}

export interface StatsProps {
  team: Team;
  league: League;
  games: Games;
  substitutes: Substitutes;
  shots: Shots;
  goals: Goals;
  passes: Passes;
  tackles: Tackles;
  duels: Duels;
  dribbles: Dribbles;
  fouls: Fouls;
  cards: Cards;
  penalty: Penalty;
}

export interface StatsArrayProps {
  stats: StatsProps;
}

interface Fixture {
  id: number;
  referee: string | null;
  timezone: string;
  date: string;
  timestamp: number;
  periods: any;
  venue: any;
  status: any;
}


interface Teams {
  home: any;
  away: any;
}

interface Goals {
  home: number;
  away: number;
}

interface Score {
  halftime: any;
  fulltime: any;
  extratime: any;
  penalty: any;
}

export interface FixtureProps {
  fixture: Fixture;
  league: League;
  teams: Teams;
  goals: Goals;
  score: Score;
}

export interface FixtureArrayProps {
  fixture: FixtureProps;
}

interface PlayerGame {
  minutes: number | null;
  number: number | null;
  position: string;
  rating: string;
  captain: boolean;
  substitute: boolean;
}
export interface PlayerStats {
  games: PlayerGame;
  offsides: number | null;
  shots: Shots;
  goals: Goals;
  passes: Passes;
  tackles: Tackles;
  duels: Duels;
  dribbles: Dribbles;
  fouls: Fouls;
  cards: Cards;
  penalty: Penalty;
};
