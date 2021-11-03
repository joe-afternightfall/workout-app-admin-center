import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import PrimaryTargetMuscleSelector from './components/PrimaryTargetMuscleSelector';
import ManikinMuscleGroupSelectMenu from './components/ManikinMuscleGroupSelectMenu';

export default function MusclesWorked(): JSX.Element {
  return (
    <Grid container alignItems={'center'} spacing={2}>
      <Grid item xs={12}>
        <Typography color={'textPrimary'} variant={'h6'}>
          {'Muscles Worked'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ManikinMuscleGroupSelectMenu />
      </Grid>
      <Grid item xs={6} container>
        <Grid item xs={12}>
          <Typography color={'textSecondary'} variant={'body1'}>
            {'Primary Muscles'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <PrimaryTargetMuscleSelector />
        </Grid>
      </Grid>
      <Grid item xs={6} container>
        <Grid item xs={12}>
          <Typography color={'textSecondary'} variant={'body1'}>
            {'Secondary Muscles'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <PrimaryTargetMuscleSelector />
        </Grid>
      </Grid>
    </Grid>
  );
}
