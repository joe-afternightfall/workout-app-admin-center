import React from 'react';
import {
  Segment,
  isSuperset,
  isCircuitSet,
  isStraightSet,
} from 'workout-app-common-core';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import ComponentBuilder from './ComponentBuilder';
import BuiltListItem from './components/BuiltListItem';
import { State } from '../../../../../../../../../configs/redux/store';

interface SlotProps {
  order: number;
  segmentId: string;
}

function buildComp(order: number, segment: Segment, slotProps: SlotProps) {
  const blink = slotProps.segmentId === segment.id && slotProps.order === order;
  return (
    <ComponentBuilder
      exerciseOrder={order}
      segment={segment}
      shouldBlink={blink}
    />
  );
}

function buildListItem(title: string, items: JSX.Element[]) {
  return (
    <BuiltListItem
      title={title}
      rightComponent={
        <>
          {items.map((element, index) => (
            <Grid item xs={12} key={index}>
              {element}
            </Grid>
          ))}
        </>
      }
    />
  );
}

const ExerciseListItem = ({
  segment,
  numberOfExercises,
  selectedExerciseSlotForSegment,
}: ExerciseListItemProps & PassedInProps): JSX.Element => {
  const componentsToRender: JSX.Element[] = [];

  if (isStraightSet(segment.trainingSetTypeId)) {
    const builtElement = buildComp(1, segment, selectedExerciseSlotForSegment);
    componentsToRender.push(buildListItem('Exercise', [builtElement]));
  } else if (isSuperset(segment.trainingSetTypeId)) {
    const firstElement = buildComp(1, segment, selectedExerciseSlotForSegment);
    const secondElement = buildComp(2, segment, selectedExerciseSlotForSegment);

    componentsToRender.push(
      buildListItem('Exercises', [firstElement, secondElement])
    );
  } else if (isCircuitSet(segment.trainingSetTypeId)) {
    let circuitIndex = 0;
    while (numberOfExercises > circuitIndex) {
      circuitIndex++;
      const element = buildComp(
        circuitIndex,
        segment,
        selectedExerciseSlotForSegment
      );
      componentsToRender.push(
        buildListItem(`Exercise #${circuitIndex}`, [element])
      );
    }
  }

  return <>{componentsToRender.map((element) => element)}</>;
};

interface PassedInProps {
  segment: Segment;
  numberOfExercises: number;
}

interface ExerciseListItemProps {
  selectedExerciseSlotForSegment: SlotProps;
}

const mapStateToProps = (state: State): ExerciseListItemProps => {
  return {
    selectedExerciseSlotForSegment:
      state.routineBuilderState.selectedExerciseSlotForSegment,
  } as unknown as ExerciseListItemProps;
};

export default connect(mapStateToProps)(ExerciseListItem);
