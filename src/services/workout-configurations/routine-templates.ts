import firebase from 'firebase';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../../configs/redux/store';
import { routerActions } from 'connected-react-router';
import {
  displayAppSnackbar,
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../../creators/app-snackbar';
import { mapRoutineSnapshotToVO } from '../../utils/snapshot-mapper';
import { ROUTINE_TEMPLATES_SCREEN_PATH } from '../../configs/constants/app';
import {
  Phase,
  RoutineTemplateDAO,
  RoutineTemplateVO,
} from 'workout-app-common-core';
import { ROUTINE_TEMPLATES_DB_ROUTE } from '../../configs/constants/firebase-routes';
import { clearRoutineBuilder } from '../../creators/routine-builder/builder';

export const getAllRoutineTemplates = async (): Promise<
  RoutineTemplateVO[]
> => {
  return await firebase
    .database()
    .ref(ROUTINE_TEMPLATES_DB_ROUTE)
    .once('value')
    .then((snapshot) => {
      if (snapshot.val()) {
        return mapRoutineSnapshotToVO(snapshot.val());
      } else {
        return [];
      }
    });
};

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
          dispatch(clearRoutineBuilder());
        }, 1000);
      }
    });
  };

export const updateRoutineTemplate =
  (): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const template = getState().routineBuilderState.selectedRoutine;

    return await firebase
      .database()
      .ref(ROUTINE_TEMPLATES_DB_ROUTE)
      .child(template.firebaseId)
      .update(
        {
          name: template.name,
          workoutCategoryId: template.workoutCategoryId,
          phases: template.phases,
        },
        (error: Error | null) => {
          if (error) {
            dispatch(
              displayErrorSnackbar(`Error updating ${template.name} Template`)
            );
          } else {
            dispatch(
              displaySuccessSnackbar(
                `Successfully Updated ${template.name} Template`
              )
            );
            timeoutAndRoute(dispatch);
          }
        }
      );
  };

export const deleteRoutineTemplate =
  (): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const selectedRoutine = getState().routineBuilderState.selectedRoutine;

    return (
      selectedRoutine.firebaseId !== '' &&
      (await firebase
        .database()
        .ref(ROUTINE_TEMPLATES_DB_ROUTE)
        .child(selectedRoutine.firebaseId)
        .remove((error) => {
          if (error) {
            dispatch(
              displayAppSnackbar({
                text: 'Error Updating Routine Template',
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
            timeoutAndRoute(dispatch);
          }
        }))
    );
  };

function timeoutAndRoute(dispatch: Dispatch): void {
  setTimeout(() => {
    dispatch(routerActions.push(ROUTINE_TEMPLATES_SCREEN_PATH));
    dispatch(clearRoutineBuilder());
  }, 1000);
}
