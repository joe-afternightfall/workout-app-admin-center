import React, { useState } from 'react';
import {
  Grid,
  Dialog,
  Divider,
  IconButton,
  Typography,
  DialogContent,
} from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import { validateForOnlyNumbers, WorkoutTimer } from 'workout-app-common-core';
import InputSettings, { NewWorkoutTimer } from './input-settings/InputSettings';
import CustomStepper from './components/stepper/CustomStepper';
import CountdownTimer from './components/countdown-timer/CountdownTimer';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import * as ramda from 'ramda';

const useStyles = makeStyles(() =>
  createStyles({
    contentWrapper: {
      minHeight: '30vh',
      height: '100%',
      textAlign: 'center',
      paddingBottom: 16,
    },
    dialogTitle: {
      padding: '16px 0',
    },
  })
);

export default function TimerDialog(props: TimerDialogProps): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState<number | null>(null);

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep && prevActiveStep + 1);
  };

  const handleResetStepper = () => {
    setActiveStep(0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [localTimers, setLocalTimers] = useState<NewWorkoutTimer[]>([]);

  const addTimer = () => {
    const newTimers = [
      ...localTimers,
      {
        newTimer: true,
        id: uuidv4(),
        order: localTimers.length + 1,
        stepperTitle: '',
        timerMessage: '',
        seconds: 0,
      },
    ];
    setLocalTimers(newTimers);
  };

  const changeHandler = (
    timerId: string,
    type: 'seconds' | 'stepper' | 'timer',
    value: string
  ) => {
    const clonedTimers = ramda.clone(localTimers);
    const foundTimer = clonedTimers.find((timer) => timer.id === timerId);

    if (foundTimer) {
      switch (type) {
        case 'seconds':
          if (validateForOnlyNumbers(value)) {
            foundTimer.seconds = Number(value);
          }
          break;
        case 'stepper':
          foundTimer.stepperTitle = value;
          break;
        case 'timer':
          foundTimer.timerMessage = value;
          break;
      }
      setLocalTimers(clonedTimers);
    }
  };

  const handleSave = (timerId: string) => {
    const clonedTimers = ramda.clone(localTimers);
    const foundTimer = clonedTimers.find((timer) => timer.id === timerId);
    if (foundTimer) {
      foundTimer.newTimer = false;
      setLocalTimers(clonedTimers);
      foundTimer.order === 1
        ? setActiveStep(1)
        : setActiveStep(foundTimer.order - 1);
    }
  };

  const handleDelete = (timer: NewWorkoutTimer) => {
    const foundIndex = localTimers.indexOf(timer);
    if (foundIndex !== -1) {
      localTimers.splice(foundIndex, 1);
      const clonedTimers = ramda.clone(localTimers);
      setLocalTimers(clonedTimers);
    }
  };

  localTimers.sort((a, b) => a.order - b.order);

  return (
    <>
      <IconButton disabled={false} onClick={handleClickOpen}>
        <TimerIcon />
      </IconButton>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'lg'}>
        <DialogContent style={{ marginTop: 24, marginBottom: 24 }}>
          <Grid
            container
            justify={'center'}
            alignItems={'center'}
            className={classes.contentWrapper}
            spacing={2}
          >
            <Grid item xs={5}>
              <InputSettings
                timers={localTimers}
                changeHandler={changeHandler}
                deleteHandler={handleDelete}
                addTimerHandler={addTimer}
                saveHandler={handleSave}
              />
            </Grid>
            <Grid item xs={7} container spacing={4}>
              <Grid item xs={12}>
                <Typography>{'Preview Input'}</Typography>
              </Grid>
              <Grid item xs={12}>
                {activeStep && (
                  <CustomStepper activeStep={activeStep} timers={localTimers} />
                )}
              </Grid>
              <Grid item xs={12}>
                <CountdownTimer
                  timers={localTimers}
                  nextStepHandler={handleNextStep}
                  closeHandler={handleClose}
                  resetStepperHandler={handleResetStepper}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

export interface TimerDialogProps {
  timers: WorkoutTimer[];
}
