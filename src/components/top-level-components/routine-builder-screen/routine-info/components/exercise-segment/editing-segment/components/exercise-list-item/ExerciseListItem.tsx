import React from 'react';
import {
  Segment,
  isSuperset,
  ExerciseVO,
  isStraightSet,
} from 'workout-app-common-core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import ComponentBuilder from './ComponentBuilder';
import BuiltListItem from './components/BuiltListItem';
import { State } from '../../../../../../../../../configs/redux/store';
import { selectedExerciseSlotToFill } from '../../../../../../../../../creators/routine-builder/builder';

const ExerciseListItem = ({
  exercises,
  segment,
  selectedExerciseSlotForSegment,
  selectExerciseHandler,
}: ExerciseListItemProps & PassedInProps): JSX.Element => {
  let display = <div />;

  if (isStraightSet(segment.trainingSetTypeId)) {
    const blink =
      selectedExerciseSlotForSegment.segmentId === segment.id &&
      selectedExerciseSlotForSegment.order === 1;

    const straightSetComponent = (
      <ComponentBuilder
        allExercises={exercises}
        shouldBlink={blink}
        exerciseOrder={1}
        workoutExercises={segment.exercises}
        selectExerciseHandler={selectExerciseHandler}
      />
    );

    display = (
      <BuiltListItem title={'Exercise'} rightComponent={straightSetComponent} />
    );
  } else if (isSuperset(segment.trainingSetTypeId)) {
    const firstComponentBlink =
      selectedExerciseSlotForSegment.segmentId === segment.id &&
      selectedExerciseSlotForSegment.order === 1;
    const secondComponentBlink =
      selectedExerciseSlotForSegment.segmentId === segment.id &&
      selectedExerciseSlotForSegment.order === 2;

    const firstComponent = (
      <ComponentBuilder
        allExercises={exercises}
        shouldBlink={firstComponentBlink}
        exerciseOrder={1}
        workoutExercises={segment.exercises}
        selectExerciseHandler={selectExerciseHandler}
      />
    );

    const secondComponent = (
      <ComponentBuilder
        allExercises={exercises}
        shouldBlink={secondComponentBlink}
        exerciseOrder={2}
        workoutExercises={segment.exercises}
        selectExerciseHandler={selectExerciseHandler}
      />
    );

    display = (
      <BuiltListItem
        title={'Exercises'}
        rightComponent={
          <>
            <Grid item xs={12}>
              {firstComponent}
            </Grid>
            <Grid item xs={12}>
              {secondComponent}
            </Grid>
          </>
        }
      />
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
