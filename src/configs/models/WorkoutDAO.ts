export interface CircuitExerciseSet {
  id: string;
  setNumber: number;
  weight: string;
  reps: string;
  time: {
    hours: string;
    minutes: string;
    seconds: string;
  };
  distance: {
    unit: string;
    value: string;
  };
  markedDone: boolean;
}

export interface CircuitExercise {
  id: string;
  exerciseId: string;
  sets: CircuitExerciseSet[];
}

export interface WorkoutCircuitProps {
  id: string;
  name: string;
  exercises: CircuitExercise[];
}

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
