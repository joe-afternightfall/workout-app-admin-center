import { ThunkAction } from 'redux-thunk';
import { State } from '../../configs/redux/store';
import { AnyAction, Dispatch } from 'redux';
import firebase from 'firebase';
import {
  FIREBASE_DB_GRIP_WIDTHS_ROUTE,
  GripWidthDAO,
} from 'workout-app-common-core';
import { v4 as uuidv4 } from 'uuid';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../../creators/app-snackbar';

export const saveNewGripWidth =
  (
    name: string,
    description: string,
    iconId: string
  ): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    const ref = firebase.database().ref(FIREBASE_DB_GRIP_WIDTHS_ROUTE);
    const newRef = ref.push();

    const gripWidthDAO = new GripWidthDAO(
      uuidv4(),
      name,
      description,
      iconId,
      true
    );

    return await newRef.set(gripWidthDAO, (error: Error | null) => {
      if (error) {
        dispatch(displayErrorSnackbar(`Error saving grip width ${name}.`));
      } else {
        dispatch(displaySuccessSnackbar(`Successfully saved ${name}.`));
      }
    });
  };

export const updateGripWidth =
  (
    firebaseId: string,
    name: string,
    description: string,
    iconId: string
  ): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_DB_GRIP_WIDTHS_ROUTE)
      .child(firebaseId)
      .update(
        {
          name: name,
          description: description,
          iconId: iconId,
        },
        (error: Error | null) => {
          if (error) {
            dispatch(
              displayErrorSnackbar(`Error updating grip width ${name}.`)
            );
          } else {
            dispatch(displaySuccessSnackbar(`Successfully updated ${name}.`));
          }
        }
      );
  };

export const deActivateGripWidth =
  (firebaseId: string): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_DB_GRIP_WIDTHS_ROUTE)
      .child(firebaseId)
      .update(
        {
          active: false,
        },
        (error: Error | null) => {
          if (error) {
            dispatch(displayErrorSnackbar('Error de-activating grip width.'));
          } else {
            dispatch(
              displaySuccessSnackbar('Successfully de-activated grip width.')
            );
          }
        }
      );
  };
