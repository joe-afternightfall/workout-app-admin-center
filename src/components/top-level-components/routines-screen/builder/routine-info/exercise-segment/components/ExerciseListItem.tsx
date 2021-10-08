import React from 'react';
import { connect } from 'react-redux';
import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { ExerciseVO, getExerciseName, Segment } from 'workout-app-common-core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Dispatch } from 'redux';
import CloseIcon from '@material-ui/icons/Close';
import {
  deleteExerciseFromSegment,
  selectExerciseForSegment,
} from '../../../../../../../creators/routine-builder/builder';
import { State } from '../../../../../../../configs/redux/store';
import Blinker from '../../../../../Blinker';

const useStyles = makeStyles(() => createStyles({}));

const ExerciseListItem = ({
  order,
  exercises,
  segment,
  selectExerciseForSegment,
  selectExerciseHandler,
  deleteExerciseFromSegmentHandler,
}: ExerciseListItemProps & PassedInProps): JSX.Element => {
  const classes = useStyles();

  const workoutExercise = segment.exercises[order - 1];
  return (
    <>
      {selectExerciseForSegment.segmentId === segment.id &&
      selectExerciseForSegment.order === order ? (
        <Blinker
          shouldBlink={true}
          component={
            <ListItem>
              <ListItemText primary={'Select Exercise'} />
            </ListItem>
          }
        />
      ) : workoutExercise && workoutExercise.exerciseId ? (
        <ListItem>
          <ListItemText
            primary={getExerciseName(exercises, workoutExercise.exerciseId)}
          />
          <ListItemSecondaryAction>
            <IconButton
              onClick={() => {
                deleteExerciseFromSegmentHandler(workoutExercise.exerciseId);
              }}
            >
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ) : (
        <ListItem
          button
          onClick={() => {
            selectExerciseHandler(order);
          }}
        >
          <ListItemText primary={`Click to add exercise ${order}`} />
        </ListItem>
      )}
    </>
  );
};

interface PassedInProps {
  order: number;
  segment: Segment;
}

export interface ExerciseListItemProps {
  exercises: ExerciseVO[];
  selectExerciseHandler: (order: number) => void;
  selectExerciseForSegment: {
    order: number;
    segmentId: string;
  };
  deleteExerciseFromSegmentHandler: (exerciseId: string) => void;
}

const mapStateToProps = (state: State): ExerciseListItemProps => {
  return {
    phases: state.routineBuilderState.selectedRoutine.phases,
    exercises: state.applicationState.workoutConfigurations.exercises,
    // todo: rename selectExerciseForSegment with something better
    selectExerciseForSegment:
      state.routineBuilderState.selectExerciseForSegment,
  } as unknown as ExerciseListItemProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): ExerciseListItemProps =>
  ({
    selectExerciseHandler: (order: number) => {
      dispatch(selectExerciseForSegment(ownProps.segment.id, order));
    },
    deleteExerciseFromSegmentHandler: (exerciseId: string) => {
      dispatch(deleteExerciseFromSegment(ownProps.segment.id, exerciseId));
    },
  } as unknown as ExerciseListItemProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseListItem);
