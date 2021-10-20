import React from 'react';
import { Dispatch } from 'redux';
import {
  Segment,
  ExerciseVO,
  isDuration,
  getExerciseName,
  WorkoutExercise,
} from 'workout-app-common-core';
import { connect } from 'react-redux';
import ButtonListItem from './components/ButtonListItem';
import BlinkerListItem from './components/BlinkerListItem';
import StandardListItem from './components/StandardListItem';
import { State } from '../../../../../../../../../configs/redux/store';
import { selectedExerciseSlotToFill } from '../../../../../../../../../creators/routine-builder/builder';

const findExercise = (
  exercises: ExerciseVO[],
  id: string
): ExerciseVO | undefined => {
  return exercises.find((exercise) => exercise.id === id);
};

const ComponentBuilder = ({
  allExercises,
  shouldBlink,
  exerciseOrder,
  segment,
  selectExerciseHandler,
}: ComponentBuilderProps & PassedInProps): JSX.Element => {
  let builtComponent;

  if (shouldBlink) {
    builtComponent = <BlinkerListItem title={'Select Exercise'} />;
  } else {
    const foundWorkoutExercise: WorkoutExercise | undefined =
      segment.exercises.find(
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
};

interface PassedInProps {
  shouldBlink: boolean;
  exerciseOrder: number;
  segment: Segment;
}

interface ComponentBuilderProps {
  allExercises: ExerciseVO[];
  selectExerciseHandler: (order: number) => void;
}

const mapStateToProps = (state: State): ComponentBuilderProps => {
  return {
    allExercises: state.applicationState.workoutConfigurations.exercises,
  } as unknown as ComponentBuilderProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): ComponentBuilderProps =>
  ({
    selectExerciseHandler: (order: number) => {
      dispatch(selectedExerciseSlotToFill(ownProps.segment.id, order));
    },
  } as unknown as ComponentBuilderProps);

export default connect(mapStateToProps, mapDispatchToProps)(ComponentBuilder);