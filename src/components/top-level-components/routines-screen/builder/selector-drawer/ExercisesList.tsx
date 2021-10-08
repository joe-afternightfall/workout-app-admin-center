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

const RoutineInfoCard = ({ exercises }: RoutineInfoCardProps): JSX.Element => {
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
              <ListItem button>
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
  exercises: ExerciseVO[];
}

const mapStateToProps = (state: State): RoutineInfoCardProps => {
  return {
    exercises: state.applicationState.workoutConfigurations.exercises,
  } as unknown as RoutineInfoCardProps;
};

const mapDispatchToProps = (): RoutineInfoCardProps =>
  ({} as unknown as RoutineInfoCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(RoutineInfoCard);
