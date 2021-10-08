import { RouteProp } from '../configs/constants/routes';
import { LOCATION_CHANGE } from 'connected-react-router';
import { getPageInfo } from '../utils/get-current-page-info';
import { ActionTypes, ApplicationActions } from '../creators/actions';
import { CircuitTemplateVO } from '../configs/models/CircuitTemplateVO';
import { WorkoutVO } from '../configs/models/WorkoutVO';
import { ExerciseTypeVO } from '../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';
import { CircuitTypeVO } from '../configs/models/workout-configurations/circuit-type/CircuitTypeVO';
import { ExerciseVO } from 'workout-app-common-core';
import { SnackbarCreatorProps } from '../creators/app-snackbar';

export default {
  reducer: (
    state: ApplicationState = {} as unknown as ApplicationState,
    action: ApplicationActions
  ): ApplicationState => {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case LOCATION_CHANGE:
        newState.currentLocation = action.payload.location.pathname;
        newState.activePage = getPageInfo(newState.currentLocation);
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
      case ActionTypes.CLOSE_SIDE_DRAWER:
        newState.sideDrawerIsOpen = false;
        break;
      case ActionTypes.OPEN_SIDE_DRAWER:
        newState.sideDrawerIsOpen = true;
        break;
      case ActionTypes.SET_DRAWER_SIZE:
        newState.drawerSize = action.size;
        break;
      case ActionTypes.USER_CLICKED_CLOSE_DRAWER:
        newState.userClickedCloseDrawer = true;
        break;
      case ActionTypes.USER_CLICKED_OPEN_DRAWER:
        newState.userClickedCloseDrawer = false;
        break;
      case ActionTypes.LOAD_CIRCUIT_TEMPLATES:
        newState.circuitTemplates = action.templates;
        break;
      case ActionTypes.LOAD_USER_WORKOUTS:
        newState.userWorkouts = action.workouts;
        break;
      case ActionTypes.LOAD_EXERCISE_TYPES:
        newState.workoutConfigurations.exerciseTypes = action.exerciseTypes;
        break;
      case ActionTypes.LOAD_EXERCISES:
        newState.workoutConfigurations.exercises = action.exercises;
        break;
      case ActionTypes.LOAD_CIRCUIT_TYPES:
        newState.workoutConfigurations.circuitTypes = action.circuitTypes;
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
  drawerSize: string;
  displayAppBar: boolean;
  userClickedCloseDrawer: boolean;
  sideDrawerIsOpen: boolean;
  sideDrawerIsClosed: boolean;
  circuitTemplates: CircuitTemplateVO[];
  userWorkouts: WorkoutVO[];
  workoutConfigurations: {
    exerciseTypes: ExerciseTypeVO[];
    circuitTypes: CircuitTypeVO[];
    exercises: ExerciseVO[];
  };
  selectedMuscleGroupIds: string[];
  applyHoverStylesToMuscleGroup: string;
}
