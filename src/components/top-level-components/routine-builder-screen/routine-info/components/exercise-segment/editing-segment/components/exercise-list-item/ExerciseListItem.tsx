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
  let display = <div />;

  if (isStraightSet(segment.trainingSetTypeId)) {
    const blink =
      selectedExerciseSlotForSegment.segmentId === segment.id &&
      selectedExerciseSlotForSegment.order === 1;

    const straightSetComponent = (
      <ComponentBuilder
        exerciseOrder={1}
        segment={segment}
        shouldBlink={blink}
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
        exerciseOrder={1}
        segment={segment}
        shouldBlink={firstComponentBlink}
      />
    );

    const secondComponent = (
      <ComponentBuilder
        exerciseOrder={2}
        segment={segment}
        shouldBlink={secondComponentBlink}
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
