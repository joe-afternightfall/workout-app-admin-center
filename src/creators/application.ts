import { ActionTypes } from './actions';

export interface HideAppBarAction {
  type: ActionTypes.HIDE_APP_BAR;
}

export const hideAppBar = (): HideAppBarAction => {
  return {
    type: ActionTypes.HIDE_APP_BAR,
  };
};
