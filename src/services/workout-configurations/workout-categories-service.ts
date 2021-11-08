import { ThunkAction } from 'redux-thunk';
import { State } from '../../configs/redux/store';
import { AnyAction, Dispatch } from 'redux';
import firebase from 'firebase/app';
import 'firebase/database';
import {
  WorkoutCategoryDAO,
  FIREBASE_DB_WORKOUT_CATEGORIES_ROUTE,
} from 'workout-app-common-core';
import { v4 as uuidv4 } from 'uuid';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../../creators/app-snackbar';

export const saveNewWorkoutCategory =
  (
    name: string,
    color: string,
    manikinMuscleGroupIds: string[]
  ): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    const ref = firebase.database().ref(FIREBASE_DB_WORKOUT_CATEGORIES_ROUTE);
    const newRef = ref.push();

    const workoutCategoryDAO = new WorkoutCategoryDAO(
      uuidv4(),
      name,
      color,
      manikinMuscleGroupIds,
      true
    );

    return await newRef.set(workoutCategoryDAO, (error: Error | null) => {
      if (error) {
        dispatch(
          displayErrorSnackbar(`Error saving workout category ${name}.`)
        );
      } else {
        dispatch(
          displaySuccessSnackbar(`Successfully saved workout category ${name}.`)
        );
      }
    });
  };

export const updateWorkoutCategory =
  (
    firebaseId: string,
    name: string,
    color: string,
    manikinMuscleGroupIds: string[]
  ): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_DB_WORKOUT_CATEGORIES_ROUTE)
      .child(firebaseId)
      .update(
        {
          name: name,
          color: color,
          manikinMuscleGroupIds: manikinMuscleGroupIds,
        },
        (error: Error | null) => {
          if (error) {
            dispatch(
              displayErrorSnackbar(`Error updating workout category ${name}.`)
            );
          } else {
            dispatch(displaySuccessSnackbar(`Successfully updated ${name}.`));
          }
        }
      );
  };

export const deActivateWorkoutCategory =
  (firebaseId: string): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_DB_WORKOUT_CATEGORIES_ROUTE)
      .child(firebaseId)
      .update(
        {
          active: false,
        },
        (error: Error | null) => {
          if (error) {
            dispatch(
              displayErrorSnackbar('Error de-activating workout category.')
            );
          } else {
            dispatch(
              displaySuccessSnackbar(
                'Successfully de-activated workout category.'
              )
            );
          }
        }
      );
  };
