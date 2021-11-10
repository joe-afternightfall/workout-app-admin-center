import {
  MuscleInfo,
  WorkoutTimer,
  PRIMARY_MUSCLE_TARGET_TYPE_ID,
} from 'workout-app-common-core';
import { v4 as uuidv4 } from 'uuid';

export const primaryMuscle = (order: number): MuscleInfo => {
  return {
    id: uuidv4(),
    order: order,
    muscleTargetTypeId: PRIMARY_MUSCLE_TARGET_TYPE_ID,
    muscleId: '',
  };
};

export const secondaryMuscle = (order: number): MuscleInfo => {
  return {
    id: uuidv4(),
    order: order,
    muscleTargetTypeId: '',
    muscleId: '',
  };
};

export const workoutTimer = (order: number): WorkoutTimer => {
  return {
    id: uuidv4(),
    order: order,
    stepperTitle: '',
    timerMessage: '',
    seconds: 0,
  };
};
