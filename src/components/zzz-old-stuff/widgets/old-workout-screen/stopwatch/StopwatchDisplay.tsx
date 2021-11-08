import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Variant as ThemeVariant } from '@material-ui/core/styles/createTypography';

export default function StopwatchDisplay(
  props: StopwatchDisplayProps
): JSX.Element {
  const { minutes, seconds } = props;

  const formatTime = (val: number, option?: string): string => {
    let value = val.toString();
    if (value.length < 2) {
      value = '0' + value;
    }
    if (option === 'ms' && value.length < 3) {
      value = '0' + value;
    }
    return value;
  };

  return props.displayText ? (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant={props.variant}>
          {`Time: ${formatTime(minutes)} minutes`}
        </Typography>
      </Grid>
    </Grid>
  ) : (
    <Typography variant={props.variant}>
      {`${formatTime(minutes)}:${formatTime(seconds)}`}
    </Typography>
  );
}

interface StopwatchDisplayProps {
  minutes: number;
  seconds: number;
  variant: ThemeVariant;
  displayText: boolean;
}
