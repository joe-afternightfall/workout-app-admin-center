import clsx from 'clsx';
import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import TimerDialog from '../../timer-dialog/TimerDialog';
import { NightfallBlinker } from 'workout-app-common-core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    listItem: {
      background: 'darkgrey',
      opacity: 0.7,
    },
  })
);

export default function BaseListItem({
  title,
  isDuration,
  itemType,
  clickHandler,
  shouldBlink = false,
  workoutExerciseId,
}: BaseListItemProps): JSX.Element {
  const classes = useStyles();

  switch (itemType) {
    case 'blinker':
      return (
        <NightfallBlinker
          shouldBlink={shouldBlink}
          component={
            <ListItem
              className={clsx({
                [classes.listItem]: shouldBlink,
              })}
            >
              <ListItemText primary={title} />
            </ListItem>
          }
        />
      );
    case 'button':
      return (
        <ListItem button onClick={clickHandler}>
          <ListItemText primary={title} />
        </ListItem>
      );
    case 'standard':
      return (
        <ListItem>
          <ListItemText primary={title} />
          {isDuration && workoutExerciseId && (
            <ListItemSecondaryAction>
              <TimerDialog workoutExerciseId={workoutExerciseId} />
            </ListItemSecondaryAction>
          )}
        </ListItem>
      );
  }
}

interface BaseListItemProps {
  title: string;
  shouldBlink?: boolean;
  clickHandler?: () => void;
  isDuration?: boolean;
  workoutExerciseId?: string;
  itemType: 'button' | 'blinker' | 'standard';
}
