import React from 'react';
import { Grid } from '@material-ui/core';
import AlternateRadioGroup from './info-components/AlternateRadioGroup';
import ParamTypeButtonGroup from './info-components/ParamTypeButtonGroup';
import MusclesWorked from './info-components/muscles-worked/MusclesWorked';
import ExerciseNameTextField from './info-components/ExerciseNameTextField';
import OptionalParams from './info-components/optional-params/OptionalParams';
import ExerciseIconIdTextField from './info-components/ExerciseIconIdTextField';
import ExerciseDescriptionTextField from './info-components/ExerciseDescriptionTextField';
import ExtraInfoContainer from './info-components/extra-info/ExtraInfoContainer';

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
        <Grid item xs={8}>
          <ExtraInfoContainer />
        </Grid>
        <Grid item xs={4}>
          <AlternateRadioGroup />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <ParamTypeButtonGroup />
      </Grid>

      <Grid item xs={12}>
        <MusclesWorked />
      </Grid>

      <Grid item xs={12} container style={{ marginTop: 24 }}>
        <Grid item xs={12}>
          <OptionalParams />
        </Grid>
      </Grid>
    </Grid>
  );
}
