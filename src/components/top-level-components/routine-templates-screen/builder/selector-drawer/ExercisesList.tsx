import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  List,
  ListItem,
  CardContent,
  ListItemText,
} from '@material-ui/core';
import { State } from '../../../../../configs/redux/store';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ExerciseVO } from 'workout-app-common-core';
import { Dispatch } from 'redux';
import { addExerciseToSegment } from '../../../../../creators/routine-builder/builder';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      top: 0,
      width: '100%',
      height: '100vh',
      position: 'fixed',
      boxShadow: 'none',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const ExerciseList = (props: ExerciseListProps): JSX.Element => {
  const classes = useStyles();
  const { disabled, exercises } = props;

  return (
    <Card raised={false} square className={classes.root}>
      <CardContent>
        {exercises.map((exercise, index) => {
          return (
            <List key={index}>
              <ListItem
                button
                disabled={disabled}
                onClick={() => {
                  props.addExerciseHandler(exercise.id);
                }}
              >
                <ListItemText primary={`${index}. ${exercise.name}`} />
              </ListItem>
            </List>
          );
        })}
      </CardContent>
    </Card>
  );
};

interface ExerciseListProps {
  disabled: boolean;
  exercises: ExerciseVO[];
  addExerciseHandler: (exerciseId: string) => void;
}

const mapStateToProps = (state: State): ExerciseListProps => {
  const searchValue = state.routineBuilderState.exerciseSearchValue;
  const filteredExercises =
    state.applicationState.workoutConfigurations.exercises.filter(
      (exercise) => exercise.name.toLowerCase().search(searchValue) != -1
    );
  return {
    exercises: filteredExercises,
    disabled:
      state.routineBuilderState.selectedExerciseSlotForSegment.segmentId === '',
  } as unknown as ExerciseListProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ExerciseListProps =>
  ({
    addExerciseHandler: (exerciseId: string) => {
      dispatch(addExerciseToSegment(exerciseId));
    },
  } as unknown as ExerciseListProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseList);
