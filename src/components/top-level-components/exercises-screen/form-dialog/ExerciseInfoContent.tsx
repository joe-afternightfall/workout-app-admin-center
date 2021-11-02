import React from 'react';
import { Grid } from '@material-ui/core';
import OptionalParams from './info-components/OptionalParams';
import MuscleSelector from './info-components/MuscleSelector';
import AlternateRadioGroup from './info-components/AlternateRadioGroup';
import ParamTypeButtonGroup from './info-components/ParamTypeButtonGroup';
import ExerciseNameTextField from './info-components/ExerciseNameTextField';
import ExerciseDescriptionTextField from './info-components/ExerciseDescriptionTextField';
import ExerciseIconIdTextField from './info-components/ExerciseIconIdTextField';

export default function ExerciseInfoContent(): JSX.Element {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={8}>
          <ExerciseNameTextField />
        </Grid>
        <Grid item xs={4}>
          <ExerciseIconIdTextField />
        </Grid>
        <Grid item xs={8}>
          <ExerciseDescriptionTextField />
        </Grid>
        <Grid item xs={4}>
          <AlternateRadioGroup />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <ParamTypeButtonGroup />
      </Grid>

      <Grid item xs={12} container style={{ marginTop: 24 }}>
        <Grid item xs={12}>
          <OptionalParams />
        </Grid>
        <Grid item xs={6}>
          <MuscleSelector />
        </Grid>
      </Grid>
    </Grid>
  );
}
