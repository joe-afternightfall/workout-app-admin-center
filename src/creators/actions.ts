import { LocationChangeAction } from 'connected-react-router';
import { LoadUsersWorkoutsAction, ValidatedUserAction } from './user-info';
import {
  CloseSideDrawerAction,
  OpenSideDrawerAction,
  SetDrawerSizeAction,
  UserClickedCloseDrawerAction,
  UserClickedOpenDrawerAction,
  LogoutUserAction,
} from './side-drawer';
import { LoadCircuitTemplatesAction } from './circuit-template';
import {
  LoadCircuitTypesAction,
  LoadExercisesAction,
  LoadExerciseTypesAction,
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
  BuildNewRoutineAction,
  SelectPhaseAction,
  SetActiveCardAction,
  UpdateRoutineTitleAction,
  UpdateSelectedCategoryIdAction,
} from './routine-builder/builder';

export enum ActionTypes {
  // Application Actions
  INITIALIZE = 'INITIALIZE',
  VALIDATED_USER = 'VALIDATED_USER',
  DISPLAY_APP_SNACKBAR = 'DISPLAY_APP_SNACKBAR',
  HIDE_APP_SNACKBAR = 'HIDE_APP_SNACKBAR',

  // Workout configurations
  LOAD_EXERCISE_TYPES = 'LOAD_EXERCISE_TYPES',
  LOAD_CIRCUIT_TYPES = 'LOAD_CIRCUIT_TYPES',
  LOAD_CIRCUIT_TEMPLATES = 'LOAD_CIRCUIT_TEMPLATES',
  LOAD_USER_WORKOUTS = 'LOAD_USER_WORKOUTS',

  // New Workout Configs
  LOAD_EXERCISES = 'LOAD_EXERCISES',

  // Routine Builder Actions
  BUILD_NEW_ROUTINE = 'BUILD_NEW_ROUTINE',
  SELECT_ACTIVE_CARD = 'SELECT_ACTIVE_CARD',
  UPDATE_ROUTINE_TITLE = 'UPDATE_ROUTINE_TITLE',
  UPDATE_SELECTED_CATEGORY_ID = 'UPDATE_SELECTED_CATEGORY_ID',
  ADD_PHASE_TO_ROUTINE = 'ADD_PHASE_TO_ROUTINE',
  SELECT_PHASE = 'SELECT_PHASE',

  // Side drawer actions
  CLOSE_SIDE_DRAWER = 'CLOSE_SIDE_DRAWER',
  OPEN_SIDE_DRAWER = 'OPEN_SIDE_DRAWER',
  SET_DRAWER_SIZE = 'SET_DRAWER_SIZE',
  USER_CLICKED_CLOSE_DRAWER = 'USER_CLICKED_CLOSE_DRAWER',
  USER_CLICKED_OPEN_DRAWER = 'USER_CLICKED_OPEN_DRAWER',
  LOGOUT_USER = 'LOGOUT_USER',

  // Manikin Muscle Group Selector
  TOGGLE_MUSCLE_GROUP = 'TOGGLE_MUSCLE_GROUP',
  APPLY_HOVER_STYLES_TO_MUSCLE_GROUP = 'APPLY_HOVER_STYLES_TO_MUSCLE_GROUP',
  CLEAR_HOVER_STYLES_FOR_MUSCLE_GROUP = 'CLEAR_HOVER_STYLES_FOR_MUSCLE_GROUP',
}

export type ApplicationActions =
  | LocationChangeAction
  | ValidatedUserAction
  | CloseSideDrawerAction
  | OpenSideDrawerAction
  | SetDrawerSizeAction
  | UserClickedCloseDrawerAction
  | UserClickedOpenDrawerAction
  | LogoutUserAction
  | LoadCircuitTemplatesAction
  | LoadUsersWorkoutsAction
  | LoadExerciseTypesAction
  | LoadCircuitTypesAction
  | ToggleMuscleGroupAction
  | ApplyHoverStylesToMuscleGroupAction
  | ClearHoverStylesForMuscleGroupAction
  | LoadExercisesAction
  | HideAppSnackbarAction
  | DisplayAppSnackbarAction
  | BuildNewRoutineAction
  | SetActiveCardAction
  | UpdateRoutineTitleAction
  | UpdateSelectedCategoryIdAction
  | AddPhaseToRoutineAction
  | SelectPhaseAction;
