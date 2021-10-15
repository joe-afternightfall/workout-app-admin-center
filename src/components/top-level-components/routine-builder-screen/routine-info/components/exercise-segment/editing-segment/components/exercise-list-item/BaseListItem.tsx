import clsx from 'clsx';
import React from 'react';
import { isDuration, NightfallBlinker } from 'workout-app-common-core';
import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TimerIcon from '@material-ui/icons/Timer';

const useStyles = makeStyles(() =>
  createStyles({
    listItem: {
      background: 'darkgrey',
      opacity: 0.7,
    },
    listItemContainer: {
      width: '100%',
    },
  })
);

export default function BlinkingListItem({
  title,
  itemType,
  isDuration,
  clickHandler,
  shouldBlink = false,
}: BlinkingListItemProps): JSX.Element {
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
        <ListItem
          classes={{
            container: classes.listItemContainer,
          }}
        >
          <ListItemText primary={title} />
          {isDuration && (
            <ListItemSecondaryAction>
              <IconButton edge={'end'}>
                <TimerIcon />
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItem>
      );
  }
}

export interface BlinkingListItemProps {
  title: string;
  shouldBlink?: boolean;
  clickHandler?: () => void;
  isDuration?: boolean;
  itemType: 'button' | 'blinker' | 'standard';
}
