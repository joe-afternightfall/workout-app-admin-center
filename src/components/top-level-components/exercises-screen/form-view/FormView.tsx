import React from 'react';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ExerciseInfo from './exercise-info/ExerciseInfoCard';
import { ExerciseVO } from 'workout-app-common-core';
import TitleCard from './title/TitleCard';
import VerticalMenu from './vertical-menu/VerticalMenu';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

interface EditExerciseProps {
  id: string;
  name: string;
  description: string;
  equipmentId: string;
  muscleGroupIds: string[];
  iconId: string;
  gripTypeId: string;
  gripWidthId: string;
  parameterTypeId: string;
  alternateSides: boolean;
}

export default function FormView({
  exercise,
  newExercise,
  successCallback,
}: FormViewProps): JSX.Element {
  const classes = useStyles();

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
        {/*<Grid item xs={2} sm={1}>*/}
        {/*  <VerticalMenu />*/}
        {/*</Grid>*/}
      </Grid>
    </Grid>
  );
}

export interface FormViewProps {
  newExercise: boolean;
  successCallback: () => void;
  exercise: ExerciseVO | undefined;
}
