export enum SetType {
  WEIGHTS = 'weights',
  TIME = 'time',
  TIME_AND_DISTANCE = 'time-and-distance',
  TIME_AND_REPS = 'time-and-reps',
  REPS = 'reps',
}

export class ExerciseTypeDAO {
  id: string;
  name: string;
  muscleGroupIds: string[];
  setType: SetType;

  constructor(
    id: string,
    name: string,
    muscleGroupIds: string[],
    setType: SetType
  ) {
    this.id = id;
    this.name = name;
    this.muscleGroupIds = muscleGroupIds;
    this.setType = setType;
  }
}
