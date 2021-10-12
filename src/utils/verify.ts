import { isStraightSet, isSuperset, Segment } from 'workout-app-common-core';

export const verifySegmentComplete = (segment: Segment): boolean => {
  let exerciseIdsPresent = false;
  let exerciseSetsPresent = false;

  // requirements of "done"
  // 1. checking for exercise ids to be filled out
  if (isSuperset(segment.trainingSetTypeId)) {
    exerciseIdsPresent =
      segment.exercises[0] &&
      segment.exercises[0].exerciseId !== '' &&
      segment.exercises[1] &&
      segment.exercises[1].exerciseId !== '';
  } else if (isStraightSet(segment.trainingSetTypeId)) {
    exerciseIdsPresent =
      segment.exercises[0] && segment.exercises[0].exerciseId !== '';
  }

  // 2. checking that training set type id not empty
  const trainingSetIdPresent = segment.trainingSetTypeId !== '';

  // 3. number of sets > 0
  segment.exercises.map((workoutExercise) => {
    exerciseSetsPresent = workoutExercise.sets.length > 0;
  });
  return exerciseIdsPresent && trainingSetIdPresent && exerciseSetsPresent;
};
