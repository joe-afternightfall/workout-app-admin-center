import React from 'react';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import { WorkoutTimer } from 'workout-app-common-core';
import CountdownTimer from './components/countdown-timer/CountdownTimer';
import CustomStepper from './components/stepper/CustomStepper';
import { AppTheme } from '../../configs/theme/light-theme';

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

export default function TimerDialog({
  timers,
  activeSet,
  markedDone,
}: TimerDialogProps): JSX.Element {
  const classes = useStyles();
  const theme = useTheme<AppTheme>();
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);

  let fontColor = '#686868';

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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

  if (activeSet) {
    fontColor = theme.palette.colors.active.highlight;
  } else if (markedDone) {
    fontColor = theme.palette.colors.active.highlight;
  }

  timers.sort((a, b) => a.order - b.order);

  return (
    <>
      <IconButton
        disabled={false}
        onClick={handleClickOpen}
        // style={{ color: fontColor }}
      >
        <TimerIcon />
      </IconButton>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'sm'}>
        <DialogTitle disableTypography className={classes.dialogTitle}>
          <CustomStepper activeStep={activeStep} timers={timers} />
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            alignItems={'center'}
            justify={'center'}
            className={classes.contentWrapper}
          >
            <CountdownTimer
              timers={timers}
              nextStepHandler={handleNextStep}
              closeHandler={handleClose}
              resetStepperHandler={handleResetStepper}
            />
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

export interface TimerDialogProps {
  timers: WorkoutTimer[];
  activeSet: boolean;
  markedDone: boolean;
}
