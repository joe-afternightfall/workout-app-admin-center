import { ThunkAction } from 'redux-thunk';
import { State } from '../../configs/redux/store';
import { AnyAction, Dispatch } from 'redux';
import firebase from 'firebase/app';
import 'firebase/database';
import {
  ManikinMuscleGroupDAO,
  FIREBASE_DB_MANIKIN_MUSCLE_GROUPS_ROUTE,
} from 'workout-app-common-core';
import { v4 as uuidv4 } from 'uuid';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../../creators/app-snackbar';

export const saveNewManikinMuscleGroup =
  (name: string): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    const ref = firebase
      .database()
      .ref(FIREBASE_DB_MANIKIN_MUSCLE_GROUPS_ROUTE);
    const newRef = ref.push();

    const manikinMuscleGroupDAO = new ManikinMuscleGroupDAO(
      uuidv4(),
      name,
      true
    );

    return await newRef.set(manikinMuscleGroupDAO, (error: Error | null) => {
      if (error) {
        dispatch(
          displayErrorSnackbar(`Error saving manikin muscle group ${name}.`)
        );
      } else {
        dispatch(
          displaySuccessSnackbar(
            `Successfully saved manikin muscle group ${name}.`
          )
        );
      }
    });
  };

export const updateManikinMuscleGroup =
  (
    firebaseId: string,
    name: string
  ): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_DB_MANIKIN_MUSCLE_GROUPS_ROUTE)
      .child(firebaseId)
      .update(
        {
          name: name,
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

export const deActivateManikinMuscleGroup =
  (firebaseId: string): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_DB_MANIKIN_MUSCLE_GROUPS_ROUTE)
      .child(firebaseId)
      .update(
        {
          active: false,
        },
        (error: Error | null) => {
          if (error) {
            dispatch(
              displayErrorSnackbar('Error de-activating manikin muscle group')
            );
          } else {
            dispatch(
              displaySuccessSnackbar(
                'Successfully de-activated manikin muscle group'
              )
            );
          }
        }
      );
  };
