import { Store } from 'redux';
import {
  loadCircuitTypes,
  loadExerciseTypes,
} from '../creators/workout-configurations';
import { loadUsersWorkouts } from '../creators/user-info';
import { getWorkoutsForUser } from '../services/workout-service';
import { getAllCircuitTypes } from '../services/workout-configurations/circuit-types-service';
import { getAllExerciseTypes } from '../services/workout-configurations/exercise-types-service';
import { CircuitTypeVO } from '../configs/models/workout-configurations/circuit-type/CircuitTypeVO';
import { ExerciseTypeVO } from '../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';
import { getCircuitTemplates } from '../services/circuit-template';
import { CircuitTemplateVO } from '../configs/models/CircuitTemplateVO';
import { loadCircuitTemplates } from '../creators/circuit-template';

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

export const updateUserWorkouts = async (store: Store): Promise<void> => {
  const email = store.getState().applicationState.userEmail;
  if (email) {
    const workouts = await getWorkoutsForUser(email);
    store.dispatch(loadUsersWorkouts(workouts));
  }
};

export const updateCircuitTemplates = async (store: Store): Promise<void> => {
  const templates: CircuitTemplateVO[] = await getCircuitTemplates();
  store.dispatch(loadCircuitTemplates(templates));
};
