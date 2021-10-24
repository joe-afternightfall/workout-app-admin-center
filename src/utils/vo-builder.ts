import { ExerciseTypeDAO } from '../configs/models/workout-configurations/exercise-type/ExerciseTypeDAO';
import { ExerciseTypeVO } from '../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';

export interface ExerciseTypeSnapshot {
  [key: string]: ExerciseTypeDAO;
}

export const exerciseTypeSnapToVO = (
  snap: ExerciseTypeSnapshot
): ExerciseTypeVO[] => {
  return Object.keys(snap).map((key: string): ExerciseTypeVO => {
    return {
      firebaseId: key,
      id: snap[key].id,
      name: snap[key].name,
      muscleGroupIds: snap[key].muscleGroupIds,
      setType: snap[key].setType,
    };
  });
};
