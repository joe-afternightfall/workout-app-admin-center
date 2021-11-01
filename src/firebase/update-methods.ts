import { Store } from 'redux';
import {
  loadExercises,
  loadExerciseTypes,
  loadRoutineTemplates,
  loadGripTypes,
  loadGripWidths,
  loadManikinMuscleGroups,
  loadMuscles,
  loadMuscleTargetTypes,
  loadParameterTypes,
  loadPhases,
  loadTrainingSetTypes,
  loadWorkoutCategories,
  loadWorkoutEquipment,
} from '../creators/load-workout-configs';
import { getAllExerciseTypes } from '../services/workout-configurations/exercise-types-service';
import { ExerciseTypeVO } from '../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';
import {
  getAllActiveGripTypes,
  getAllActiveGripWidths,
  getAllActiveManikinMuscleGroups,
  getAllActiveMuscles,
  getAllActiveMuscleTargetTypes,
  getAllActiveParameterTypes,
  getAllActivePhases,
  getAllActiveTrainingSetTypes,
  getAllActiveWorkoutCategories,
  getAllActiveWorkoutEquipment,
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

export const updateManikinMuscleGroups = async (
  store: Store
): Promise<void> => {
  const activeManikinMuscleGroups = await getAllActiveManikinMuscleGroups();
  store.dispatch(loadManikinMuscleGroups(activeManikinMuscleGroups));
};

export const updateMuscles = async (store: Store): Promise<void> => {
  const activeMuscles = await getAllActiveMuscles();
  store.dispatch(loadMuscles(activeMuscles));
};

export const updateMuscleTargetTypes = async (store: Store): Promise<void> => {
  const activeMuscleTargetTypes = await getAllActiveMuscleTargetTypes();
  store.dispatch(loadMuscleTargetTypes(activeMuscleTargetTypes));
};

export const updateParameterTypes = async (store: Store): Promise<void> => {
  const activeParameterTypes = await getAllActiveParameterTypes();
  store.dispatch(loadParameterTypes(activeParameterTypes));
};

export const updatePhases = async (store: Store): Promise<void> => {
  const activePhases = await getAllActivePhases();
  store.dispatch(loadPhases(activePhases));
};

export const updateTrainingSetTypes = async (store: Store): Promise<void> => {
  const activeTrainingSetTypes = await getAllActiveTrainingSetTypes();
  store.dispatch(loadTrainingSetTypes(activeTrainingSetTypes));
};

export const updateWorkoutCategories = async (store: Store): Promise<void> => {
  const activeWorkoutCategories = await getAllActiveWorkoutCategories();
  store.dispatch(loadWorkoutCategories(activeWorkoutCategories));
};

export const updateWorkoutEquipment = async (store: Store): Promise<void> => {
  const activeWorkoutEquipment = await getAllActiveWorkoutEquipment();
  store.dispatch(loadWorkoutEquipment(activeWorkoutEquipment));
};
