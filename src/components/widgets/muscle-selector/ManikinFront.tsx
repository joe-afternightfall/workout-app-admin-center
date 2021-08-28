import React from 'react';
import FrontSide from './manikin/FrontSide';
import { Grid } from '@material-ui/core';
import FrontSideControls from './controls/FrontSideControls';

export default function ManikinFront(): JSX.Element {
  return (
    <Grid container>
      <Grid item xs={4}>
        <FrontSideControls />
      </Grid>
      <Grid item xs={8}>
        <FrontSide />
      </Grid>
    </Grid>
  );
}
