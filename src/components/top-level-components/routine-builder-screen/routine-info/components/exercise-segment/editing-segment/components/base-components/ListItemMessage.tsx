import React from 'react';
import { Grid, ListItem, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginTop: 12,
    },
  })
);

export default function ListItemMessage({
  message,
}: ListItemMessageProps): JSX.Element {
  const classes = useStyles();

  return (
    <ListItem className={classes.root}>
      <Grid container justify={'center'}>
        <Typography variant={'body1'} color={'textSecondary'}>
          {message}
        </Typography>
      </Grid>
    </ListItem>
  );
}

interface ListItemMessageProps {
  message: string;
}
