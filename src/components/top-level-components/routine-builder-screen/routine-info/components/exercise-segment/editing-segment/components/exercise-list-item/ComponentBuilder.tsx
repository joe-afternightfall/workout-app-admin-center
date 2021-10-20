import React from 'react';
import {
  ExerciseVO,
  isDuration,
  getExerciseName,
  WorkoutExercise,
} from 'workout-app-common-core';
import ButtonListItem from './components/ButtonListItem';
import BlinkerListItem from './components/BlinkerListItem';
import StandardListItem from './components/StandardListItem';

const findExercise = (
  exercises: ExerciseVO[],
  id: string
): ExerciseVO | undefined => {
  return exercises.find((exercise) => exercise.id === id);
};

export default function ComponentBuilder({
  allExercises,
  shouldBlink,
  exerciseOrder,
  workoutExercises,
  selectExerciseHandler,
}: ComponentBuilderProps): JSX.Element {
  let builtComponent;

  if (shouldBlink) {
    builtComponent = <BlinkerListItem title={'Select Exercise'} />;
  } else {
    const foundWorkoutExercise: WorkoutExercise | undefined =
      workoutExercises.find(
        (workoutExercise) => workoutExercise.order === exerciseOrder
      );

    if (foundWorkoutExercise && foundWorkoutExercise.exerciseId) {
      const foundExercise = findExercise(
        allExercises,
        foundWorkoutExercise.exerciseId
      );

      const isDurationType =
        foundExercise && isDuration(foundExercise.parameterTypeId);

      builtComponent = (
        <StandardListItem
          isDurationType={isDurationType}
          id={foundWorkoutExercise.id}
          title={getExerciseName(allExercises, foundWorkoutExercise.exerciseId)}
        />
      );
    } else {
      builtComponent = (
        <ButtonListItem
          title={`Click to add exercise ${exerciseOrder}`}
          clickHandler={() => {
            selectExerciseHandler(exerciseOrder);
          }}
        />
      );
    }
  }

  return builtComponent;
}

export interface ComponentBuilderProps {
  allExercises: ExerciseVO[];
  shouldBlink: boolean;
  exerciseOrder: number;
  workoutExercises: WorkoutExercise[];
  selectExerciseHandler: (order: number) => void;
}
