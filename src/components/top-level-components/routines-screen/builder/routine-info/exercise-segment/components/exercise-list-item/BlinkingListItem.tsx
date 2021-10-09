import React from 'react';
import { Blinker } from 'workout-app-common-core';
import { ListItem, ListItemText } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default function BlinkingListItem({
  title,
  shouldBlink,
}: BlinkingListItemProps): JSX.Element {
  const classes = useStyles();

  return (
    <Blinker
      shouldBlink={shouldBlink}
      component={
        <ListItem>
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
}

export interface BlinkingListItemProps {
  title: string;
  shouldBlink: boolean;
}
