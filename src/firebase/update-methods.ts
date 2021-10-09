import { Store } from 'redux';
import {
  loadExercises,
  loadExerciseTypes,
} from '../creators/workout-configurations';
import { loadUsersWorkouts } from '../creators/user-info';
import { getWorkoutsForUser } from '../services/workout-service';
import { getAllExercises } from '../services/workout-configurations/exercises';
import { getAllExerciseTypes } from '../services/workout-configurations/exercise-types-service';
import { ExerciseTypeVO } from '../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';

export const updateExerciseTypes = async (store: Store): Promise<void> => {
  const exercises: ExerciseTypeVO[] = await getAllExerciseTypes();
  exercises.sort((a: ExerciseTypeVO, b: ExerciseTypeVO) =>
    a.name.localeCompare(b.name)
  );
  store.dispatch(loadExerciseTypes(exercises));
};

export const updateUserWorkouts = async (store: Store): Promise<void> => {
  const email = store.getState().applicationState.userEmail;
  if (email) {
    const workouts = await getWorkoutsForUser(email);
    store.dispatch(loadUsersWorkouts(workouts));
  }
};

export const updateExercises = async (store: Store): Promise<void> => {
  const exercises = await getAllExercises();
  store.dispatch(loadExercises(exercises));
};
