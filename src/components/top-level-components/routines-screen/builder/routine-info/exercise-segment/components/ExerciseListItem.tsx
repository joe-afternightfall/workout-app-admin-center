import React from 'react';
import {
  ListItem,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import {
  Segment,
  Blinker,
  isSuperset,
  ExerciseVO,
  isStraightSet,
  getExerciseName,
  WorkoutExercise,
} from 'workout-app-common-core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import {
  selectedExerciseSlotToFill,
  deleteExerciseFromSegment,
} from '../../../../../../../creators/routine-builder/builder';
import { State } from '../../../../../../../configs/redux/store';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({}));

const ExerciseListItem = ({
  exercises,
  segment,
  selectedExerciseSlotForSegment,
  selectExerciseHandler,
  deleteExerciseFromSegmentHandler,
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
        <Blinker
          shouldBlink={true}
          component={
            <ListItem>
              <ListItemText primary={'Select Exercise'} />
            </ListItem>
          }
        />
      );
    } else {
      const workoutExercise = segment.exercises[0];
      if (workoutExercise && workoutExercise.exerciseId) {
        display = (
          <ListItem>
            <ListItemText
              primary={getExerciseName(exercises, workoutExercise.exerciseId)}
            />
            {/*todo: come back and implement after changing segment implementation*/}
            {/*<ListItemSecondaryAction>*/}
            {/*  <IconButton*/}
            {/*    onClick={() => {*/}
            {/*      deleteExerciseFromSegmentHandler(workoutExercise.exerciseId);*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    <CloseIcon />*/}
            {/*  </IconButton>*/}
            {/*</ListItemSecondaryAction>*/}
          </ListItem>
        );
      } else {
        display = (
          <ListItem
            button
            onClick={() => {
              selectExerciseHandler(1);
            }}
          >
            <ListItemText primary={`Click to add exercise ${1}`} />
          </ListItem>
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
        <Blinker
          shouldBlink={true}
          component={
            <ListItem>
              <ListItemText primary={'Select Exercise 1'} />
            </ListItem>
          }
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
          <ListItem>
            <ListItemText
              primary={getExerciseName(exercises, workoutExercise.exerciseId)}
            />
            {/*todo: come back and implement after changing segment implementation*/}
            {/*<ListItemSecondaryAction>*/}
            {/*  <IconButton*/}
            {/*    onClick={() => {*/}
            {/*      deleteExerciseFromSegmentHandler(workoutExercise.exerciseId);*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    <CloseIcon />*/}
            {/*  </IconButton>*/}
            {/*</ListItemSecondaryAction>*/}
          </ListItem>
        );
      } else {
        firstComponent = (
          <ListItem
            button
            onClick={() => {
              selectExerciseHandler(1);
            }}
          >
            <ListItemText primary={`Click to add exercise ${1}`} />
          </ListItem>
        );
      }
    }

    if (secondComponentBlink) {
      secondComponent = (
        <Blinker
          shouldBlink={true}
          component={
            <ListItem>
              <ListItemText primary={'Select Exercise 2'} />
            </ListItem>
          }
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
          <ListItem>
            <ListItemText
              primary={getExerciseName(exercises, workoutExercise.exerciseId)}
            />
            {/*todo: come back and implement after changing segment implementation*/}
            {/*<ListItemSecondaryAction>*/}
            {/*  <IconButton*/}
            {/*    onClick={() => {*/}
            {/*      workoutExercise &&*/}
            {/*        deleteExerciseFromSegmentHandler(*/}
            {/*          workoutExercise.exerciseId*/}
            {/*        );*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    <CloseIcon />*/}
            {/*  </IconButton>*/}
            {/*</ListItemSecondaryAction>*/}
          </ListItem>
        );
      } else {
        secondComponent = (
          <ListItem
            button
            onClick={() => {
              selectExerciseHandler(2);
            }}
          >
            <ListItemText primary={`Click to add exercise ${2}`} />
          </ListItem>
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
    phases: state.routineBuilderState.selectedRoutine.phases,
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
