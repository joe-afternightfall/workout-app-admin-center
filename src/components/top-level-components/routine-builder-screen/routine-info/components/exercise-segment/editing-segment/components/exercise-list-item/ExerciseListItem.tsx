import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import ComponentBuilder from './ComponentBuilder';
import BuiltListItem from './components/BuiltListItem';
import { State } from '../../../../../../../../../configs/redux/store';
import {
  Segment,
  isSuperset,
  isStraightSet,
  isCircuitSet,
} from 'workout-app-common-core';

interface ComponentToRender {
  title: string;
  component: JSX.Element;
}

const ExerciseListItem = ({
  segment,
  selectedExerciseSlotForSegment,
}: ExerciseListItemProps & PassedInProps): JSX.Element => {
  // let builtListItem = <div />;
  let title = '';
  const componentsToRender: JSX.Element[] = [];

  if (isStraightSet(segment.trainingSetTypeId)) {
    const blink =
      selectedExerciseSlotForSegment.segmentId === segment.id &&
      selectedExerciseSlotForSegment.order === 1;

    componentsToRender.push(
      <BuiltListItem
        title={'Exercise'}
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
    );
  } else if (isSuperset(segment.trainingSetTypeId)) {
    title = 'Exercises';
    const firstComponentBlink =
      selectedExerciseSlotForSegment.segmentId === segment.id &&
      selectedExerciseSlotForSegment.order === 1;
    const secondComponentBlink =
      selectedExerciseSlotForSegment.segmentId === segment.id &&
      selectedExerciseSlotForSegment.order === 2;

    componentsToRender.push(
      <BuiltListItem
        title={title}
        rightComponent={
          <>
            <Grid item xs={12}>
              <ComponentBuilder
                exerciseOrder={1}
                segment={segment}
                shouldBlink={firstComponentBlink}
              />
            </Grid>
            <Grid item xs={12}>
              <ComponentBuilder
                exerciseOrder={2}
                segment={segment}
                shouldBlink={secondComponentBlink}
              />
            </Grid>
          </>
        }
      />
    );
  }

  // else if (isCircuitSet(segment.trainingSetTypeId)) {
  //   const exerciseLength = segment.exercises.length;
  //   const componentsToRender: JSX.Element[] = [];
  //
  //   if (exerciseLength === 0) {
  //     const blink =
  //       selectedExerciseSlotForSegment.segmentId === segment.id &&
  //       selectedExerciseSlotForSegment.order === 1;
  //     componentsToRender.push(
  //       <BuiltListItem
  //         title={'Exercise # 1'}
  //         rightComponent={
  //           <Grid item xs={12}>
  //             <ComponentBuilder
  //               exerciseOrder={1}
  //               segment={segment}
  //               shouldBlink={blink}
  //             />
  //           </Grid>
  //         }
  //       />
  //     );
  //   } else {
  //     segment.exercises.map((workoutExercise, index) => {
  //       componentsToRender.push(
  //         <BuiltListItem
  //           title={`Exercise #${index + 1}`}
  //           rightComponent={
  //             <Grid item xs={12}>
  //               <ComponentBuilder
  //                 exerciseOrder={1}
  //                 segment={segment}
  //                 shouldBlink={blink}
  //               />
  //             </Grid>
  //           }
  //         />
  //       );
  //     });
  //     componentsToRender.push();
  //   }
  // }

  return <>{componentsToRender.map((element) => element)}</>;
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
