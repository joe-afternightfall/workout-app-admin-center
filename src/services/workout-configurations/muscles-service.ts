import { ThunkAction } from 'redux-thunk';
import { State } from '../../configs/redux/store';
import { AnyAction, Dispatch } from 'redux';
import firebase from 'firebase/app';
import 'firebase/database';
import { FIREBASE_DB_MUSCLES_ROUTE, MuscleDAO } from 'workout-app-common-core';
import { v4 as uuidv4 } from 'uuid';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../../creators/app-snackbar';

export const saveNewMuscle =
  (
    name: string,
    manikinGroupId: string
  ): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    const ref = firebase.database().ref(FIREBASE_DB_MUSCLES_ROUTE);
    const newRef = ref.push();

    const muscleDAO = new MuscleDAO(uuidv4(), name, manikinGroupId, true);

    return await newRef.set(muscleDAO, (error: Error | null) => {
      if (error) {
        dispatch(displayErrorSnackbar(`Error saving muscle ${name}.`));
      } else {
        dispatch(displaySuccessSnackbar(`Successfully saved muscle ${name}.`));
      }
    });
  };

export const updateMuscle =
  (
    firebaseId: string,
    name: string,
    manikinGroupId: string
  ): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_DB_MUSCLES_ROUTE)
      .child(firebaseId)
      .update(
        {
          name: name,
          manikinMuscleGroupId: manikinGroupId,
        },
        (error: Error | null) => {
          if (error) {
            dispatch(displayErrorSnackbar(`Error updating ${name}.`));
          } else {
            dispatch(displaySuccessSnackbar(`Successfully updated ${name}.`));
          }
        }
      );
  };

export const deActivateMuscle =
  (firebaseId: string): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_DB_MUSCLES_ROUTE)
      .child(firebaseId)
      .update(
        {
          active: false,
        },
        (error: Error | null) => {
          if (error) {
            dispatch(displayErrorSnackbar('Error de-activating muscle.'));
          } else {
            dispatch(
              displaySuccessSnackbar('Successfully de-activated muscle.')
            );
          }
        }
      );
  };
