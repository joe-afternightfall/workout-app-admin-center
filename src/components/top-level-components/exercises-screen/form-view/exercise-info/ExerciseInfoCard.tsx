import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ParamTypeButtonGroup from './components/ParamTypeButtonGroup';
import { ParameterType } from 'workout-app-common-core';
import MuscleSelector from './components/MuscleSelector';
import AlternateCheckboxes from './components/AlternateCheckboxes';
import AlternateRadioGroup from './components/AlternateRadioGroup';
import OptionalParams from './components/OptionalParams';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

export default function ExerciseInfoCard(
  props: ExerciseInfoCardProps
): JSX.Element {
  const classes = useStyles();

  const [paramType, setParamType] = React.useState<ParameterType | null>(null);

  const selectParamType = (
    event: React.MouseEvent<HTMLElement>,
    paramType: ParameterType | null
  ) => {
    setParamType(paramType);
  };

  return (
    <Card style={{ width: '100%' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                id="exercise-name"
                variant={'outlined'}
                label={'Exercise Name'}
              />
            </Grid>
            <Grid item xs={4}>
              <MuscleSelector />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <ParamTypeButtonGroup
              changeHandler={selectParamType}
              selectedParamType={paramType}
            />
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
      </CardContent>
      <CardActions>
        <Grid container justify={'flex-end'}>
          <Button
            // variant="contained"
            color={'primary'}
            // size="large"
            // className={classes.button}
            startIcon={<SaveIcon />}
          >
            {'Save'}
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}

export interface ExerciseInfoCardProps {
  DELETE_ME?: undefined;
}
