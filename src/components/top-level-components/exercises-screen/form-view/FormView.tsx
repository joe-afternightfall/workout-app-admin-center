import React from 'react';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ExerciseInfo from './exercise-info/ExerciseInfoCard';
import { ExerciseVO } from 'workout-app-common-core';
import TitleCard from './title/TitleCard';

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

export default function FormView(props: FormViewProps): JSX.Element {
  const classes = useStyles();
  const [exercise, setExercise] = React.useState<ExerciseVO | null>(null);

  return (
    <Grid container>
      <Grid item xs={12} style={{ marginBottom: 16 }}>
        <TitleCard />
      </Grid>
      <Grid item xs={12}>
        <ExerciseInfo />
      </Grid>
    </Grid>
  );
}

export interface FormViewProps {
  DELETE_ME?: undefined;
}
