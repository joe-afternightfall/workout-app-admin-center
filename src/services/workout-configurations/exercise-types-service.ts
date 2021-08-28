import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { exerciseTypeSnapToVO } from '../../utils/vo-builder';
import { EXERCISE_TYPES_ROUTE } from '../../configs/constants/firebase-routes';
import {
  SetType,
  ExerciseTypeDAO,
} from '../../configs/models/workout-configurations/exercise-type/ExerciseTypeDAO';
import { ExerciseTypeVO } from '../../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';

export const createNewExerciseType = async (
  name: string,
  muscleGroupIds: string[],
  setType: SetType
): Promise<void> => {
  const ref = firebase.database().ref(EXERCISE_TYPES_ROUTE);
  const newRef = ref.push();
  const exerciseTypeDAO = new ExerciseTypeDAO(
    uuidv4(),
    name,
    muscleGroupIds,
    setType
  );

  return await newRef.set(exerciseTypeDAO, (error: Error | null) => {
    if (error) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  });
};

export const getAllExerciseTypes = async (): Promise<ExerciseTypeVO[]> => {
  return await firebase
    .database()
    .ref(EXERCISE_TYPES_ROUTE)
    .once('value')
    .then((snapshot) => {
      if (snapshot.val()) {
        return exerciseTypeSnapToVO(snapshot.val());
      } else {
        return [];
      }
    });
};

export const updateExerciseType = async (
  firebaseId: string,
  exerciseName: string,
  muscleGroupIds: string[],
  setType: SetType
): Promise<void> => {
  return await firebase
    .database()
    .ref(EXERCISE_TYPES_ROUTE)
    .child(firebaseId)
    .update(
      {
        name: exerciseName,
        muscleGroupIds: muscleGroupIds,
        setType: setType,
      },
      (error: Error | null) => {
        if (error) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      }
    );
};

export const deleteExerciseType = async (firebaseId: string): Promise<void> => {
  return await firebase
    .database()
    .ref(EXERCISE_TYPES_ROUTE)
    .child(firebaseId)
    .remove((error) => {
      if (error) {
        return Promise.reject();
      } else {
        return Promise.resolve();
      }
    });
};
