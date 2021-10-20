import firebase from 'firebase';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../../creators/app-snackbar';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../../configs/redux/store';
import { ExerciseDAO, ExerciseVO } from 'workout-app-common-core';
import { mapExerciseSnapshotToVO } from '../../utils/snapshot-mapper';
import { EXERCISES_DB_ROUTE } from '../../configs/constants/firebase-routes';

export const getAllExercises = async (): Promise<ExerciseVO[]> => {
  return await firebase
    .database()
    .ref(EXERCISES_DB_ROUTE)
    .once('value')
    .then((snapshot) => {
      if (snapshot.val()) {
        return mapExerciseSnapshotToVO(snapshot.val());
      } else {
        return [];
      }
    });
};

export const saveExercise =
  (successCallback: () => void): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const ref = firebase.database().ref(EXERCISES_DB_ROUTE);
    const newRef = ref.push();

    const newExerciseForm = getState().exerciseFormState.newExerciseForm;
    const exerciseForm = getState().exerciseFormState.exerciseForm;

    if (newExerciseForm) {
      const newExercise = new ExerciseDAO(
        exerciseForm.id,
        exerciseForm.name,
        exerciseForm.description,
        exerciseForm.equipmentId,
        exerciseForm.muscleGroupIds,
        '',
        exerciseForm.gripTypeId,
        exerciseForm.gripWidthId,
        exerciseForm.parameterTypeId,
        exerciseForm.alternateSides
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
        .ref(EXERCISES_DB_ROUTE)
        .child(exerciseForm.firebaseId)
        .update(
          {
            name: exerciseForm.name,
            description: exerciseForm.description,
            equipmentId: exerciseForm.equipmentId,
            muscleGroupIds: exerciseForm.muscleGroupIds,
            iconId: exerciseForm.iconId,
            gripTypeId: exerciseForm.gripTypeId,
            gripWidthId: exerciseForm.gripWidthId,
            parameterTypeId: exerciseForm.parameterTypeId,
            alternateSides: exerciseForm.alternateSides,
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
