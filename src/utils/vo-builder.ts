import { ExerciseTypeDAO } from '../configs/models/workout-configurations/exercise-type/ExerciseTypeDAO';
import { ExerciseTypeVO } from '../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';
import { CircuitTypeDAO } from '../configs/models/workout-configurations/circuit-type/CircuitTypeDAO';
import { CircuitTypeVO } from '../configs/models/workout-configurations/circuit-type/CircuitTypeVO';
import { WorkoutDAO } from '../configs/models/WorkoutDAO';
import { WorkoutVO } from '../configs/models/WorkoutVO';
import { UserProfileDAO } from '../configs/models/UserProfileDAO';
import { UserProfileVO } from '../configs/models/UserProfileVO';
import { CircuitTemplateDAO } from '../configs/models/CircuitTemplateDAO';
import { CircuitTemplateVO } from '../configs/models/CircuitTemplateVO';

export interface ExerciseTypeSnapshot {
  [key: string]: ExerciseTypeDAO;
}
export const exerciseTypeSnapToVO = (
  snap: ExerciseTypeSnapshot
): ExerciseTypeVO[] => {
  return Object.keys(snap).map((key: string): ExerciseTypeVO => {
    return {
      firebaseId: key,
      id: snap[key].id,
      name: snap[key].name,
      muscleGroupIds: snap[key].muscleGroupIds,
      setType: snap[key].setType,
    };
  });
};

export interface CircuitTypeSnapshot {
  [key: string]: CircuitTypeDAO;
}

export const circuitTypeSnapToVO = (
  snap: CircuitTypeSnapshot
): CircuitTypeVO[] => {
  return Object.keys(snap).map((key: string) => {
    return {
      firebaseId: key,
      id: snap[key].id,
      name: snap[key].name,
    };
  });
};

export interface WorkoutsSnapshot {
  [key: string]: WorkoutDAO;
}

export const workoutsSnapToVO = (snap: WorkoutsSnapshot): WorkoutVO[] => {
  return Object.keys(snap).map((key: string) => {
    return {
      firebaseId: key,
      id: snap[key].id,
      email: snap[key].email,
      circuits: snap[key].circuits,
      date: snap[key].date,
      time: snap[key].time,
    };
  });
};

export interface UserProfileSnapshot {
  [key: string]: UserProfileDAO;
}

export const userProfileSnapToVO = (
  snap: UserProfileSnapshot
): UserProfileVO[] => {
  return Object.keys(snap).map((key: string) => {
    return {
      firebaseId: key,
      id: snap[key].id,
      email: snap[key].email,
      profileIcon: snap[key].profileIcon,
      displayName: snap[key].displayName,
      height: snap[key].height,
      weights: snap[key].weights,
      dateOfBirth: snap[key].dateOfBirth,
      lastUpdatedOn: snap[key].lastUpdatedOn,
    };
  });
};

export interface CircuitTemplateSnapshot {
  [key: string]: CircuitTemplateDAO;
}

export const circuitTemplateSnapToVO = (
  snap: CircuitTemplateSnapshot
): CircuitTemplateVO[] => {
  return Object.keys(snap).map((key: string) => {
    return {
      firebaseId: key,
      id: snap[key].id,
      circuitId: snap[key].circuitId,
      circuitNickname: snap[key].circuitNickname,
      exercises: snap[key].exercises,
    };
  });
};
