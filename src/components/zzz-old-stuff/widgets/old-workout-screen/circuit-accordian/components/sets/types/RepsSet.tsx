import React, { ChangeEvent } from 'react';
import { Grid } from '@material-ui/core';
import { CircuitExerciseSet } from '../../../../WorkoutScreen';
import RepsField from './text-fields/RepsField';

export default function RepsSet(props: RepsSetProps): JSX.Element {
  return (
    <>
      <Grid item xs={3}>
        <RepsField set={props.set} changeHandler={props.changeHandler} />
      </Grid>

      <Grid item xs={3} />
    </>
  );
}

interface RepsSetProps {
  set: CircuitExerciseSet;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}
