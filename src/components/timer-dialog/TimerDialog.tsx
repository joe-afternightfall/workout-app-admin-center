import React from 'react';
import {
  Grid,
  Dialog,
  Divider,
  IconButton,
  Typography,
  DialogContent,
} from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import { WorkoutTimer } from 'workout-app-common-core';
import InputSettings from './input-settings/InputSettings';
import CustomStepper from './components/stepper/CustomStepper';
import CountdownTimer from './components/countdown-timer/CountdownTimer';
import { createStyles, makeStyles } from '@material-ui/core/styles';

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

export default function TimerDialog({ timers }: TimerDialogProps): JSX.Element {
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

  timers.sort((a, b) => a.order - b.order);

  return (
    <>
      <IconButton disabled={false} onClick={handleClickOpen}>
        <TimerIcon />
      </IconButton>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'lg'}>
        <DialogContent>
          <Grid
            container
            justify={'center'}
            alignItems={'center'}
            className={classes.contentWrapper}
          >
            <Grid item xs={4}>
              <InputSettings />
            </Grid>
            <Divider orientation={'vertical'} flexItem />
            <Grid item xs={8} container spacing={4}>
              <Grid item xs={12}>
                <Typography>{'Preview Input'}</Typography>
              </Grid>
              <Grid item xs={12}>
                {activeStep && (
                  <CustomStepper activeStep={activeStep} timers={timers} />
                )}
              </Grid>
              <Grid item xs={12}>
                <CountdownTimer
                  timers={timers}
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
