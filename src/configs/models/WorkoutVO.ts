import { Timer, WorkoutDAO } from './WorkoutDAO';
import { WorkoutCircuitProps } from '../../components/top-level-components/workout-screen/WorkoutScreen';

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
