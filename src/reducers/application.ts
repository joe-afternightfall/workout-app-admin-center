import {
  ExerciseVO,
  GripTypeVO,
  GripWidthVO,
  PhaseVO,
  RoutineTemplateVO,
  TrainingSetTypeVO,
  WorkoutCategoryVO,
} from 'workout-app-common-core';
import { LOCATION_CHANGE } from 'connected-react-router';
import { getPageInfo } from '../utils/get-current-page-info';
import { SnackbarCreatorProps } from '../creators/app-snackbar';
import { ActionTypes, ApplicationActions } from '../creators/actions';
import { RouteProp } from '../configs/constants/app-navigation-routes';
import { ExerciseTypeVO } from '../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';
import { ROUTINE_BUILDER_SCREEN_PATH } from '../configs/constants/app';

export default {
  reducer: (
    state: ApplicationState = {} as unknown as ApplicationState,
    action: ApplicationActions
  ): ApplicationState => {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case LOCATION_CHANGE: {
        const pathname = action.payload.location.pathname;
        newState.currentLocation = pathname;
        newState.activePage = getPageInfo(newState.currentLocation);
        newState.displayAppBar = pathname !== ROUTINE_BUILDER_SCREEN_PATH;
        break;
      }
      case ActionTypes.LOAD_GRIP_TYPES:
        newState.workoutConfigurations.gripTypes = action.gripTypes;
        break;
      case ActionTypes.LOAD_GRIP_WIDTHS:
        newState.workoutConfigurations.gripWidths = action.gripWidths;
        break;
      case ActionTypes.DISPLAY_APP_SNACKBAR:
        newState.displayAppSnackbar = true;
        newState.snackbarProps = action.snackbarProps;
        break;
      case ActionTypes.HIDE_APP_SNACKBAR:
        newState.displayAppSnackbar = false;
        break;
      case ActionTypes.HIDE_APP_BAR:
        newState.displayAppBar = false;
        break;
      case ActionTypes.VALIDATED_USER:
        newState.userIsValidated = true;
        newState.userEmail = action.email;
        break;
      case ActionTypes.LOGOUT_USER:
        newState.userIsValidated = false;
        break;
      case ActionTypes.LOAD_EXERCISE_TYPES:
        newState.workoutConfigurations.exerciseTypes = action.exerciseTypes;
        break;
      case ActionTypes.LOAD_EXERCISES:
        newState.workoutConfigurations.exercises = action.exercises;
        break;
      case ActionTypes.LOAD_ROUTINE_TEMPLATES:
        newState.workoutConfigurations.routineTemplates =
          action.routineTemplates;
        break;
      case ActionTypes.TOGGLE_MUSCLE_GROUP: {
        const foundId = newState.selectedMuscleGroupIds.find(
          (id: string) => id === action.muscleGroupId
        );
        if (foundId) {
          const foundIndex = newState.selectedMuscleGroupIds.indexOf(foundId);
          newState.selectedMuscleGroupIds.splice(foundIndex, 1);
          return {
            ...newState,
            selectedMuscleGroupIds: [...newState.selectedMuscleGroupIds],
          };
        } else {
          newState.selectedMuscleGroupIds = [
            ...newState.selectedMuscleGroupIds,
            action.muscleGroupId,
          ];
        }
        break;
      }
      case ActionTypes.APPLY_HOVER_STYLES_TO_MUSCLE_GROUP:
        newState.applyHoverStylesToMuscleGroup = action.groupId;
        break;
      case ActionTypes.CLEAR_HOVER_STYLES_FOR_MUSCLE_GROUP:
        newState.applyHoverStylesToMuscleGroup = '';
        break;
      default:
        newState = state;
    }

    return newState;
  },
};

export interface ApplicationState {
  currentLocation: string;
  activePage: RouteProp | undefined;
  displayAppSnackbar: boolean;
  snackbarProps: SnackbarCreatorProps;
  userIsValidated: boolean;
  userEmail: string;
  displayAppBar: boolean;
  sideDrawerIsClosed: boolean;
  workoutConfigurations: {
    exerciseTypes: ExerciseTypeVO[];
    exercises: ExerciseVO[];
    routineTemplates: RoutineTemplateVO[];
    gripTypes: GripTypeVO[];
    gripWidths: GripWidthVO[];
    trainingSetTypes: TrainingSetTypeVO[];
    phases: PhaseVO[];
    workoutCategories: WorkoutCategoryVO[];
  };
  selectedMuscleGroupIds: string[];
  applyHoverStylesToMuscleGroup: string;
}
