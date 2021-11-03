import {
  ExerciseVO,
  PhaseVO,
  TrainingSetTypeVO,
} from 'workout-app-common-core';

export const getExerciseName = (
  exercises: ExerciseVO[],
  id: string
): string | undefined => {
  const foundExercise = exercises.find((exercise) => exercise.id === id);
  return foundExercise && foundExercise.name;
};

export const getTrainingSetTypeName = (
  trainingSetTypes: TrainingSetTypeVO[],
  id: string
): string | undefined => {
  const foundSetType = trainingSetTypes.find((setType) => setType.id === id);
  return foundSetType && foundSetType.name;
};

export const getPhaseName = (
  phases: PhaseVO[],
  id: string
): string | undefined => {
  const foundPhase = phases.find((phase) => phase.id === id);
  return foundPhase && foundPhase.name;
};
