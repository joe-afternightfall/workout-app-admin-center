import React from 'react';
import { Grid } from '@material-ui/core';
import OptionalParams from './info-components/OptionalParams';
import MuscleSelector from './info-components/MuscleSelector';
import AlternateRadioGroup from './info-components/AlternateRadioGroup';
import ParamTypeButtonGroup from './info-components/ParamTypeButtonGroup';
import ExerciseNameTextField from './info-components/ExerciseNameTextField';

export default function ExerciseInfoContent(): JSX.Element {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={8}>
          <ExerciseNameTextField />
        </Grid>
        <Grid item xs={4}>
          <MuscleSelector />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <ParamTypeButtonGroup />
      </Grid>

      <Grid item xs={12} container style={{ marginTop: 24 }}>
        <Grid item xs={6}>
          <AlternateRadioGroup />
        </Grid>
        <Grid item xs={6}>
          <OptionalParams />
        </Grid>
      </Grid>
    </Grid>
  );
}
