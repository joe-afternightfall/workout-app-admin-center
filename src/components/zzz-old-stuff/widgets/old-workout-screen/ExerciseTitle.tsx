import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
  })
);

export default function ExerciseTitle(props: ExerciseTitleProps): JSX.Element {
  const classes = useStyles();

  return (
    <Typography className={classes.title} variant={'h6'}>
      {props.title}
    </Typography>
  );
}

interface ExerciseTitleProps {
  title: string;
}
