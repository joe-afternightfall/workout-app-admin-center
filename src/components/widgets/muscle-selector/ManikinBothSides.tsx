import React from 'react';
import FrontSide from './manikin/FrontSide';
import { Grid } from '@material-ui/core';
import BackSide from './manikin/BackSide';
import BothSidesControls from './controls/BothSidesControls';

export function ManikinBothSides(): JSX.Element {
  return (
    <Grid container>
      <Grid item xs={4}>
        <BothSidesControls />
      </Grid>
      <Grid item xs={8} container>
        <Grid item xs={6}>
          <FrontSide />
        </Grid>
        <Grid item xs={6}>
          <BackSide />
        </Grid>
      </Grid>
    </Grid>
  );
}
