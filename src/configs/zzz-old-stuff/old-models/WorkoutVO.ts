import { Timer, WorkoutCircuitProps, WorkoutDAO } from './WorkoutDAO';

export class WorkoutVO extends WorkoutDAO {
  firebaseId: string;

  constructor(
    firebaseId: string,
    id: string,
    email: string,
    circuits: WorkoutCircuitProps[],
    date: string,
    time: Timer
  ) {
    super(id, email, circuits, date, time);
    this.firebaseId = firebaseId;
  }
}
