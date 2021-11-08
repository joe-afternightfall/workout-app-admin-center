import { ThunkAction } from 'redux-thunk';
import { State } from '../../configs/redux/store';
import { AnyAction, Dispatch } from 'redux';
import firebase from 'firebase/app';
import 'firebase/database';
import {
  FIREBASE_DB_TRAINING_SET_TYPES_ROUTE,
  TrainingSetTypeDAO,
} from 'workout-app-common-core';
import { v4 as uuidv4 } from 'uuid';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../../creators/app-snackbar';

export const saveNewTrainingSetType =
  (
    name: string,
    description: string,
    iconId: string
  ): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    const ref = firebase.database().ref(FIREBASE_DB_TRAINING_SET_TYPES_ROUTE);
    const newRef = ref.push();

    const trainingSetTypeDAO = new TrainingSetTypeDAO(
      uuidv4(),
      name,
      description,
      iconId,
      true
    );

    return await newRef.set(trainingSetTypeDAO, (error: Error | null) => {
      if (error) {
        dispatch(
          displayErrorSnackbar(`Error saving training set type ${name}.`)
        );
      } else {
        dispatch(
          displaySuccessSnackbar(
            `Successfully saved training set type ${name}.`
          )
        );
      }
    });
  };

export const updateTrainingSetType =
  (
    firebaseId: string,
    name: string,
    description: string,
    iconId: string
  ): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_DB_TRAINING_SET_TYPES_ROUTE)
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
              displayErrorSnackbar(`Error updating training set type ${name}.`)
            );
          } else {
            dispatch(displaySuccessSnackbar(`Successfully updated ${name}.`));
          }
        }
      );
  };

export const deActivateTrainingSetType =
  (firebaseId: string): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_DB_TRAINING_SET_TYPES_ROUTE)
      .child(firebaseId)
      .update(
        {
          active: false,
        },
        (error: Error | null) => {
          if (error) {
            dispatch(
              displayErrorSnackbar('Error de-activating training set type.')
            );
          } else {
            dispatch(
              displaySuccessSnackbar(
                'Successfully de-activated training set type.'
              )
            );
          }
        }
      );
  };
