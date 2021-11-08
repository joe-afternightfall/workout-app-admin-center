import React, { ChangeEvent } from 'react';
import { Grid } from '@material-ui/core';
import TimeField from './text-fields/TimeField';
import RepsField from './text-fields/RepsField';
import { CircuitExerciseSet } from '../../../../WorkoutScreen';

export default function TimeAndRepsSet(
  props: TimeAndRepsSetProps
): JSX.Element {
  return (
    <>
      <Grid item xs={3}>
        <TimeField set={props.set} changeHandler={props.timeChangeHandler} />
      </Grid>

      <Grid item xs={3}>
        <RepsField set={props.set} changeHandler={props.changeHandler} />
      </Grid>
    </>
  );
}

interface TimeAndRepsSetProps {
  set: CircuitExerciseSet;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  timeChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}
