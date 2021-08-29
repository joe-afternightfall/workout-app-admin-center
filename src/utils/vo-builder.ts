import {
  CircuitTemplateDAO,
  CircuitTemplateVO,
  CircuitTypeDAO,
  CircuitTypeVO,
  ExerciseTypeDAO,
  ExerciseTypeVO,
  UserProfileDAO,
  UserProfileVO,
  WorkoutDAO,
  WorkoutVO,
} from 'workout-app-common-core';

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
