import { Grid } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import TimeField from './text-fields/TimeField';
import { CircuitExerciseSet } from '../../../../WorkoutScreen';

export default function TimedSet(props: TimedSetProps): JSX.Element {
  return (
    <Grid item xs={6}>
      <TimeField set={props.set} changeHandler={props.timeChangeHandler} />
    </Grid>
  );
}

interface TimedSetProps {
  set: CircuitExerciseSet;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  timeChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}
