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

export default function FormView(props: FormViewProps): JSX.Element {
  const classes = useStyles();
  const [exercise, setExercise] = React.useState<ExerciseVO | null>(null);

  return (
    <Grid container>
      <Grid item xs={7} container>
        <Grid item xs={12} style={{ marginBottom: 16 }}>
          <TitleCard />
        </Grid>
        <Grid item xs={12} sm={12}>
          <ExerciseInfo />
        </Grid>
        {/*<Grid item xs={2} sm={1}>*/}
        {/*  <VerticalMenu />*/}
        {/*</Grid>*/}
      </Grid>
    </Grid>
  );
}

export interface FormViewProps {
  DELETE_ME?: undefined;
}
