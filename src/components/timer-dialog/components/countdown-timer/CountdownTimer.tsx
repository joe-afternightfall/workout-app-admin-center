import React, { useState } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import { WorkoutTimer } from 'workout-app-common-core';
import { Button, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      borderRadius: '50%',
      // background: theme.palette.primary.main,
      height: '85%',
      margin: 'auto',
      width: '100%',
    },
  })
);

export default function CountdownTimer({
  timers,
  nextStepHandler,
  closeHandler,
  resetStepperHandler,
}: CountdownTimerProps): JSX.Element {
  const classes = useStyles();
  const [counter, setCounter] = useState(0);
  const [circleTimerKey, setCircleTimerKey] = useState(0);
  const [timerDuration, setTimerDuration] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [message, setMessage] = useState('Get ready to start');

  const done = counter === timers.length + 1;

  const toggleTimer = (toggle: boolean) => {
    setStartTimer(toggle);
  };

  const handleComplete = (): [shouldRepeat: boolean, delay: number] => {
    setCounter(counter + 1);
    return checkForDone();
  };

  const checkForDone = (): [shouldRepeat: boolean, delay: number] => {
    if (timers[counter]) {
      setMessage(timers[counter].timerMessage);
      if (counter > 0) {
        nextStepHandler();
      }
      setTimerDuration(timers[counter].seconds);
      setCircleTimerKey(circleTimerKey + 1);
      return [true, 0];
    }
    return [false, 3000];
  };

  if (done) {
    setTimeout(() => {
      closeHandler();
      resetStepperHandler();
    }, 2000);
  }

  return done ? (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant={'h6'}>{'All Done, Nice Job!'}</Typography>
      </Grid>
      <Grid item xs={12}>
        <CheckIcon fontSize={'large'} />
      </Grid>
    </Grid>
  ) : (
    <Grid container justify={'center'} spacing={2}>
      <Grid item xs={12} container justify={'center'}>
        <Grid item>
          <Typography>{message}</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <CountdownCircleTimer
          key={circleTimerKey}
          isPlaying={startTimer}
          duration={timerDuration}
          colors={[
            ['#004777', 0.33],
            ['#F7B801', 0.33],
            ['#A30000', 0.33],
          ]}
          onComplete={handleComplete}
        >
          {}
          {({ remainingTime }) => {
            return (
              <Grid container style={{ height: '100%', textAlign: 'center' }}>
                <Button
                  className={classes.button}
                  onClick={() => toggleTimer(!startTimer)}
                >
                  {startTimer ? (
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography variant={'h6'}>{remainingTime}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant={'overline'}>{'pause'}</Typography>
                      </Grid>
                    </Grid>
                  ) : (
                    <>
                      <Grid item xs={12}>
                        <Typography>{'press to start'}</Typography>
                      </Grid>
                    </>
                  )}
                </Button>
              </Grid>
            );
          }}
        </CountdownCircleTimer>
      </Grid>
    </Grid>
  );
}

export interface CountdownTimerProps {
  timers: WorkoutTimer[];
  closeHandler: () => void;
  nextStepHandler: () => void;
  resetStepperHandler: () => void;
}
