import firebase from 'firebase';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../../configs/redux/store';
import { routerActions } from 'connected-react-router';
import { displayAppSnackbar } from '../../creators/app-snackbar';
import { ROUTINE_TEMPLATES_SCREEN_PATH } from '../../configs/constants/app';
import { ROUTINE_TEMPLATES_DB_ROUTE } from '../../configs/constants/firebase-routes';
import { RoutineTemplateDAO } from 'workout-app-common-core';

export const saveNewRoutineTemplate =
  (): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const selectedRoutine = getState().routineBuilderState.selectedRoutine;

    const templateDAO = new RoutineTemplateDAO(
      selectedRoutine.id,
      selectedRoutine.name,
      selectedRoutine.workoutCategoryId,
      selectedRoutine.phases
    );

    const ref = firebase.database().ref(ROUTINE_TEMPLATES_DB_ROUTE);
    const newRef = ref.push();

    return await newRef.set(templateDAO, (error: Error | null) => {
      if (error) {
        dispatch(
          displayAppSnackbar({
            text: 'Error Saving Routine Template',
            severity: 'error',
            position: {
              vertical: 'bottom',
              horizontal: 'right',
            },
          })
        );
      } else {
        dispatch(
          displayAppSnackbar({
            text: 'Saved Routine Template!',
            severity: 'success',
            position: {
              vertical: 'bottom',
              horizontal: 'right',
            },
          })
        );
        setTimeout(() => {
          dispatch(routerActions.push(ROUTINE_TEMPLATES_SCREEN_PATH));
        }, 1000);
      }
    });
  };
