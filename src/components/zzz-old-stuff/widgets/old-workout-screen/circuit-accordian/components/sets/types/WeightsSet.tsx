import { Grid } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import RepsField from './text-fields/RepsField';
import WeightsField from './text-fields/WeightsField';
import { CircuitExerciseSet } from '../../../../WorkoutScreen';

export function WeightsSet(props: WeightsSetProps): JSX.Element {
  return (
    <>
      <Grid item xs={3}>
        <WeightsField set={props.set} changeHandler={props.changeHandler} />
      </Grid>

      <Grid item xs={3}>
        <RepsField set={props.set} changeHandler={props.changeHandler} />
      </Grid>
    </>
  );
}

interface WeightsSetProps {
  set: CircuitExerciseSet;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}
