import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import GripTypeSelectMenu from './components/GripTypeSelectMenu';
import GripWidthSelectMenu from './components/GripWidthSelectMenu';
import WorkoutEquipmentSelectMenu from './components/WorkoutEquipmentSelectMenu';

export default function OptionalParams(): JSX.Element {
  return (
    <Grid container alignItems={'center'}>
      <Grid item xs={12}>
        <Typography color={'textPrimary'}>{'Optional Parameters'}</Typography>
      </Grid>
      <Grid item xs={7} container>
        <Grid item xs={12}>
          <GripWidthSelectMenu />
        </Grid>
        <Grid item xs={12}>
          <GripTypeSelectMenu />
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <WorkoutEquipmentSelectMenu />
      </Grid>
    </Grid>
  );
}
