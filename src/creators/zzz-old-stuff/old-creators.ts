import { OldActionTypes as ActionTypes } from './old-actions';
import { CircuitTemplateVO } from '../../configs/zzz-old-stuff/old-models/CircuitTemplateVO';
import { ExerciseTypeVO } from '../../configs/zzz-old-stuff/old-models/ExerciseTypeVO';
import { CircuitTypeVO } from '../../configs/zzz-old-stuff/old-models/CircuitTypeVO';
import { WorkoutCircuitProps } from '../../configs/zzz-old-stuff/old-models/WorkoutDAO';
import { StopwatchState } from '../../components/zzz-old-stuff/widgets/old-workout-screen/stopwatch/Stopwatch';
import { WorkoutVO } from '../../configs/zzz-old-stuff/old-models/WorkoutVO';

export interface LoadCircuitTemplatesAction {
  type: ActionTypes.LOAD_CIRCUIT_TEMPLATES;
  templates: CircuitTemplateVO[];
}

export const loadCircuitTemplates = (
  templates: CircuitTemplateVO[]
): LoadCircuitTemplatesAction => {
  return {
    type: ActionTypes.LOAD_CIRCUIT_TEMPLATES,
    templates: templates,
  };
};

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

export interface UpdateWorkoutDateAction {
  type: ActionTypes.UPDATE_WORKOUT_DATE;
  date: Date;
}

export const updateWorkoutDate = (date: Date): UpdateWorkoutDateAction => {
  return {
    type: ActionTypes.UPDATE_WORKOUT_DATE,
    date: date,
  };
};

export interface AddCircuitAction {
  type: ActionTypes.ADD_CIRCUIT;
  circuit: WorkoutCircuitProps;
}

export const addCircuit = (circuit: WorkoutCircuitProps): AddCircuitAction => {
  return {
    type: ActionTypes.ADD_CIRCUIT,
    circuit: circuit,
  };
};

export interface DeleteCircuitAction {
  type: ActionTypes.DELETE_CIRCUIT;
  id: string;
}

export const deleteCircuit = (id: string): DeleteCircuitAction => {
  return {
    type: ActionTypes.DELETE_CIRCUIT,
    id: id,
  };
};

export interface AddExerciseToCircuitAction {
  type: ActionTypes.ADD_EXERCISE_TO_CIRCUIT;
  circuitId: string;
  exerciseId: string;
}

export const addExerciseToCircuit = (
  circuitId: string,
  exerciseId: string
): AddExerciseToCircuitAction => {
  return {
    type: ActionTypes.ADD_EXERCISE_TO_CIRCUIT,
    circuitId: circuitId,
    exerciseId: exerciseId,
  };
};

export interface DeleteExerciseFromCircuitAction {
  type: ActionTypes.DELETE_EXERCISE_FROM_CIRCUIT;
  circuitId: string;
  exerciseId: string;
}

export const deleteExerciseFromCircuit = (
  circuitId: string,
  exerciseId: string
): DeleteExerciseFromCircuitAction => {
  return {
    type: ActionTypes.DELETE_EXERCISE_FROM_CIRCUIT,
    circuitId: circuitId,
    exerciseId: exerciseId,
  };
};

export interface AddExerciseSetToCircuitAction {
  type: ActionTypes.ADD_EXERCISE_SET_TO_CIRCUIT;
  circuitId: string;
  exerciseId: string;
}

export const addExerciseSetToCircuit = (
  circuitId: string,
  exerciseId: string
): AddExerciseSetToCircuitAction => {
  return {
    type: ActionTypes.ADD_EXERCISE_SET_TO_CIRCUIT,
    circuitId: circuitId,
    exerciseId: exerciseId,
  };
};

export interface DeleteExerciseSetFromCircuitAction {
  type: ActionTypes.DELETE_EXERCISE_SET_FROM_CIRCUIT;
  setId: string;
  circuitId: string;
  exerciseId: string;
}

export const deleteExerciseSetFromCircuit = (
  setId: string,
  circuitId: string,
  exerciseId: string
): DeleteExerciseSetFromCircuitAction => {
  return {
    type: ActionTypes.DELETE_EXERCISE_SET_FROM_CIRCUIT,
    setId: setId,
    circuitId: circuitId,
    exerciseId: exerciseId,
  };
};

export interface ToggleExerciseSetAsDoneAction {
  type: ActionTypes.TOGGLE_EXERCISE_SET_DONE;
  setId: string;
  circuitId: string;
  exerciseId: string;
}

export const toggleExerciseSetAsDone = (
  setId: string,
  circuitId: string,
  exerciseId: string
): ToggleExerciseSetAsDoneAction => {
  return {
    type: ActionTypes.TOGGLE_EXERCISE_SET_DONE,
    setId: setId,
    circuitId: circuitId,
    exerciseId: exerciseId,
  };
};

export interface UpdateWorkoutSetFieldAction {
  type: ActionTypes.UPDATE_WORKOUT_SET_FIELD;
  circuitId: string;
  exerciseId: string;
  setId: string;
  name: 'weight' | 'reps';
  value: string;
}

export interface UpdateWorkoutSetFieldProps {
  circuitId: string;
  exerciseId: string;
  setId: string;
  name: 'weight' | 'reps';
  value: string;
}

export const updateWorkoutSetField = (
  props: UpdateWorkoutSetFieldProps
): UpdateWorkoutSetFieldAction => {
  return {
    type: ActionTypes.UPDATE_WORKOUT_SET_FIELD,
    circuitId: props.circuitId,
    exerciseId: props.exerciseId,
    setId: props.setId,
    name: props.name,
    value: props.value,
  };
};

export interface UpdateTimeSetFieldProps {
  circuitId: string;
  exerciseId: string;
  setId: string;
  name: 'hours' | 'minutes' | 'seconds';
  value: string;
}

export interface UpdateTimeSetFieldAction {
  type: ActionTypes.UPDATE_TIME_SET_FIELD;
  circuitId: string;
  exerciseId: string;
  setId: string;
  name: 'hours' | 'minutes' | 'seconds';
  value: string;
}

export const updateTimeSetField = (
  props: UpdateTimeSetFieldProps
): UpdateTimeSetFieldAction => {
  return {
    type: ActionTypes.UPDATE_TIME_SET_FIELD,
    circuitId: props.circuitId,
    exerciseId: props.exerciseId,
    setId: props.setId,
    name: props.name,
    value: props.value,
  };
};

export interface UpdateDistanceSetFieldProps {
  circuitId: string;
  exerciseId: string;
  setId: string;
  name: 'value' | 'unit';
  value: string;
}

export interface UpdateDistanceSetFieldAction {
  type: ActionTypes.UPDATE_DISTANCE_SET_FIELD;
  circuitId: string;
  exerciseId: string;
  setId: string;
  name: 'value' | 'unit';
  value: string;
}

export const updateDistanceSetField = (
  props: UpdateDistanceSetFieldProps
): UpdateDistanceSetFieldAction => {
  return {
    type: ActionTypes.UPDATE_DISTANCE_SET_FIELD,
    circuitId: props.circuitId,
    exerciseId: props.exerciseId,
    setId: props.setId,
    name: props.name,
    value: props.value,
  };
};

export interface ToggleAccordionAction {
  type: ActionTypes.TOGGLE_ACCORDION;
  panel: string;
}

export const toggleAccordion = (panel: string): ToggleAccordionAction => {
  return {
    type: ActionTypes.TOGGLE_ACCORDION,
    panel: panel,
  };
};

export interface ClearWorkoutScreenAction {
  type: ActionTypes.CLEAR_WORKOUT_SCREEN;
}

export const clearWorkoutScreen = (): ClearWorkoutScreenAction => {
  return {
    type: ActionTypes.CLEAR_WORKOUT_SCREEN,
  };
};

export interface StopStopwatchAction {
  type: ActionTypes.STOP_STOPWATCH;
}

export const stopStopwatch = (): StopStopwatchAction => {
  return {
    type: ActionTypes.STOP_STOPWATCH,
  };
};

export interface StartStopwatchAction {
  type: ActionTypes.START_STOPWATCH;
  watch: ReturnType<typeof setTimeout>;
}

export const startStopwatch = (
  watch: ReturnType<typeof setTimeout>
): StartStopwatchAction => {
  return {
    type: ActionTypes.START_STOPWATCH,
    watch: watch,
  };
};

export interface ResetStopwatchAction {
  type: ActionTypes.RESET_STOPWATCH;
}

export const resetStopwatch = (): ResetStopwatchAction => {
  return {
    type: ActionTypes.RESET_STOPWATCH,
  };
};

export interface UpdateStopwatchAction {
  type: ActionTypes.UPDATE_STOPWATCH;
  stopwatchState: StopwatchState;
}

export const updateStopwatch = (
  state: StopwatchState
): UpdateStopwatchAction => {
  return {
    type: ActionTypes.UPDATE_STOPWATCH,
    stopwatchState: state,
  };
};

export interface LoadUsersWorkoutsAction {
  type: ActionTypes.LOAD_USER_WORKOUTS;
  workouts: WorkoutVO[];
}

export const loadUsersWorkouts = (
  workouts: WorkoutVO[]
): LoadUsersWorkoutsAction => {
  return {
    type: ActionTypes.LOAD_USER_WORKOUTS,
    workouts: workouts,
  };
};
