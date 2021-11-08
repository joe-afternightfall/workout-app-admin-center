import React, { ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';
import { CircuitExerciseSet } from '../../../../../WorkoutScreen';

export default function RepsField(props: RepsFieldProps): JSX.Element {
  return (
    <TextField
      fullWidth
      name={'reps'}
      variant={'outlined'}
      value={props.set.reps}
      onChange={props.changeHandler}
    />
  );
}

interface RepsFieldProps {
  set: CircuitExerciseSet;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}
