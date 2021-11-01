import firebase from 'firebase';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../../creators/app-snackbar';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../../configs/redux/store';
import { routerActions } from 'connected-react-router';
import { ROUTINE_TEMPLATES_SCREEN_PATH } from '../../configs/constants/app';
import { clearRoutineBuilder } from '../../creators/routine-builder/builder';
import {
  RoutineTemplateDAO,
  mapRoutineTemplateSnapshotToVO,
  FIREBASE_DB_ROUTINE_TEMPLATES_ROUTE,
} from 'workout-app-common-core';
import { loadRoutineTemplates } from '../../creators/load-workout-configs';

export const fetchAllRoutineTemplates =
  (): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_DB_ROUTINE_TEMPLATES_ROUTE)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          dispatch(
            loadRoutineTemplates(mapRoutineTemplateSnapshotToVO(snapshot.val()))
          );
        } else {
          dispatch(loadRoutineTemplates([]));
        }
      });
  };

export const saveNewRoutineTemplate =
  (): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const template = getState().routineBuilderState.selectedRoutine;

    const templateDAO = new RoutineTemplateDAO(
      template.id,
      template.name,
      template.workoutCategoryId,
      template.phases,
      true
    );

    const ref = firebase.database().ref(FIREBASE_DB_ROUTINE_TEMPLATES_ROUTE);
    const newRef = ref.push();

    return await newRef.set(templateDAO, (error: Error | null) => {
      if (error) {
        dispatch(
          displayErrorSnackbar(`Error Saving ${template.name} Template`)
        );
      } else {
        dispatch(
          displaySuccessSnackbar(
            `Successfully saved ${template.name} Template.`
          )
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
      .ref(FIREBASE_DB_ROUTINE_TEMPLATES_ROUTE)
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

// todo: change to "toggle active"
export const deleteRoutineTemplate =
  (): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const template = getState().routineBuilderState.selectedRoutine;

    return (
      template.firebaseId !== '' &&
      (await firebase
        .database()
        .ref(FIREBASE_DB_ROUTINE_TEMPLATES_ROUTE)
        .child(template.firebaseId)
        .remove((error) => {
          if (error) {
            dispatch(
              displayErrorSnackbar(
                `There was a problem deleting the ${template.name} Template`
              )
            );
          } else {
            dispatch(
              displaySuccessSnackbar(
                `Successfully deleted ${template.name} Template.`
              )
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
