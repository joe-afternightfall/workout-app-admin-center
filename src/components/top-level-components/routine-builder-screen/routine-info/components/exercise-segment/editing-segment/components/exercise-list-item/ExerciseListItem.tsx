import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import ComponentBuilder from './ComponentBuilder';
import BuiltListItem from './components/BuiltListItem';
import { State } from '../../../../../../../../../configs/redux/store';
import { Segment, isSuperset, isStraightSet } from 'workout-app-common-core';

const ExerciseListItem = ({
  segment,
  selectedExerciseSlotForSegment,
}: ExerciseListItemProps & PassedInProps): JSX.Element => {
  let firstComponent = <div />;
  let secondComponent = <div />;
  let title = '';

  if (isStraightSet(segment.trainingSetTypeId)) {
    title = 'Exercise';
    const blink =
      selectedExerciseSlotForSegment.segmentId === segment.id &&
      selectedExerciseSlotForSegment.order === 1;

    firstComponent = (
      <ComponentBuilder
        exerciseOrder={1}
        segment={segment}
        shouldBlink={blink}
      />
    );
  } else if (isSuperset(segment.trainingSetTypeId)) {
    title = 'Exercises';
    const firstComponentBlink =
      selectedExerciseSlotForSegment.segmentId === segment.id &&
      selectedExerciseSlotForSegment.order === 1;
    const secondComponentBlink =
      selectedExerciseSlotForSegment.segmentId === segment.id &&
      selectedExerciseSlotForSegment.order === 2;

    firstComponent = (
      <ComponentBuilder
        exerciseOrder={1}
        segment={segment}
        shouldBlink={firstComponentBlink}
      />
    );

    secondComponent = (
      <ComponentBuilder
        exerciseOrder={2}
        segment={segment}
        shouldBlink={secondComponentBlink}
      />
    );
  }

  return (
    <BuiltListItem
      title={title}
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
};

interface PassedInProps {
  segment: Segment;
}

interface ExerciseListItemProps {
  selectedExerciseSlotForSegment: {
    order: number;
    segmentId: string;
  };
}

const mapStateToProps = (state: State): ExerciseListItemProps => {
  return {
    selectedExerciseSlotForSegment:
      state.routineBuilderState.selectedExerciseSlotForSegment,
  } as unknown as ExerciseListItemProps;
};

export default connect(mapStateToProps)(ExerciseListItem);
