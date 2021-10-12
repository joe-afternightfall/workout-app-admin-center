import { ActionTypes } from './actions';

export interface HideAppBarAction {
  type: ActionTypes.HIDE_APP_BAR;
}

export const hideAppBar = (): HideAppBarAction => {
  return {
    type: ActionTypes.HIDE_APP_BAR,
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
