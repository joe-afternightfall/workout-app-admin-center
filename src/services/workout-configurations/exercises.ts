import firebase from 'firebase';
import { ExerciseDAO, ExerciseVO } from 'workout-app-common-core';
import { mapExerciseSnapshotToVO } from '../../utils/snapshot-mapper';
import { EXERCISES_DB_ROUTE } from '../../configs/constants/firebase-routes';
import { InfoProps } from '../../components/top-level-components/exercises-screen/form-view/exercise-info/ExerciseInfoCard';
import { ThunkAction } from 'redux-thunk';
import { State } from '../../configs/redux/store';
import { AnyAction, Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { displayAppSnackbar } from '../../creators/app-snackbar';

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
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
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
        dispatch(
          displayAppSnackbar({
            text: 'Error Saving Exercise',
            severity: 'error',
            position: {
              vertical: 'bottom',
              horizontal: 'right',
            },
          })
        );
      } else {
        dispatch(
          displayAppSnackbar({
            text: 'Saved Exercise!',
            severity: 'success',
            position: {
              vertical: 'bottom',
              horizontal: 'right',
            },
          })
        );
        setTimeout(() => {
          successCallback();
        }, 1000);
      }
    });
  };
