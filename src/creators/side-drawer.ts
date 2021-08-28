import { ActionTypes } from './actions';

export interface CloseSideDrawerAction {
  type: ActionTypes.CLOSE_SIDE_DRAWER;
}

export const closeSideDrawer = (): CloseSideDrawerAction => {
  return {
    type: ActionTypes.CLOSE_SIDE_DRAWER,
  };
};

export interface OpenSideDrawerAction {
  type: ActionTypes.OPEN_SIDE_DRAWER;
}

export const openSideDrawer = (): OpenSideDrawerAction => {
  return {
    type: ActionTypes.OPEN_SIDE_DRAWER,
  };
};

export interface SetDrawerSizeAction {
  type: ActionTypes.SET_DRAWER_SIZE;
  size: string;
}

export const setDrawerSize = (size: string): SetDrawerSizeAction => {
  return {
    type: ActionTypes.SET_DRAWER_SIZE,
    size: size,
  };
};

export interface UserClickedCloseDrawerAction {
  type: ActionTypes.USER_CLICKED_CLOSE_DRAWER;
}

export const userClickedCloseDrawer = (): UserClickedCloseDrawerAction => {
  return {
    type: ActionTypes.USER_CLICKED_CLOSE_DRAWER,
  };
};

export interface UserClickedOpenDrawerAction {
  type: ActionTypes.USER_CLICKED_OPEN_DRAWER;
}

export const userClickedOpenDrawer = (): UserClickedOpenDrawerAction => {
  return {
    type: ActionTypes.USER_CLICKED_OPEN_DRAWER,
  };
};

export interface LogoutUserAction {
  type: ActionTypes.LOGOUT_USER;
}

export const logoutUser = (): LogoutUserAction => {
  return {
    type: ActionTypes.LOGOUT_USER,
  };
};
