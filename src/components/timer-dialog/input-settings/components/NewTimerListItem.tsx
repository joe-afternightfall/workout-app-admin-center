import React, { ChangeEvent } from 'react';
import { NewWorkoutTimer } from '../InputSettings';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Card, Grid, TextField, CardContent } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      paddingTop: 4,
    },
  })
);

export default function NewTimerListItem({
  timer,
  changeHandler,
}: NewTimerListItemProps): JSX.Element {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container>
          <Grid item xs={4}>
            <TextField
              variant={'outlined'}
              label={'Seconds'}
              value={timer.seconds}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                changeHandler(timer.id, 'seconds', e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={8} container>
            <Grid item xs={12}>
              <TextField
                label={'Stepper Title'}
                value={timer.stepperTitle}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  changeHandler(timer.id, 'stepper', e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={'Timer Message'}
                value={timer.timerMessage}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  changeHandler(timer.id, 'timer', e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

interface NewTimerListItemProps {
  timer: NewWorkoutTimer;
  changeHandler: (
    timerId: string,
    type: 'seconds' | 'stepper' | 'timer',
    value: string
  ) => void;
}
