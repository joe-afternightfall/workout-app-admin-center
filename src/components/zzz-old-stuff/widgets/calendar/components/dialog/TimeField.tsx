import React from 'react';
import { Grid, Typography } from '@material-ui/core';

function buildComp(title: string, value: string) {
  return <Typography>{value + ' ' + title}</Typography>;
}

export default function TimeField(props: TimeFieldProps): JSX.Element {
  return (
    <Grid container item xs={12}>
      {props.time.hours !== '' ? (
        buildComp('hours', props.time.hours)
      ) : (
        <React.Fragment />
      )}

      {props.time.minutes !== '' ? (
        buildComp('minutes', props.time.minutes)
      ) : (
        <React.Fragment />
      )}

      {props.time.seconds !== '' ? (
        buildComp('seconds', props.time.seconds)
      ) : (
        <React.Fragment />
      )}
    </Grid>
  );
}

interface TimeFieldProps {
  time: {
    hours: string;
    minutes: string;
    seconds: string;
  };
}
