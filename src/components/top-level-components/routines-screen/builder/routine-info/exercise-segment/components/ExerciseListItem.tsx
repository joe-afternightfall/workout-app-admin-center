import React from 'react';
import {
  Segment,
  isSuperset,
  ExerciseVO,
  isStraightSet,
  getExerciseName,
  WorkoutExercise,
} from 'workout-app-common-core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  selectedExerciseSlotToFill,
  deleteExerciseFromSegment,
} from '../../../../../../../creators/routine-builder/builder';
import { State } from '../../../../../../../configs/redux/store';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import BlinkingListItem from './exercise-list-item/BlinkingListItem';
import ButtonListItem from './exercise-list-item/ButtonListItem';

const useStyles = makeStyles(() => createStyles({}));

const ExerciseListItem = ({
  exercises,
  segment,
  selectedExerciseSlotForSegment,
  selectExerciseHandler,
}: ExerciseListItemProps & PassedInProps): JSX.Element => {
  const classes = useStyles();
  let display = <div />;

  // todo: simplify this file : can rip out commonalities

  if (isStraightSet(segment.trainingSetTypeId)) {
    const blink =
      selectedExerciseSlotForSegment.segmentId === segment.id &&
      selectedExerciseSlotForSegment.order === 1;

    if (blink) {
      display = (
        <BlinkingListItem shouldBlink={true} title={'Select Exercise'} />
      );
    } else {
      const workoutExercise = segment.exercises[0];
      if (workoutExercise && workoutExercise.exerciseId) {
        display = (
          <BlinkingListItem
            shouldBlink={false}
            title={getExerciseName(exercises, workoutExercise.exerciseId)}
          />
        );
      } else {
        display = (
          <ButtonListItem
            title={`Click to add exercise ${1}`}
            clickHandler={() => {
              selectExerciseHandler(1);
            }}
          />
        );
      }
    }
  } else if (isSuperset(segment.trainingSetTypeId)) {
    let firstComponent: JSX.Element;
    let secondComponent: JSX.Element;
    const firstComponentBlink =
      selectedExerciseSlotForSegment.segmentId === segment.id &&
      selectedExerciseSlotForSegment.order === 1;
    const secondComponentBlink =
      selectedExerciseSlotForSegment.segmentId === segment.id &&
      selectedExerciseSlotForSegment.order === 2;

    if (firstComponentBlink) {
      firstComponent = (
        <BlinkingListItem shouldBlink={true} title={'Select Exercise 1'} />
      );
    } else {
      const workoutExercise = segment.exercises[0];
      if (
        workoutExercise &&
        workoutExercise.exerciseId &&
        workoutExercise.order === 1
      ) {
        firstComponent = (
          <BlinkingListItem
            shouldBlink={false}
            title={getExerciseName(exercises, workoutExercise.exerciseId)}
          />
        );
      } else {
        firstComponent = (
          <ButtonListItem
            title={`Click to add exercise ${1}`}
            clickHandler={() => {
              selectExerciseHandler(1);
            }}
          />
        );
      }
    }

    if (secondComponentBlink) {
      secondComponent = (
        <BlinkingListItem shouldBlink={true} title={'Select Exercise 2'} />
      );
    } else {
      let workoutExercise: WorkoutExercise | null = null;

      if (segment.exercises[1]) {
        workoutExercise = segment.exercises[1];
      } else if (segment.exercises[0]) {
        workoutExercise = segment.exercises[0];
      }

      if (
        workoutExercise &&
        workoutExercise.exerciseId &&
        workoutExercise.order === 2
      ) {
        secondComponent = (
          <BlinkingListItem
            shouldBlink={false}
            title={getExerciseName(exercises, workoutExercise.exerciseId)}
          />
        );
      } else {
        secondComponent = (
          <ButtonListItem
            title={`Click to add exercise ${2}`}
            clickHandler={() => {
              selectExerciseHandler(2);
            }}
          />
        );
      }
    }

    display = (
      <>
        {firstComponent}
        {secondComponent}
      </>
    );
  }
  return display;
};

interface PassedInProps {
  segment: Segment;
}

export interface ExerciseListItemProps {
  exercises: ExerciseVO[];
  selectExerciseHandler: (order: number) => void;
  selectedExerciseSlotForSegment: {
    order: number;
    segmentId: string;
  };
  deleteExerciseFromSegmentHandler: (exerciseId: string) => void;
}

const mapStateToProps = (state: State): ExerciseListItemProps => {
  return {
    exercises: state.applicationState.workoutConfigurations.exercises,
    selectedExerciseSlotForSegment:
      state.routineBuilderState.selectedExerciseSlotForSegment,
  } as unknown as ExerciseListItemProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): ExerciseListItemProps =>
  ({
    selectExerciseHandler: (order: number) => {
      dispatch(selectedExerciseSlotToFill(ownProps.segment.id, order));
    },
    deleteExerciseFromSegmentHandler: (exerciseId: string) => {
      dispatch(deleteExerciseFromSegment(ownProps.segment.id, exerciseId));
    },
  } as unknown as ExerciseListItemProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseListItem);
