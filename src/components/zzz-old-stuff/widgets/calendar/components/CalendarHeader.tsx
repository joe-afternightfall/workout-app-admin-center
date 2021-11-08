import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { addDays, format, startOfWeek } from 'date-fns';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      flexGrow: 1,
      flexBasis: 0,
      maxWidth: '100%',
      justifyContent: 'center',
      textAlign: 'center',
    },
    header: {
      textTransform: 'uppercase',
      fontWeight: 700,
      fontSize: '115%',
      padding: '4px 0',
      borderBottom: '1px solid #EEE',
      background: '#21a168',
      color: '#FFF',
    },
    icon: {
      cursor: 'pointer',
      transition: '0.15s ease-out',
      '&:hover': {
        transform: 'scale(1.75)',
        transition: '0.25s ease-out',
        color: '#1a8fff',
      },
    },
  })
);

export default function CalendarHeader(
  props: CalendarHeaderProps
): JSX.Element {
  const classes = useStyles();
  const dateFormat = 'EEE';
  const days = [];
  const startDate = startOfWeek(props.currentMonth);

  for (let i = 0; i < 7; i++) {
    days.push(
      <Grid className={classes.title} item key={i}>
        <Typography variant={'caption'}>
          {format(addDays(startDate, i), dateFormat)}
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid container className={classes.header}>
      {days}
    </Grid>
  );
}

interface CalendarHeaderProps {
  currentMonth: Date;
}
