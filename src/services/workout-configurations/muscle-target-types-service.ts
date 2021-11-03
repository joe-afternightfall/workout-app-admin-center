import { ThunkAction } from 'redux-thunk';
import { State } from '../../configs/redux/store';
import { AnyAction, Dispatch } from 'redux';
import firebase from 'firebase';
import {
  FIREBASE_DB_MUSCLE_TARGET_TYPES_ROUTE,
  MuscleTargetTypeDAO,
} from 'workout-app-common-core';
import { v4 as uuidv4 } from 'uuid';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../../creators/app-snackbar';

export const saveNewMuscleTargetType =
  (
    name: string,
    description: string
  ): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    const ref = firebase.database().ref(FIREBASE_DB_MUSCLE_TARGET_TYPES_ROUTE);
    const newRef = ref.push();

    const muscleTargetTypeDAO = new MuscleTargetTypeDAO(
      uuidv4(),
      name,
      description,
      true
    );

    return await newRef.set(muscleTargetTypeDAO, (error: Error | null) => {
      if (error) {
        dispatch(displayErrorSnackbar(`Error saving ${name}.`));
      } else {
        dispatch(displaySuccessSnackbar(`Successfully saved ${name}.`));
      }
    });
  };

export const updateMuscleTargetType =
  (
    firebaseId: string,
    name: string,
    description: string
  ): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_DB_MUSCLE_TARGET_TYPES_ROUTE)
      .child(firebaseId)
      .update(
        {
          name: name,
          description: description,
        },
        (error: Error | null) => {
          if (error) {
            dispatch(
              displayErrorSnackbar(`Error updating muscle target type ${name}.`)
            );
          } else {
            dispatch(displaySuccessSnackbar(`Successfully updated ${name}.`));
          }
        }
      );
  };

export const deActivateMuscleTargetType =
  (firebaseId: string): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_DB_MUSCLE_TARGET_TYPES_ROUTE)
      .child(firebaseId)
      .update(
        {
          active: false,
        },
        (error: Error | null) => {
          if (error) {
            dispatch(
              dispatch(
                displayErrorSnackbar('Error de-activating muscle target type.')
              )
            );
          } else {
            displaySuccessSnackbar(
              'Successfully de-activated muscle target type.'
            );
          }
        }
      );
  };
