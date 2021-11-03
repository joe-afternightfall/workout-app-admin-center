import { LocationChangeAction } from 'connected-react-router';
import { ValidatedUserAction } from './user-info';
import {
  LoadExercisesAction,
  LoadExerciseTypesAction,
  LoadGripTypesAction,
  LoadGripWidthsAction,
  LoadManikinMuscleGroupsAction,
  LoadMusclesAction,
  LoadMuscleTargetTypesAction,
  LoadParameterTypesAction,
  LoadPhasesAction,
  LoadRoutineTemplatesAction,
  LoadTrainingSetTypesAction,
  LoadWorkoutCategoriesAction,
  LoadWorkoutEquipmentAction,
} from './load-workout-configs';
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
import {
  AddPrimaryMuscleTargetAction,
  AddSecondaryMuscleTargetAction,
  CloseExerciseFormDialogAction,
  DeletePrimaryMuscleTargetAction,
  DeleteSecondaryMuscleTargetAction,
  OpenEditingExerciseFormDialogAction,
  OpenNewExerciseFormDialogAction,
  SaveExerciseInfoAction,
  SelectAlternateSidesOptionAction,
  SelectExerciseMuscleIdAction,
  SelectExerciseParamTypeAction,
  SelectOptionalExerciseParamAction,
  SelectPrimaryMuscleAction,
  SelectSecondaryMuscleAction,
  SelectSecondaryTargetTypeAction,
  UpdateExerciseDescriptionAction,
  UpdateExerciseEquipmentListIdsAction,
  UpdateExerciseIconIdAction,
  UpdateExerciseManikinMuscleGroupAction,
  UpdateExerciseNameAction,
} from './exercise-form/exercise-form';

export enum ActionTypes {
  // Application Actions
  INITIALIZE = 'INITIALIZE',
  VALIDATED_USER = 'VALIDATED_USER',
  DISPLAY_APP_SNACKBAR = 'DISPLAY_APP_SNACKBAR',
  HIDE_APP_SNACKBAR = 'HIDE_APP_SNACKBAR',
  HIDE_APP_BAR = 'HIDE_APP_BAR',

  // Workout configurations
  LOAD_EXERCISE_TYPES = 'LOAD_EXERCISE_TYPES',

  // New Workout Configs
  LOAD_EXERCISES = 'LOAD_EXERCISES',
  LOAD_ROUTINE_TEMPLATES = 'LOAD_ROUTINE_TEMPLATES',
  LOAD_GRIP_TYPES = 'LOAD_GRIP_TYPES',
  LOAD_GRIP_WIDTHS = 'LOAD_GRIP_WIDTHS',
  LOAD_MANIKIN_MUSCLE_GROUP = 'LOAD_MANIKIN_MUSCLE_GROUP',
  LOAD_MUSCLES = 'LOAD_MUSCLES',
  LOAD_MUSCLE_TARGET_TYPES = 'LOAD_MUSCLE_TARGET_TYPES',
  LOAD_PARAMETER_TYPES = 'LOAD_PARAMETER_TYPES',
  LOAD_PHASES = 'LOAD_PHASES',
  LOAD_TRAINING_SET_TYPES = 'LOAD_TRAINING_SET_TYPES',
  LOAD_WORKOUT_CATEGORIES = 'LOAD_WORKOUT_CATEGORIES',
  LOAD_WORKOUT_EQUIPMENT = 'LOAD_WORKOUT_EQUIPMENT',

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
  RESET_SET_TYPE_AND_EXERCISE_INFO = 'RESET_SET_TYPE_AND_EXERCISE_INFO',
  ADD_SET_TO_EACH_EXERCISE_IN_SEGMENT = 'ADD_SET_TO_EACH_EXERCISE_IN_SEGMENT',
  DELETE_SET_FROM_EACH_EXERCISE_IN_SEGMENT = 'DELETE_SET_FROM_EACH_EXERCISE_IN_SEGMENT',
  DELETE_SEGMENT_FROM_PHASE = 'DELETE_SEGMENT_FROM_PHASE',
  REORDER_ROUTINE_PHASES = 'REORDER_ROUTINE_PHASES',
  DELETE_PHASE_FROM_ROUTINE = 'DELETE_PHASE_FROM_ROUTINE',
  REORDER_ROUTINE_SEGMENTS = 'REORDER_ROUTINE_SEGMENTS',
  FILTER_EXERCISES_FOR_SEARCH_VALUE = 'FILTER_EXERCISES_FOR_SEARCH_VALUE',
  ADD_TIMER_TO_WORKOUT_EXERCISE = 'ADD_TIMER_TO_WORKOUT_EXERCISE',

  // Exercise Form Actions
  OPEN_NEW_EXERCISE_FORM_DIALOG = 'OPEN_NEW_EXERCISE_FORM_DIALOG',
  OPEN_EDIT_EXERCISE_FORM_DIALOG = 'OPEN_EDIT_EXERCISE_FORM_DIALOG',
  CLOSE_EXERCISE_FORM_DIALOG = 'CLOSE_EXERCISE_FORM_DIALOG',
  SELECT_EXERCISE_PARAM_TYPE = 'SELECT_EXERCISE_PARAM_TYPE',
  SELECT_ALTERNATE_SIDES_OPTION = 'SELECT_ALTERNATE_SIDES_OPTION',
  SELECT_EXERCISE_MUSCLE_ID = 'SELECT_EXERCISE_MUSCLE_ID',
  SELECT_OPTIONAL_EXERCISE_PARAM = 'SELECT_OPTIONAL_EXERCISE_PARAM',
  UPDATE_EXERCISE_NAME = 'UPDATE_EXERCISE_NAME',
  UPDATE_EXERCISE_DESCRIPTION = 'UPDATE_EXERCISE_DESCRIPTION',
  UPDATE_EXERCISE_ICON_ID = 'UPDATE_EXERCISE_ICON_ID',
  UPDATE_EXERCISE_EQUIPMENT_LIST_IDS = 'UPDATE_EXERCISE_EQUIPMENT_LIST_IDS',
  UPDATE_EXERCISE_MANIKIN_MUSCLE_GROUP = 'UPDATE_EXERCISE_MANIKIN_MUSCLE_GROUP',
  ADD_PRIMARY_MUSCLE_TARGET = 'ADD_PRIMARY_MUSCLE_TARGET',
  DELETE_PRIMARY_MUSCLE_TARGET = 'DELETE_PRIMARY_MUSCLE_TARGET',
  SELECT_PRIMARY_MUSCLE = 'SELECT_PRIMARY_MUSCLE',
  SELECT_SECONDARY_MUSCLE = 'SELECT_SECONDARY_MUSCLE',
  ADD_SECONDARY_MUSCLE_TARGET = 'ADD_SECONDARY_MUSCLE_TARGET',
  DELETE_SECONDARY_MUSCLE_TARGET = 'DELETE_SECONDARY_MUSCLE_TARGET',
  SELECT_SECONDARY_TARGET_TYPE = 'SELECT_SECONDARY_TARGET_TYPE',
  SAVE_EXERCISE_INFO = 'SAVE_EXERCISE_INFO',

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
  | ClearRoutineBuilderAction
  | SelectExerciseParamTypeAction
  | SelectAlternateSidesOptionAction
  | SelectExerciseMuscleIdAction
  | SelectOptionalExerciseParamAction
  | UpdateExerciseNameAction
  | SaveExerciseInfoAction
  | OpenEditingExerciseFormDialogAction
  | OpenNewExerciseFormDialogAction
  | CloseExerciseFormDialogAction
  | LoadGripTypesAction
  | LoadGripWidthsAction
  | LoadManikinMuscleGroupsAction
  | LoadMusclesAction
  | LoadMuscleTargetTypesAction
  | LoadParameterTypesAction
  | LoadPhasesAction
  | LoadTrainingSetTypesAction
  | LoadWorkoutCategoriesAction
  | LoadWorkoutEquipmentAction
  | UpdateExerciseDescriptionAction
  | UpdateExerciseIconIdAction
  | UpdateExerciseEquipmentListIdsAction
  | UpdateExerciseManikinMuscleGroupAction
  | AddPrimaryMuscleTargetAction
  | SelectPrimaryMuscleAction
  | DeletePrimaryMuscleTargetAction
  | SelectSecondaryMuscleAction
  | DeleteSecondaryMuscleTargetAction
  | AddSecondaryMuscleTargetAction
  | SelectSecondaryTargetTypeAction;
