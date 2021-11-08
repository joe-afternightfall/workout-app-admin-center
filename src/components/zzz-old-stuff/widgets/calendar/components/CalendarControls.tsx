import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      color: '#FFF',
      background: '#26b976',
    },
  })
);

export default function CalendarControls(
  props: CalendarControlsProps
): JSX.Element {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container alignItems={'center'}>
      <Grid item xs={2} container justify={'center'}>
        <IconButton
          style={{ color: '#FFF' }}
          onClick={() => {
            props.prevMonthClickHandler();
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </Grid>

      <Grid item xs={8} container justify={'center'}>
        <Typography>{props.currentMonth}</Typography>
      </Grid>

      <Grid item xs={2} container justify={'center'}>
        <IconButton
          style={{ color: '#FFF' }}
          onClick={() => {
            props.nextMonthClickHandler();
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

interface CalendarControlsProps {
  currentMonth: string;
  prevMonthClickHandler: () => void;
  nextMonthClickHandler: () => void;
}
