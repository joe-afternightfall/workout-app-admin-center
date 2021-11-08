import { ThunkAction } from 'redux-thunk';
import { State } from '../../configs/redux/store';
import { AnyAction, Dispatch } from 'redux';
import firebase from 'firebase/app';
import 'firebase/database';
import { FIREBASE_DB_PHASES_ROUTE, PhaseDAO } from 'workout-app-common-core';
import { v4 as uuidv4 } from 'uuid';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../../creators/app-snackbar';

export const saveNewPhase =
  (
    name: string,
    description: string
  ): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    const ref = firebase.database().ref(FIREBASE_DB_PHASES_ROUTE);
    const newRef = ref.push();

    const phaseDAO = new PhaseDAO(uuidv4(), name, description, true);

    return await newRef.set(phaseDAO, (error: Error | null) => {
      if (error) {
        dispatch(displayErrorSnackbar(`Error saving phase ${name}.`));
      } else {
        dispatch(displaySuccessSnackbar(`Successfully saved phase ${name}.`));
      }
    });
  };

export const updatePhase =
  (
    firebaseId: string,
    name: string,
    description: string
  ): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_DB_PHASES_ROUTE)
      .child(firebaseId)
      .update(
        {
          name: name,
          description: description,
        },
        (error: Error | null) => {
          if (error) {
            dispatch(displayErrorSnackbar(`Error updating phase ${name}.`));
          } else {
            dispatch(displaySuccessSnackbar(`Successfully updated ${name}.`));
          }
        }
      );
  };

export const deActivatePhase =
  (firebaseId: string): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_DB_PHASES_ROUTE)
      .child(firebaseId)
      .update(
        {
          active: false,
        },
        (error: Error | null) => {
          if (error) {
            dispatch(displayErrorSnackbar('Error de-activating phase.'));
          } else {
            dispatch(
              displaySuccessSnackbar('Successfully de-activated phase.')
            );
          }
        }
      );
  };
