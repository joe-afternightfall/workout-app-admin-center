import { WorkoutCircuitProps } from '../../components/top-level-components/workout-screen/WorkoutScreen';

export interface Timer {
  currentTimeMs: number;
  currentTimeSec: number;
  currentTimeMin: number;
}

export class WorkoutDAO {
  id: string;
  email: string;
  circuits: WorkoutCircuitProps[];
  date: string;
  time: Timer;

  constructor(
    id: string,
    email: string,
    circuits: WorkoutCircuitProps[],
    date: string,
    time: Timer
  ) {
    this.id = id;
    this.email = email;
    this.circuits = circuits;
    this.date = date;
    this.time = time;
  }
}
