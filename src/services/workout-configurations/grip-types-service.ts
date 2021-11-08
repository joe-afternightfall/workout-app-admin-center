import firebase from 'firebase/app';
import 'firebase/database';
import {
  GripTypeDAO,
  FIREBASE_DB_GRIP_TYPES_ROUTE,
} from 'workout-app-common-core';
import { v4 as uuidv4 } from 'uuid';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../../creators/app-snackbar';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../../configs/redux/store';

export const saveNewGripType =
  (
    name: string,
    description: string,
    iconId: string
  ): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    const ref = firebase.database().ref(FIREBASE_DB_GRIP_TYPES_ROUTE);
    const newRef = ref.push();

    const gripTypeDAO = new GripTypeDAO(
      uuidv4(),
      name,
      description,
      iconId,
      true
    );

    return await newRef.set(gripTypeDAO, (error: Error | null) => {
      if (error) {
        dispatch(displayErrorSnackbar(`Error saving grip type ${name}.`));
      } else {
        dispatch(displaySuccessSnackbar(`Successfully saved ${name}.`));
      }
    });
  };

export const updateGripType =
  (
    firebaseId: string,
    name: string,
    description: string,
    iconId: string
  ): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_DB_GRIP_TYPES_ROUTE)
      .child(firebaseId)
      .update(
        {
          name: name,
          description: description,
          iconId: iconId,
        },
        (error: Error | null) => {
          if (error) {
            dispatch(displayErrorSnackbar(`Error updating grip type ${name}.`));
          } else {
            dispatch(displaySuccessSnackbar(`Successfully updated ${name}.`));
          }
        }
      );
  };

export const deActivateGripType =
  (firebaseId: string): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_DB_GRIP_TYPES_ROUTE)
      .child(firebaseId)
      .update(
        {
          active: false,
        },
        (error: Error | null) => {
          if (error) {
            dispatch(displayErrorSnackbar('Error de-activating grip type.'));
          } else {
            dispatch(
              displaySuccessSnackbar('Successfully de-activated grip type.')
            );
          }
        }
      );
  };
