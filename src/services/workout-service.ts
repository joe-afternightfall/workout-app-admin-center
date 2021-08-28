import firebase from 'firebase';
import { workoutsSnapToVO } from '../utils/vo-builder';
import { WorkoutVO } from '../configs/models/WorkoutVO';
import { WORKOUTS_ROUTE } from '../configs/constants/firebase-routes';

export const getWorkoutsForUser = async (
  email: string
): Promise<WorkoutVO[]> => {
  return await firebase
    .database()
    .ref(WORKOUTS_ROUTE)
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then((snapshot) => {
      if (snapshot.val()) {
        return workoutsSnapToVO(snapshot.val());
      } else {
        return [];
      }
    });
};
