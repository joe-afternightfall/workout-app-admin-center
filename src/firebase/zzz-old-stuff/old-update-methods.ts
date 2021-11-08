import { Store } from 'redux';
import { CircuitTypeVO } from '../../configs/zzz-old-stuff/old-models/CircuitTypeVO';
import {
  loadCircuitTemplates,
  loadCircuitTypes,
  loadExerciseTypes,
  loadUsersWorkouts,
} from '../../creators/zzz-old-stuff/old-creators';
import { ExerciseTypeVO } from '../../configs/zzz-old-stuff/old-models/ExerciseTypeVO';
import {
  getAllCircuitTypes,
  getAllExerciseTypes,
  getCircuitTemplates,
  getWorkoutsForUser,
} from '../../services/zzz-old-stuff/old-workout-service';
import { CircuitTemplateVO } from '../../configs/zzz-old-stuff/old-models/CircuitTemplateVO';

export const updateCircuitTypes = async (store: Store): Promise<void> => {
  const circuits: CircuitTypeVO[] = await getAllCircuitTypes();
  circuits.sort((a: CircuitTypeVO, b: CircuitTypeVO) =>
    a.name.localeCompare(b.name)
  );
  store.dispatch(loadCircuitTypes(circuits));
};

export const updateExerciseTypes = async (store: Store): Promise<void> => {
  const exercises: ExerciseTypeVO[] = await getAllExerciseTypes();
  exercises.sort((a: ExerciseTypeVO, b: ExerciseTypeVO) =>
    a.name.localeCompare(b.name)
  );
  store.dispatch(loadExerciseTypes(exercises));
};

export const updateCircuitTemplates = async (store: Store): Promise<void> => {
  const templates: CircuitTemplateVO[] = await getCircuitTemplates();
  store.dispatch(loadCircuitTemplates(templates));
};

export const updateUserWorkouts = async (store: Store): Promise<void> => {
  const email = store.getState().applicationState.userEmail;
  if (email) {
    const workouts = await getWorkoutsForUser(email);
    store.dispatch(loadUsersWorkouts(workouts));
  }
};
