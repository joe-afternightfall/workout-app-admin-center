import { ExerciseTypeDAO, SetType } from './ExerciseTypeDAO';

export class ExerciseTypeVO extends ExerciseTypeDAO {
  firebaseId: string;
  // [key: string]: string;

  constructor(
    firebaseId: string,
    id: string,
    name: string,
    muscleGroupIds: string[],
    setType: SetType
  ) {
    super(id, name, muscleGroupIds, setType);
    this.firebaseId = firebaseId;
  }
}
