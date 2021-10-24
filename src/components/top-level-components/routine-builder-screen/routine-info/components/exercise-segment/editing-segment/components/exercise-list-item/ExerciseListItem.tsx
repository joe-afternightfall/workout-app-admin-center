import React from 'react';
import { connect } from 'react-redux';
import { Grid, ListItem, ListItemText } from '@material-ui/core';
import ComponentBuilder from './ComponentBuilder';
import BuiltListItem from './components/BuiltListItem';
import { State } from '../../../../../../../../../configs/redux/store';
import {
  Segment,
  isSuperset,
  isStraightSet,
  isCircuitSet,
} from 'workout-app-common-core';

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
  selectedExerciseSlotForSegment,
}: ExerciseListItemProps & PassedInProps): JSX.Element => {
  // let builtListItem = <div />;
  const title = '';
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
    const exerciseLength = segment.exercises.length;

    if (exerciseLength === 0) {
      const blink =
        selectedExerciseSlotForSegment.segmentId === segment.id &&
        selectedExerciseSlotForSegment.order === 1;

      componentsToRender.push(
        <>
          <BuiltListItem
            title={'Exercise # 1'}
            rightComponent={
              <Grid item xs={12}>
                <ComponentBuilder
                  exerciseOrder={1}
                  segment={segment}
                  shouldBlink={blink}
                />
              </Grid>
            }
          />
          <ListItem button>
            <ListItemText primary={'add to circuit'} />
          </ListItem>
        </>
      );
    } else {
      segment.exercises.map((workoutExercise, index) => {
        componentsToRender.push(
          <BuiltListItem
            title={`Exercise #${index + 1}`}
            rightComponent={
              <Grid item xs={12}>
                <ComponentBuilder
                  exerciseOrder={1}
                  segment={segment}
                  shouldBlink={false}
                />
              </Grid>
            }
          />
        );
      });
      componentsToRender.push();
    }
  }

  return <>{componentsToRender.map((element) => element)}</>;
};

interface PassedInProps {
  segment: Segment;
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
