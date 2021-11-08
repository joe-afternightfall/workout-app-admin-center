import React, { ChangeEvent } from 'react';
import TimeField from './text-fields/TimeField';
import { Grid } from '@material-ui/core';
import { CircuitExerciseSet } from '../../../../WorkoutScreen';
import DistanceField from './text-fields/DistanceField';

export default function TimeAndDistanceSet(
  props: TimeAndDistanceSetProps
): JSX.Element {
  return (
    <>
      <Grid item xs={3}>
        <TimeField set={props.set} changeHandler={props.timeChangeHandler} />
      </Grid>

      <Grid item xs={3}>
        <DistanceField
          set={props.set}
          changeHandler={props.distanceChangeHandler}
        />
      </Grid>
    </>
  );
}

interface TimeAndDistanceSetProps {
  set: CircuitExerciseSet;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  timeChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  distanceChangeHandler: (name: string, value: string) => void;
}
