import {
  parameterTypes,
  TrainingSetType,
  trainingSetTypes,
} from 'workout-app-common-core';

// todo: rip to common core
export const getParameterTypeName = (id: string): string | undefined => {
  const foundType = parameterTypes.find((type) => type.id === id);

  return foundType && foundType.name;
};

export const getSetTypeName = (id: string): string | undefined => {
  const foundType = trainingSetTypes.find(
    (set: TrainingSetType) => set.id === id
  );

  return foundType && foundType.name;
};
