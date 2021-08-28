import { ActionTypes } from './actions';
import { WorkoutVO } from '../configs/models/WorkoutVO';

export interface ValidatedUserAction {
  type: ActionTypes.VALIDATED_USER;
  email: string;
}

export const validatedUser = (email: string): ValidatedUserAction => {
  return {
    type: ActionTypes.VALIDATED_USER,
    email: email,
  };
};

export interface LoadUsersWorkoutsAction {
  type: ActionTypes.LOAD_USER_WORKOUTS;
  workouts: WorkoutVO[];
}

export const loadUsersWorkouts = (
  workouts: WorkoutVO[]
): LoadUsersWorkoutsAction => {
  return {
    type: ActionTypes.LOAD_USER_WORKOUTS,
    workouts: workouts,
  };
};
