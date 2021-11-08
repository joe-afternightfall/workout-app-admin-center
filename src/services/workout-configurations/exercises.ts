import firebase from 'firebase/app';
import 'firebase/database';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../../creators/app-snackbar';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../../configs/redux/store';
import {
  ExerciseDAO,
  ExerciseVO,
  FIREBASE_DB_EXERCISES_ROUTE,
} from 'workout-app-common-core';

export const saveExercise =
  (successCallback: () => void): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const ref = firebase.database().ref(FIREBASE_DB_EXERCISES_ROUTE);
    const newRef = ref.push();

    const newExerciseForm = getState().exerciseFormState.newExerciseForm;
    const exerciseForm = getState().exerciseFormState.exerciseForm;

    if (newExerciseForm) {
      const newExercise = new ExerciseDAO(
        exerciseForm.id,
        exerciseForm.name,
        exerciseForm.description,
        exerciseForm.workoutEquipmentIds,
        exerciseForm.manikinMuscleGroupIds,
        exerciseForm.musclesWorked,
        exerciseForm.iconId,
        exerciseForm.gripTypeId,
        exerciseForm.gripWidthId,
        exerciseForm.parameterTypeId,
        exerciseForm.alternateSides,
        exerciseForm.active
      );

      return await newRef.set(newExercise, (error: Error | null) => {
        if (error) {
          dispatch(displayErrorSnackbar(`Error saving ${exerciseForm.name}.`));
        } else {
          dispatch(
            displaySuccessSnackbar(
              `Successfully created new exercise ${exerciseForm.name}.`
            )
          );
          setTimeout(() => {
            successCallback();
          }, 1000);
        }
      });
    } else {
      return await firebase
        .database()
        .ref(FIREBASE_DB_EXERCISES_ROUTE)
        .child(exerciseForm.firebaseId)
        .update(
          {
            name: exerciseForm.name,
            description: exerciseForm.description,
            workoutEquipmentIds: exerciseForm.workoutEquipmentIds,
            manikinMuscleGroupIds: exerciseForm.manikinMuscleGroupIds,
            musclesWorked: exerciseForm.musclesWorked,
            iconId: exerciseForm.iconId,
            gripTypeId: exerciseForm.gripTypeId,
            gripWidthId: exerciseForm.gripWidthId,
            parameterTypeId: exerciseForm.parameterTypeId,
            alternateSides: exerciseForm.alternateSides,
            active: exerciseForm.active,
          },
          (error: Error | null) => {
            if (error) {
              dispatch(
                displayErrorSnackbar(`Error updating ${exerciseForm.name}`)
              );
            } else {
              dispatch(
                displaySuccessSnackbar(
                  `Successfully Updated ${exerciseForm.name}`
                )
              );
              setTimeout(() => {
                successCallback();
              }, 1000);
            }
          }
        );
    }
  };

// todo: change to "toggle active"
export const deleteExercise =
  (
    exercise: ExerciseVO,
    successCallback: () => void
  ): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(FIREBASE_DB_EXERCISES_ROUTE)
      .child(exercise.firebaseId)
      .remove((error) => {
        if (error) {
          dispatch(
            displayErrorSnackbar(
              `There was a problem deleting the exercise ${exercise.name}!`
            )
          );
        } else {
          dispatch(
            displaySuccessSnackbar(
              `Successfully deleted the exercise ${exercise.name}.`
            )
          );
          setTimeout(() => {
            successCallback();
          }, 1000);
        }
      });
  };
