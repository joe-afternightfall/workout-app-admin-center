import { ActionTypes } from './actions';
import { ExerciseTypeVO } from '../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';
import { CircuitTypeVO } from '../configs/models/workout-configurations/circuit-type/CircuitTypeVO';

export interface LoadExerciseTypesAction {
  type: ActionTypes.LOAD_EXERCISE_TYPES;
  exerciseTypes: ExerciseTypeVO[];
}

export const loadExerciseTypes = (
  exerciseTypes: ExerciseTypeVO[]
): LoadExerciseTypesAction => {
  return {
    type: ActionTypes.LOAD_EXERCISE_TYPES,
    exerciseTypes: exerciseTypes,
  };
};

export interface LoadCircuitTypesAction {
  type: ActionTypes.LOAD_CIRCUIT_TYPES;
  circuitTypes: CircuitTypeVO[];
}

export const loadCircuitTypes = (
  circuitTypes: CircuitTypeVO[]
): LoadCircuitTypesAction => {
  return {
    type: ActionTypes.LOAD_CIRCUIT_TYPES,
    circuitTypes: circuitTypes,
  };
};
