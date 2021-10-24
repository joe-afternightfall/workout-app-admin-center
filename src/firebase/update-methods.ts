import { Store } from 'redux';
import {
  loadExercises,
  loadExerciseTypes,
  loadRoutineTemplates,
} from '../creators/workout-configurations';
import { getAllExercises } from '../services/workout-configurations/exercises';
import { getAllRoutineTemplates } from '../services/workout-configurations/routine-templates';
import { getAllExerciseTypes } from '../services/workout-configurations/exercise-types-service';
import { ExerciseTypeVO } from '../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';

export const updateExerciseTypes = async (store: Store): Promise<void> => {
  const exercises: ExerciseTypeVO[] = await getAllExerciseTypes();
  exercises.sort((a: ExerciseTypeVO, b: ExerciseTypeVO) =>
    a.name.localeCompare(b.name)
  );
  store.dispatch(loadExerciseTypes(exercises));
};

export const updateExercises = async (store: Store): Promise<void> => {
  const exercises = await getAllExercises();
  store.dispatch(loadExercises(exercises));
};

export const updateRoutineTemplates = async (store: Store): Promise<void> => {
  const routineTemplates = await getAllRoutineTemplates();
  store.dispatch(loadRoutineTemplates(routineTemplates));
};
