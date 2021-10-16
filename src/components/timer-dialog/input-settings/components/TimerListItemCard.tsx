import React from 'react';
import {
  Card,
  ListItem,
  Typography,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { NewWorkoutTimer } from '../InputSettings';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      paddingTop: 4,
    },
  })
);

export default function TimerListItemCard({
  timer,
  deleteHandler,
}: TimerListItemCardProps): JSX.Element {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <ListItem>
        <ListItemIcon>
          <Typography>{`${timer.order}.`}</Typography>
        </ListItemIcon>
        <ListItemText
          primary={`${timer.seconds} seconds`}
          secondary={timer.stepperTitle}
        />
        <ListItemSecondaryAction>
          <IconButton onClick={() => deleteHandler(timer)}>
            <CloseIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Card>
  );
}

interface TimerListItemCardProps {
  timer: NewWorkoutTimer;
  deleteHandler: (timer: NewWorkoutTimer) => void;
}
