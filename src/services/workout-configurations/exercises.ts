import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
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
import { InfoProps } from '../../components/top-level-components/exercises-screen/form-view/exercise-info/ExerciseInfoCard';

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

export const saveNewExercise =
  (
    info: InfoProps,
    successCallback: () => void
  ): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    const ref = firebase.database().ref(EXERCISES_DB_ROUTE);
    const newRef = ref.push();

    const newExercise = new ExerciseDAO(
      uuidv4(),
      info.name,
      '',
      info.equipmentId,
      info.muscleGroupIds,
      '',
      info.gripTypeId,
      info.gripWidthId,
      info.parameterTypeId,
      info.alternateSides
    );

    return await newRef.set(newExercise, (error: Error | null) => {
      if (error) {
        dispatch(displayErrorSnackbar(`Error saving ${info.name}.`));
      } else {
        dispatch(
          displaySuccessSnackbar(
            `Successfully created new exercise ${info.name}.`
          )
        );
        setTimeout(() => {
          successCallback();
        }, 1000);
      }
    });
  };
