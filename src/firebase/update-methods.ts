import { Store } from 'redux';
import {
  loadExercises,
  loadExerciseTypes,
  loadRoutineTemplates,
  loadGripTypes,
  loadGripWidths,
} from '../creators/load-workout-configs';
import { getAllExerciseTypes } from '../services/workout-configurations/exercise-types-service';
import { ExerciseTypeVO } from '../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';
import {
  getAllActiveGripTypes,
  getAllActiveGripWidths,
  getAllExercises,
  getAllRoutineTemplates,
} from 'workout-app-common-core';

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

export const updateGripTypes = async (store: Store): Promise<void> => {
  const activeGripTypes = await getAllActiveGripTypes();
  store.dispatch(loadGripTypes(activeGripTypes));
};

export const updateGripWidths = async (store: Store): Promise<void> => {
  const activeGripWidths = await getAllActiveGripWidths();
  store.dispatch(loadGripWidths(activeGripWidths));
};
