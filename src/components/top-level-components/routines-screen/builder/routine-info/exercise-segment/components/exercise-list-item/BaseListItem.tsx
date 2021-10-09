import React from 'react';
import { Blinker } from 'workout-app-common-core';
import { ListItem, ListItemText } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      background: 'darkgrey',
      opacity: 0.7,
    },
  })
);

export default function BlinkingListItem({
  title,
  itemType,
  clickHandler,
  shouldBlink = false,
}: BlinkingListItemProps): JSX.Element {
  const classes = useStyles();
  let display = <div />;
  switch (itemType) {
    case 'blinker':
      display = (
        <Blinker
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
      break;
    case 'button':
      display = (
        <ListItem button onClick={clickHandler}>
          <ListItemText primary={title} />
        </ListItem>
      );
      break;
    case 'standard':
      display = (
        <ListItem>
          <ListItemText primary={title} />
        </ListItem>
      );
      break;
  }
  return display;
}

export interface BlinkingListItemProps {
  title: string;
  shouldBlink?: boolean;
  clickHandler?: () => void;
  itemType: 'button' | 'blinker' | 'standard';
}
