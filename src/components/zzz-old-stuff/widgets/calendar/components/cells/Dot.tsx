import React from 'react';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    dot: {
      height: 4,
      width: 4,
      margin: '0 2px',
      borderRadius: '50%',
      backgroundColor: '#FFF',
    },
  })
);

export default function Dot(): JSX.Element {
  const classes = useStyles();

  return <Grid item className={classes.dot} />;
}
