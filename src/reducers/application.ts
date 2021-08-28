import { RouteProp } from '../configs/constants/routes';
import { LOCATION_CHANGE } from 'connected-react-router';
import { getPageInfo } from '../utils/get-current-page-info';
import { ActionTypes, ApplicationActions } from '../creators/actions';

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
}
