import firebase from 'firebase';
import { ExerciseVO } from 'workout-app-common-core';
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
