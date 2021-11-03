import firebase from 'firebase';
import {
  ParameterTypeDAO,
  FIREBASE_DB_PARAMETER_TYPES_ROUTE,
} from 'workout-app-common-core';
import { v4 as uuidv4 } from 'uuid';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../../creators/app-snackbar';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../../configs/redux/store';

export const saveNewParameterType =
  (
    name: string,
    description: string
  ): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    const ref = firebase.database().ref(FIREBASE_DB_PARAMETER_TYPES_ROUTE);
    const newRef = ref.push();

    const parameterTypeDAO = new ParameterTypeDAO(
      uuidv4(),
      name,
      description,
      true
    );

    return await newRef.set(parameterTypeDAO, (error: Error | null) => {
      if (error) {
        dispatch(displayErrorSnackbar(`Error saving parameter type ${name}.`));
      } else {
        dispatch(
          displaySuccessSnackbar(`Successfully saved parameter type ${name}.`)
        );
      }
    });
  };

export const updateParameterType =
  (
    firebaseId: string,
    name: string,
    description: string
  ): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_DB_PARAMETER_TYPES_ROUTE)
      .child(firebaseId)
      .update(
        {
          name: name,
          description: description,
        },
        (error: Error | null) => {
          if (error) {
            dispatch(
              displayErrorSnackbar(`Error updating parameter type ${name}.`)
            );
          } else {
            dispatch(displaySuccessSnackbar(`Successfully updated ${name}.`));
          }
        }
      );
  };

export const deActivateParameterType =
  (firebaseId: string): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_DB_PARAMETER_TYPES_ROUTE)
      .child(firebaseId)
      .update(
        {
          active: false,
        },
        (error: Error | null) => {
          if (error) {
            dispatch(
              displayErrorSnackbar('Error de-activating parameter type.')
            );
          } else {
            dispatch(
              displaySuccessSnackbar(
                'Successfully de-activated parameter type.'
              )
            );
          }
        }
      );
  };
