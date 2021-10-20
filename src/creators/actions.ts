import { LocationChangeAction } from 'connected-react-router';
import { LoadUsersWorkoutsAction, ValidatedUserAction } from './user-info';
import {
  LoadExercisesAction,
  LoadExerciseTypesAction,
  LoadRoutineTemplatesAction,
} from './workout-configurations';
import {
  ApplyHoverStylesToMuscleGroupAction,
  ClearHoverStylesForMuscleGroupAction,
  ToggleMuscleGroupAction,
} from './muscle-selector';
import {
  DisplayAppSnackbarAction,
  HideAppSnackbarAction,
} from './app-snackbar';
import {
  AddPhaseToRoutineAction,
  AddSegmentToPhaseAction,
  BuildNewRoutineAction,
  SelectPhaseAction,
  SelectSetTypeAction,
  UpdateRoutineTitleAction,
  UpdateSelectedCategoryIdAction,
  UpdateRestBetweenAction,
  SelectedExerciseSlotToFillAction,
  AddExerciseToSegmentAction,
  DeleteExerciseFromSegmentAction,
  ResetSetTypeAndExerciseInfoAction,
  AddSetToEachExerciseInSegmentAction,
  DeleteSetFromEachExerciseInSegmentAction,
  DeleteSegmentFromPhaseAction,
  ReorderRoutinePhasesAction,
  DeletePhaseFromRoutineAction,
  ReorderRoutineSegmentsAction,
  FilterExercisesForSearchValueAction,
  ViewSelectedRoutineAction,
  ClearRoutineBuilderAction,
} from './routine-builder/builder';
import { HideAppBarAction, LogoutUserAction } from './application';

export enum ActionTypes {
  // Application Actions
  INITIALIZE = 'INITIALIZE',
  VALIDATED_USER = 'VALIDATED_USER',
  DISPLAY_APP_SNACKBAR = 'DISPLAY_APP_SNACKBAR',
  HIDE_APP_SNACKBAR = 'HIDE_APP_SNACKBAR',
  HIDE_APP_BAR = 'HIDE_APP_BAR',

  // Workout configurations
  LOAD_EXERCISE_TYPES = 'LOAD_EXERCISE_TYPES',
  LOAD_USER_WORKOUTS = 'LOAD_USER_WORKOUTS',

  // New Workout Configs
  LOAD_EXERCISES = 'LOAD_EXERCISES',
  LOAD_ROUTINE_TEMPLATES = 'LOAD_ROUTINE_TEMPLATES',

  // Routine Builder Actions
  BUILD_NEW_ROUTINE = 'BUILD_NEW_ROUTINE',
  VIEW_SELECTED_ROUTINE = 'VIEW_SELECTED_ROUTINE',
  CLEAR_ROUTINE_BUILDER = 'CLEAR_ROUTINE_BUILDER',
  UPDATE_ROUTINE_TITLE = 'UPDATE_ROUTINE_TITLE',
  UPDATE_SELECTED_CATEGORY_ID = 'UPDATE_SELECTED_CATEGORY_ID',
  ADD_PHASE_TO_ROUTINE = 'ADD_PHASE_TO_ROUTINE',
  SELECT_PHASE = 'SELECT_PHASE',
  SELECT_SET_TYPE = 'SELECT_SET_TYPE',
  ADD_SEGMENT_TO_PHASE = 'ADD_SEGMENT_TO_PHASE',
  UPDATE_REST_BETWEEN = 'UPDATE_REST_BETWEEN',
  SELECTED_EXERCISE_SLOT_TO_FILL = 'SELECTED_EXERCISE_SLOT_TO_FILL',
  ADD_EXERCISE_TO_SEGMENT = 'ADD_EXERCISE_TO_SEGMENT',
  DELETE_EXERCISE_FROM_SEGMENT = 'DELETE_EXERCISE_FROM_SEGMENT',
  RESET_SET_TYPE_AND_EXERCISE_INFO = 'RESET_SET_TYPE_AND_EXERCISE_INFO',
  ADD_SET_TO_EACH_EXERCISE_IN_SEGMENT = 'ADD_SET_TO_EACH_EXERCISE_IN_SEGMENT',
  DELETE_SET_FROM_EACH_EXERCISE_IN_SEGMENT = 'DELETE_SET_FROM_EACH_EXERCISE_IN_SEGMENT',
  DELETE_SEGMENT_FROM_PHASE = 'DELETE_SEGMENT_FROM_PHASE',
  REORDER_ROUTINE_PHASES = 'REORDER_ROUTINE_PHASES',
  DELETE_PHASE_FROM_ROUTINE = 'DELETE_PHASE_FROM_ROUTINE',
  REORDER_ROUTINE_SEGMENTS = 'REORDER_ROUTINE_SEGMENTS',
  FILTER_EXERCISES_FOR_SEARCH_VALUE = 'FILTER_EXERCISES_FOR_SEARCH_VALUE',
  ADD_TIMER_TO_WORKOUT_EXERCISE = 'ADD_TIMER_TO_WORKOUT_EXERCISE',

  // Side drawer actions
  LOGOUT_USER = 'LOGOUT_USER',

  // Manikin Muscle Group Selector
  TOGGLE_MUSCLE_GROUP = 'TOGGLE_MUSCLE_GROUP',
  APPLY_HOVER_STYLES_TO_MUSCLE_GROUP = 'APPLY_HOVER_STYLES_TO_MUSCLE_GROUP',
  CLEAR_HOVER_STYLES_FOR_MUSCLE_GROUP = 'CLEAR_HOVER_STYLES_FOR_MUSCLE_GROUP',
}

export type ApplicationActions =
  | LocationChangeAction
  | ValidatedUserAction
  | LogoutUserAction
  | LoadUsersWorkoutsAction
  | LoadExerciseTypesAction
  | ToggleMuscleGroupAction
  | ApplyHoverStylesToMuscleGroupAction
  | ClearHoverStylesForMuscleGroupAction
  | LoadExercisesAction
  | HideAppSnackbarAction
  | DisplayAppSnackbarAction
  | BuildNewRoutineAction
  | UpdateRoutineTitleAction
  | UpdateSelectedCategoryIdAction
  | AddPhaseToRoutineAction
  | SelectPhaseAction
  | SelectSetTypeAction
  | AddSegmentToPhaseAction
  | UpdateRestBetweenAction
  | HideAppBarAction
  | SelectedExerciseSlotToFillAction
  | AddExerciseToSegmentAction
  | DeleteExerciseFromSegmentAction
  | ResetSetTypeAndExerciseInfoAction
  | AddSetToEachExerciseInSegmentAction
  | DeleteSetFromEachExerciseInSegmentAction
  | DeleteSegmentFromPhaseAction
  | ReorderRoutinePhasesAction
  | DeletePhaseFromRoutineAction
  | ReorderRoutineSegmentsAction
  | FilterExercisesForSearchValueAction
  | LoadRoutineTemplatesAction
  | ViewSelectedRoutineAction
  | ClearRoutineBuilderAction;
