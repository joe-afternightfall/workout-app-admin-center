import React from 'react';
import {
  ListItem,
  Typography,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { NewWorkoutTimer } from '../InputSettings';

export default function TimerListItemCard({
  timer,
  deleteHandler,
}: TimerListItemCardProps): JSX.Element {
  return (
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
  );
}

interface TimerListItemCardProps {
  timer: NewWorkoutTimer;
  deleteHandler: (timer: NewWorkoutTimer) => void;
}
