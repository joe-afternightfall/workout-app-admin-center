import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  List,
  ListItem,
  CardHeader,
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

const RoutineInfoCard = ({
  disabled,
  exercises,
  addExerciseHandler,
}: RoutineInfoCardProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Card raised={false} square className={classes.root}>
      <CardHeader title={'Exercise List'} />
      <CardContent>
        {exercises.map((exercise, index) => {
          return (
            <List
              key={index}
              // subheader={<ListSubheader>{'Exercise List'}</ListSubheader>}
            >
              <ListItem
                button
                disabled={disabled}
                onClick={() => {
                  addExerciseHandler(exercise.id);
                }}
              >
                <ListItemText primary={exercise.name} />
              </ListItem>
            </List>
          );
        })}
      </CardContent>
    </Card>
  );
};

interface RoutineInfoCardProps {
  disabled: boolean;
  exercises: ExerciseVO[];
  addExerciseHandler: (exerciseId: string) => void;
}

const mapStateToProps = (state: State): RoutineInfoCardProps => {
  return {
    exercises: state.applicationState.workoutConfigurations.exercises,
    disabled:
      state.routineBuilderState.selectedExerciseSlotForSegment.segmentId === '',
  } as unknown as RoutineInfoCardProps;
};

const mapDispatchToProps = (dispatch: Dispatch): RoutineInfoCardProps =>
  ({
    addExerciseHandler: (exerciseId: string) => {
      dispatch(addExerciseToSegment(exerciseId));
    },
  } as unknown as RoutineInfoCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(RoutineInfoCard);
