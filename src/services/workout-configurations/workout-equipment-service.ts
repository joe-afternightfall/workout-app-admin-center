import { ThunkAction } from 'redux-thunk';
import { State } from '../../configs/redux/store';
import { AnyAction, Dispatch } from 'redux';
import firebase from 'firebase/app';
import 'firebase/database';
import {
  FIREBASE_DB_WORKOUT_EQUIPMENT_ROUTE,
  WorkoutEquipmentDAO,
} from 'workout-app-common-core';
import { v4 as uuidv4 } from 'uuid';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../../creators/app-snackbar';

export const saveNewWorkoutEquipmentItem =
  (
    name: string,
    description: string,
    iconId: string
  ): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    const ref = firebase.database().ref(FIREBASE_DB_WORKOUT_EQUIPMENT_ROUTE);
    const newRef = ref.push();

    const workoutEquipmentDAO = new WorkoutEquipmentDAO(
      uuidv4(),
      name,
      description,
      iconId,
      true
    );

    return await newRef.set(workoutEquipmentDAO, (error: Error | null) => {
      if (error) {
        dispatch(
          displayErrorSnackbar(`Error saving workout equipment item ${name}.`)
        );
      } else {
        dispatch(
          displaySuccessSnackbar(
            `Successfully saved workout equipment item ${name}.`
          )
        );
      }
    });
  };

export const updateWorkoutEquipmentItem =
  (
    firebaseId: string,
    name: string,
    description: string,
    iconId: string
  ): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_DB_WORKOUT_EQUIPMENT_ROUTE)
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
              displayErrorSnackbar(
                `Error updating workout equipment item ${name}.`
              )
            );
          } else {
            dispatch(displaySuccessSnackbar(`Successfully updated ${name}.`));
          }
        }
      );
  };

export const deActivateWorkoutEquipment =
  (firebaseId: string): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_DB_WORKOUT_EQUIPMENT_ROUTE)
      .child(firebaseId)
      .update(
        {
          active: false,
        },
        (error: Error | null) => {
          if (error) {
            dispatch(
              displayErrorSnackbar(
                'Error de-activating workout equipment item.'
              )
            );
          } else {
            dispatch(
              displaySuccessSnackbar(
                'Successfully de-activated workout equipment item.'
              )
            );
          }
        }
      );
  };
