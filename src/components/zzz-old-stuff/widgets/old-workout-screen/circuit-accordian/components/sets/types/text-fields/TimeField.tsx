import React, { ChangeEvent } from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';
import { CircuitExerciseSet } from '../../../../../WorkoutScreen';

export default function TimeField(props: TimeFieldProps): JSX.Element {
  return (
    <Grid item xs={12} container alignItems={'center'}>
      <Grid item xs={12} container alignItems={'center'} spacing={2}>
        {/*<Grid item xs={4}>*/}
        {/*  <TextField*/}
        {/*    fullWidth*/}
        {/*    name={'hours'}*/}
        {/*    variant={'outlined'}*/}
        {/*    value={props.set.time.hours}*/}
        {/*    onChange={props.changeHandler}*/}
        {/*  />*/}
        {/*</Grid>*/}

        <Grid item xs={6} sm={3}>
          <TextField
            fullWidth
            name={'minutes'}
            variant={'outlined'}
            value={props.set.time.minutes}
            onChange={props.changeHandler}
          />
        </Grid>

        <Grid item xs={6} sm={3}>
          <TextField
            fullWidth
            name={'seconds'}
            variant={'outlined'}
            value={props.set.time.seconds}
            onChange={props.changeHandler}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container alignItems={'center'}>
        {/*<Grid item xs={4}>*/}
        {/*  <Typography variant={'caption'}>{'hours'}</Typography>*/}
        {/*</Grid>*/}

        <Grid item xs={6} sm={3}>
          <Typography variant={'caption'}>{'minutes'}</Typography>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Typography variant={'caption'}>{'seconds'}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

interface TimeFieldProps {
  set: CircuitExerciseSet;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}
