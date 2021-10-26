import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import LineItemTitle from '../base-components/LineItemTitle';
import { Button, Grid, IconButton, Typography } from '@material-ui/core';

export default function CircuitIncrementer({
  done,
  doneHandler,
  incrementor,
  numberOfExercises,
}: CircuitIncrementerProps): JSX.Element {
  return (
    <Grid container justify={'center'} alignItems={'center'}>
      <Grid item xs={6}>
        <LineItemTitle title={'Number of exercises in Circuit'} />
      </Grid>
      {done ? (
        <Grid item xs={6} container justify={'center'}>
          <Typography variant={'h5'}>{numberOfExercises}</Typography>
        </Grid>
      ) : (
        <>
          <Grid item xs={6} container alignItems={'center'}>
            <Grid item xs={3} container justify={'center'}>
              <IconButton
                onClick={() => {
                  incrementor('subtract');
                }}
              >
                <RemoveIcon />
              </IconButton>
            </Grid>
            <Grid item xs={6} container justify={'center'}>
              <Typography variant={'h5'}>{numberOfExercises}</Typography>
            </Grid>
            <Grid item xs={3} container justify={'center'}>
              <IconButton
                onClick={() => {
                  incrementor('add');
                }}
              >
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={12} container justify={'flex-end'}>
            <Button onClick={doneHandler}>{'Done'}</Button>
          </Grid>
        </>
      )}
    </Grid>
  );
}

interface CircuitIncrementerProps {
  incrementor: (type: 'add' | 'subtract') => void;
  numberOfExercises: number;
  done: boolean;
  doneHandler: () => void;
}
