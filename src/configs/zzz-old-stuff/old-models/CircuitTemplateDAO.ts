export interface SetTemplate {
  setTemplateId: string;
  exerciseId: string;
  sets: number;
  weight: number;
  reps: number;
}

export class CircuitTemplateDAO {
  id: string;
  circuitId: string;
  circuitNickname: string;
  exercises: SetTemplate[];

  constructor(
    id: string,
    circuitId: string,
    circuitNickname: string,
    exercises: SetTemplate[]
  ) {
    this.id = id;
    this.circuitId = circuitId;
    this.circuitNickname = circuitNickname;
    this.exercises = exercises;
  }
}
