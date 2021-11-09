import { v4 as uuidv4 } from 'uuid';
import {
  MuscleInfo,
  PRIMARY_MUSCLE_TARGET_TYPE_ID,
} from 'workout-app-common-core';

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
