import { ActionTypes } from './actions';

export interface SnackbarCreatorProps {
  text: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  position: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
}

export interface DisplayAppSnackbarAction {
  type: ActionTypes.DISPLAY_APP_SNACKBAR;
  snackbarProps: SnackbarCreatorProps;
}

export const displayAppSnackbar = (
  props: SnackbarCreatorProps
): DisplayAppSnackbarAction => {
  return {
    type: ActionTypes.DISPLAY_APP_SNACKBAR,
    snackbarProps: props,
  };
};

export interface HideAppSnackbarAction {
  type: ActionTypes.HIDE_APP_SNACKBAR;
}

export const hideAppSnackbar = (): HideAppSnackbarAction => {
  return {
    type: ActionTypes.HIDE_APP_SNACKBAR,
  };
};
