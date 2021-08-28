import { LocationChangeAction } from 'connected-react-router';
import { ValidatedUserAction } from './user-info';
import {
  CloseSideDrawerAction,
  OpenSideDrawerAction,
  SetDrawerSizeAction,
  UserClickedCloseDrawerAction,
  UserClickedOpenDrawerAction,
  LogoutUserAction,
} from './side-drawer';

export enum ActionTypes {
  // Application Actions
  INITIALIZE = 'INITIALIZE',
  VALIDATED_USER = 'VALIDATED_USER',

  // Side drawer actions
  CLOSE_SIDE_DRAWER = 'CLOSE_SIDE_DRAWER',
  OPEN_SIDE_DRAWER = 'OPEN_SIDE_DRAWER',
  SET_DRAWER_SIZE = 'SET_DRAWER_SIZE',
  USER_CLICKED_CLOSE_DRAWER = 'USER_CLICKED_CLOSE_DRAWER',
  USER_CLICKED_OPEN_DRAWER = 'USER_CLICKED_OPEN_DRAWER',
  LOGOUT_USER = 'LOGOUT_USER',
}

export type ApplicationActions =
  | LocationChangeAction
  | ValidatedUserAction
  | CloseSideDrawerAction
  | OpenSideDrawerAction
  | SetDrawerSizeAction
  | UserClickedCloseDrawerAction
  | UserClickedOpenDrawerAction
  | LogoutUserAction;
