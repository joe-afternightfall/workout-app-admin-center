import {
  Grid,
  Button,
  TextField,
  CardContent,
  CardActions,
} from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import { NewWorkoutTimer } from '../InputSettings';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cancelButton: {
      color: theme.palette.grey[500],
    },
  })
);

export default function NewTimerListItem({
  timer,
  saveHandler,
  changeHandler,
  deleteHandler,
}: NewTimerListItemProps): JSX.Element {
  const classes = useStyles();

  const secondsFilledOut = timer.seconds !== 0;
  const timerMessageFilledOut = timer.timerMessage !== '';
  const stepperTitleFilledOut = timer.stepperTitle !== '';

  const saveDisabled = !(
    secondsFilledOut &&
    timerMessageFilledOut &&
    stepperTitleFilledOut
  );

  return (
    <>
      <CardContent>
        <Grid container>
          <Grid item xs={4} container alignItems={'center'}>
            <TextField
              autoFocus
              variant={'outlined'}
              label={'Seconds'}
              value={timer.seconds}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                changeHandler(timer.id, 'seconds', e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={2}>
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
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container justify={'flex-end'} alignItems={'center'} spacing={2}>
          <Grid item>
            <Button
              onClick={() => deleteHandler(timer)}
              className={classes.cancelButton}
            >
              {'Cancel'}
            </Button>
          </Grid>
          <Grid item>
            <Button
              color={'primary'}
              onClick={() => saveHandler(timer.id)}
              disabled={saveDisabled}
            >
              {'Save'}
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </>
  );
}

interface NewTimerListItemProps {
  timer: NewWorkoutTimer;
  changeHandler: (
    timerId: string,
    type: 'seconds' | 'stepper' | 'timer',
    value: string
  ) => void;
  saveHandler: (timerId: string) => void;
  deleteHandler: (timer: NewWorkoutTimer) => void;
}
