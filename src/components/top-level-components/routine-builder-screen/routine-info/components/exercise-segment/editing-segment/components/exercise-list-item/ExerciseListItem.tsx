import React from 'react';
import {
  Segment,
  isDuration,
  isSuperset,
  ExerciseVO,
  isStraightSet,
  getExerciseName,
  WorkoutExercise,
} from 'workout-app-common-core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import BaseListItem from './BaseListItem';
import LineItemTitle from '../base-components/LineItemTitle';
import { Grid, ListItem, ListItemText } from '@material-ui/core';
import { State } from '../../../../../../../../../configs/redux/store';
import { selectedExerciseSlotToFill } from '../../../../../../../../../creators/routine-builder/builder';

const findExercise = (
  exercises: ExerciseVO[],
  id: string
): ExerciseVO | undefined => {
  return exercises.find((exercise) => exercise.id === id);
};

const buildBlinker = (title: string): JSX.Element => {
  return <BaseListItem title={title} itemType={'blinker'} shouldBlink={true} />;
};

const buildStandard = (
  isDurationType: boolean | undefined,
  id: string,
  title: string
): JSX.Element => {
  return (
    <BaseListItem
      title={title}
      workoutExerciseId={id}
      isDuration={isDurationType}
      itemType={'standard'}
    />
  );
};

const buildButton = (title: string, clickHandler: () => void): JSX.Element => {
  return (
    <BaseListItem
      itemType={'button'}
      title={title}
      clickHandler={clickHandler}
    />
  );
};

const buildListItem = (
  title: string,
  rightComponent: JSX.Element
): JSX.Element => {
  return (
    <ListItem>
      <ListItemText
        disableTypography
        primary={
          <Grid container>
            <Grid item xs={6} container alignItems={'center'}>
              <LineItemTitle title={title} />
            </Grid>
            <Grid item xs={6} container>
              {rightComponent}
            </Grid>
          </Grid>
        }
      />
    </ListItem>
  );
};

const ExerciseListItem = ({
  exercises,
  segment,
  selectedExerciseSlotForSegment,
  selectExerciseHandler,
}: ExerciseListItemProps & PassedInProps): JSX.Element => {
  let display = <div />;

  if (isStraightSet(segment.trainingSetTypeId)) {
    let straightSetComponent;
    const blink =
      selectedExerciseSlotForSegment.segmentId === segment.id &&
      selectedExerciseSlotForSegment.order === 1;

    if (blink) {
      straightSetComponent = buildBlinker('Select Exercise');
    } else {
      const workoutExercise: WorkoutExercise | undefined =
        segment.exercises.find(
          (workoutExercise) => workoutExercise.order === 1
        );
      if (workoutExercise && workoutExercise.exerciseId) {
        const foundExercise = findExercise(
          exercises,
          workoutExercise.exerciseId
        );

        const isDurationType =
          foundExercise && isDuration(foundExercise.parameterTypeId);
        straightSetComponent = buildStandard(
          isDurationType,
          workoutExercise.id,
          getExerciseName(exercises, workoutExercise.exerciseId)
        );
      } else {
        straightSetComponent = buildButton(`Click to add exercise ${1}`, () => {
          selectExerciseHandler(1);
        });
      }
    }

    display = buildListItem(
      'Exercise',
      <Grid item xs={12}>
        {straightSetComponent}
      </Grid>
    );
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
      firstComponent = buildBlinker('Select Exercise 1');
    } else {
      const workoutExercise: WorkoutExercise | undefined =
        segment.exercises.find(
          (workoutExercise) => workoutExercise.order === 1
        );
      if (workoutExercise && workoutExercise.exerciseId) {
        const foundExercise = findExercise(
          exercises,
          workoutExercise.exerciseId
        );

        const isDurationType =
          foundExercise && isDuration(foundExercise.parameterTypeId);

        firstComponent = buildStandard(
          isDurationType,
          workoutExercise.id,
          getExerciseName(exercises, workoutExercise.exerciseId)
        );
      } else {
        firstComponent = buildButton(`Click to add exercise ${1}`, () => {
          selectExerciseHandler(1);
        });
      }
    }

    if (secondComponentBlink) {
      secondComponent = buildBlinker('Select Exercise 2');
    } else {
      const workoutExercise: WorkoutExercise | undefined =
        segment.exercises.find(
          (workoutExercise) => workoutExercise.order === 2
        );

      if (workoutExercise && workoutExercise.exerciseId) {
        const foundExercise = findExercise(
          exercises,
          workoutExercise.exerciseId
        );

        const isDurationType =
          foundExercise && isDuration(foundExercise.parameterTypeId);

        secondComponent = buildStandard(
          isDurationType,
          workoutExercise.id,
          getExerciseName(exercises, workoutExercise.exerciseId)
        );
      } else {
        secondComponent = buildButton(`Click to add exercise ${2}`, () => {
          selectExerciseHandler(2);
        });
      }
    }

    display = buildListItem(
      'Exercises',
      <>
        <Grid item xs={12}>
          {firstComponent}
        </Grid>
        <Grid item xs={12}>
          {secondComponent}
        </Grid>
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
  } as unknown as ExerciseListItemProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseListItem);
