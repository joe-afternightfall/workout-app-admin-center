import React from 'react';
import { Grid } from '@material-ui/core';
import BackSide from './manikin/BackSide';
import BackSideControls from './controls/BackSideControls';

export default function ManikinBack(): JSX.Element {
  return (
    <Grid container>
      <Grid item xs={4}>
        <BackSideControls />
      </Grid>
      <Grid item xs={8}>
        <BackSide />
      </Grid>
    </Grid>
  );
}
