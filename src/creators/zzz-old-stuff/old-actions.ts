import {
  AddCircuitAction,
  AddExerciseSetToCircuitAction,
  AddExerciseToCircuitAction,
  ClearWorkoutScreenAction,
  DeleteCircuitAction,
  DeleteExerciseFromCircuitAction,
  DeleteExerciseSetFromCircuitAction,
  LoadCircuitTemplatesAction,
  LoadCircuitTypesAction,
  LoadExerciseTypesAction,
  LoadUsersWorkoutsAction,
  ResetStopwatchAction,
  StartStopwatchAction,
  StopStopwatchAction,
  ToggleAccordionAction,
  ToggleExerciseSetAsDoneAction,
  UpdateDistanceSetFieldAction,
  UpdateStopwatchAction,
  UpdateTimeSetFieldAction,
  UpdateWorkoutDateAction,
  UpdateWorkoutSetFieldAction,
} from './old-creators';
import {
  ApplyHoverStylesToMuscleGroupAction,
  ClearHoverStylesForMuscleGroupAction,
  ToggleMuscleGroupAction,
} from '../muscle-selector';

export enum OldActionTypes {
  // Workout configurations
  LOAD_EXERCISE_TYPES = 'LOAD_EXERCISE_TYPES',
  LOAD_CIRCUIT_TYPES = 'LOAD_CIRCUIT_TYPES',
  LOAD_CIRCUIT_TEMPLATES = 'LOAD_CIRCUIT_TEMPLATES',
  UPDATE_WORKOUT_DATE = 'UPDATE_WORKOUT_DATE',
  ADD_CIRCUIT = 'ADD_CIRCUIT',
  DELETE_CIRCUIT = 'DELETE_CIRCUIT',
  ADD_EXERCISE_TO_CIRCUIT = 'ADD_EXERCISE_TO_CIRCUIT',
  DELETE_EXERCISE_FROM_CIRCUIT = 'DELETE_EXERCISE_FROM_CIRCUIT',
  ADD_EXERCISE_SET_TO_CIRCUIT = 'ADD_EXERCISE_SET_TO_CIRCUIT',
  DELETE_EXERCISE_SET_FROM_CIRCUIT = 'DELETE_EXERCISE_SET_FROM_CIRCUIT',
  TOGGLE_EXERCISE_SET_DONE = 'TOGGLE_EXERCISE_SET_DONE',
  UPDATE_WORKOUT_SET_FIELD = 'UPDATE_WORKOUT_SET_FIELD',
  UPDATE_TIME_SET_FIELD = 'UPDATE_TIME_SET_FIELD',
  UPDATE_DISTANCE_SET_FIELD = 'UPDATE_DISTANCE_SET_FIELD',
  TOGGLE_ACCORDION = 'TOGGLE_ACCORDION',
  CLEAR_WORKOUT_SCREEN = 'CLEAR_WORKOUT_SCREEN',
  LOAD_USER_WORKOUTS = 'LOAD_USER_WORKOUTS',
  TOGGLE_MUSCLE_GROUP = 'TOGGLE_MUSCLE_GROUP',
  APPLY_HOVER_STYLES_TO_MUSCLE_GROUP = 'APPLY_HOVER_STYLES_TO_MUSCLE_GROUP',
  CLEAR_HOVER_STYLES_FOR_MUSCLE_GROUP = 'CLEAR_HOVER_STYLES_FOR_MUSCLE_GROUP',

  // Stopwatch
  RESET_STOPWATCH = 'RESET_STOPWATCH',
  START_STOPWATCH = 'START_STOPWATCH',
  STOP_STOPWATCH = 'STOP_STOPWATCH',
  UPDATE_STOPWATCH = 'UPDATE_STOPWATCH',
}

export type OldApplicationActions =
  | LoadExerciseTypesAction
  | LoadCircuitTypesAction
  | UpdateWorkoutDateAction
  | AddCircuitAction
  | DeleteCircuitAction
  | AddExerciseToCircuitAction
  | DeleteExerciseFromCircuitAction
  | AddExerciseSetToCircuitAction
  | DeleteExerciseSetFromCircuitAction
  | ToggleExerciseSetAsDoneAction
  | ToggleAccordionAction
  | ClearWorkoutScreenAction
  | UpdateTimeSetFieldAction
  | UpdateDistanceSetFieldAction
  | UpdateWorkoutSetFieldAction
  | LoadUsersWorkoutsAction
  | StopStopwatchAction
  | StartStopwatchAction
  | ResetStopwatchAction
  | UpdateStopwatchAction
  | ToggleMuscleGroupAction
  | ApplyHoverStylesToMuscleGroupAction
  | ClearHoverStylesForMuscleGroupAction
  | LoadCircuitTemplatesAction;
