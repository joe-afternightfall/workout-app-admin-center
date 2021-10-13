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
import BaseListItem from './BaseListItem';
import { State } from '../../../../../../../../../../configs/redux/store';
import { selectedExerciseSlotToFill } from '../../../../../../../../../../creators/routine-builder/builder';
import { Grid, ListItem, ListItemText } from '@material-ui/core';
import LineItemTitle from '../base-components/LineItemTitle';

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
      straightSetComponent = (
        <BaseListItem
          itemType={'blinker'}
          shouldBlink={true}
          title={'Select Exercise'}
        />
      );
    } else {
      const workoutExercise = segment.exercises[0];
      if (workoutExercise && workoutExercise.exerciseId) {
        straightSetComponent = (
          <BaseListItem
            itemType={'standard'}
            title={getExerciseName(exercises, workoutExercise.exerciseId)}
          />
        );
      } else {
        straightSetComponent = (
          <BaseListItem
            itemType={'button'}
            title={`Click to add exercise ${1}`}
            clickHandler={() => {
              selectExerciseHandler(1);
            }}
          />
        );
      }
    }
    display = (
      <ListItem>
        <ListItemText
          disableTypography
          primary={
            <Grid container>
              <Grid item xs={6} container alignItems={'center'}>
                <LineItemTitle title={'Exercise'} />
              </Grid>
              <Grid item xs={6} container>
                {straightSetComponent}
              </Grid>
            </Grid>
          }
        />
      </ListItem>
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
      firstComponent = (
        <BaseListItem
          itemType={'blinker'}
          shouldBlink={true}
          title={'Select Exercise 1'}
        />
      );
    } else {
      const workoutExercise = segment.exercises[0];
      if (
        workoutExercise &&
        workoutExercise.exerciseId &&
        workoutExercise.order === 1
      ) {
        firstComponent = (
          <BaseListItem
            itemType={'standard'}
            title={getExerciseName(exercises, workoutExercise.exerciseId)}
          />
        );
      } else {
        firstComponent = (
          <BaseListItem
            title={`Click to add exercise ${1}`}
            itemType={'button'}
            clickHandler={() => {
              selectExerciseHandler(1);
            }}
          />
        );
      }
    }

    if (secondComponentBlink) {
      secondComponent = (
        <BaseListItem
          itemType={'blinker'}
          shouldBlink={true}
          title={'Select Exercise 2'}
        />
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
          <BaseListItem
            title={getExerciseName(exercises, workoutExercise.exerciseId)}
            itemType={'standard'}
          />
        );
      } else {
        secondComponent = (
          <BaseListItem
            itemType={'button'}
            title={`Click to add exercise ${2}`}
            clickHandler={() => {
              selectExerciseHandler(2);
            }}
          />
        );
      }
    }

    display = (
      <ListItem>
        <ListItemText
          disableTypography
          primary={
            <Grid container>
              <Grid item xs={6} container alignItems={'center'}>
                <LineItemTitle title={'Exercises'} />
              </Grid>
              <Grid item xs={6} container>
                {firstComponent}
                {secondComponent}
              </Grid>
            </Grid>
          }
        />
      </ListItem>
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
