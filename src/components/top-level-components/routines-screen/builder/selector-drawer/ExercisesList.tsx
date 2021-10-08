import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
} from '@material-ui/core';
import { State } from '../../../../../configs/redux/store';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ExerciseVO } from 'workout-app-common-core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      // maxWidth: 360,
      boxShadow: 'none',
      backgroundColor: theme.palette.background.paper,
    },
    animate: {
      transition: 'transform .35s ease-in-out',
    },
    grow: {
      // transform: 'scale(1.5)',
      height: '100%',
    },
    animateListItem: {
      height: '75vh',
    },
  })
);

const RoutineInfoCard = ({ exercises }: RoutineInfoCardProps): JSX.Element => {
  const classes = useStyles();
  const [openCard, setOpenCard] = React.useState('');

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
