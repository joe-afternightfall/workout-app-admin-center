import React from 'react';
import { Grid, Typography } from '@material-ui/core';

export default function DistanceField(props: DistanceFieldProps): JSX.Element {
  const { distance } = props;

  return (
    <Grid container item xs={4}>
      <Grid item xs={12} container justify={'center'}>
        <Grid item>
          <Typography>{distance.value}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} container justify={'center'}>
        <Grid item>
          <Typography>{distance.unit}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

interface DistanceFieldProps {
  distance: {
    unit: string;
    value: string;
  };
}
