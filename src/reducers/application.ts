import { RouteProp } from '../configs/constants/routes';
import { LOCATION_CHANGE } from 'connected-react-router';
import { getPageInfo } from '../utils/get-current-page-info';
import { ActionTypes, ApplicationActions } from '../creators/actions';
import { CircuitTemplateVO } from '../configs/models/CircuitTemplateVO';
import { WorkoutVO } from '../configs/models/WorkoutVO';
import { ExerciseTypeVO } from '../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';
import { CircuitTypeVO } from '../configs/models/workout-configurations/circuit-type/CircuitTypeVO';

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
      case ActionTypes.LOAD_CIRCUIT_TYPES:
        newState.workoutConfigurations.circuitTypes = action.circuitTypes;
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
  userIsValidated: boolean;
  userEmail: string;
  drawerSize: string;
  userClickedCloseDrawer: boolean;
  sideDrawerIsOpen: boolean;
  sideDrawerIsClosed: boolean;
  circuitTemplates: CircuitTemplateVO[];
  userWorkouts: WorkoutVO[];
  workoutConfigurations: {
    exerciseTypes: ExerciseTypeVO[];
    circuitTypes: CircuitTypeVO[];
  };
}
