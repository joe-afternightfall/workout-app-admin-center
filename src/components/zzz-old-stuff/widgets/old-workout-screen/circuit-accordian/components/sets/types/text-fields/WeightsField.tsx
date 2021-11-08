import React, { ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';
import { CircuitExerciseSet } from '../../../../../WorkoutScreen';

export default function WeightsField(props: WeightsFieldProps): JSX.Element {
  return (
    <TextField
      fullWidth
      name={'weight'}
      variant={'outlined'}
      value={props.set.weight}
      onChange={props.changeHandler}
    />
  );
}

interface WeightsFieldProps {
  set: CircuitExerciseSet;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}
