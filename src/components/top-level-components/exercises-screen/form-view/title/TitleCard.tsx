import React from 'react';
import ActionMenu from './ActionMenu';
import { Card, CardHeader } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
  })
);

export default function TitleCard({
  newExercise,
}: TitleCardProps): JSX.Element {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title={newExercise ? 'New Exercise' : 'Edit Exercise'}
        action={<ActionMenu />}
      />
    </Card>
  );
}

export interface TitleCardProps {
  newExercise: boolean;
}
