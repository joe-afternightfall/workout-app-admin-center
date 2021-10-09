import React from 'react';
import { Grid } from '@material-ui/core';
import TitleCard from './title/TitleCard';
import { ExerciseVO } from 'workout-app-common-core';
import ExerciseInfo from './exercise-info/ExerciseInfoCard';

export default function FormView({
  exercise,
  newExercise,
  successCallback,
}: FormViewProps): JSX.Element {
  return (
    <Grid container>
      <Grid item xs={7} container>
        <Grid item xs={12} style={{ marginBottom: 16 }}>
          <TitleCard newExercise={newExercise} />
        </Grid>
        <Grid item xs={12} sm={12}>
          <ExerciseInfo
            selectedExercise={exercise}
            newExercise={newExercise}
            successCallback={successCallback}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export interface FormViewProps {
  newExercise: boolean;
  successCallback: () => void;
  exercise: ExerciseVO | undefined;
}
