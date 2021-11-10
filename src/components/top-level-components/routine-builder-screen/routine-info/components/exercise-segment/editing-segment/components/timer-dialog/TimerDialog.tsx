import {
  Grid,
  Dialog,
  IconButton,
  Typography,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import * as ramda from 'ramda';
import {
  WorkoutTimer,
  NightfallStepper,
  WorkoutExercise,
  validateForOnlyNumbers,
  NightfallCountdownTimer,
} from 'workout-app-common-core';
import { Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import SaveButton from './SaveButton';
import { connect } from 'react-redux';
import TimerIcon from '@material-ui/icons/Timer';
import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { State } from '../../../../../../../../../configs/redux/store';
import InputSettings, { NewWorkoutTimer } from './input-settings/InputSettings';
import { updateExerciseTimers } from '../../../../../../../../../creators/routine-builder/builder';

const useStyles = makeStyles(() =>
  createStyles({
    contentWrapper: {
      minHeight: '30vh',
      height: '100%',
      textAlign: 'center',
      paddingBottom: 16,
    },
    dialogContent: {
      marginTop: 24,
      marginBottom: 24,
    },
  })
);

function mapPropsToLocalTimer(timers: WorkoutTimer[]): NewWorkoutTimer[] {
  return timers.map((timer) => {
    return {
      newTimer: false,
      ...timer,
    };
  });
}

const mapBackToWorkoutTimer = (timers: NewWorkoutTimer[]): WorkoutTimer[] => {
  return timers.map((timer) => {
    return {
      id: timer.id,
      order: timer.order,
      stepperTitle: timer.stepperTitle,
      timerMessage: timer.timerMessage,
      seconds: timer.seconds,
    };
  });
};

const TimerDialog = (props: TimerDialogProps & PassedInProps): JSX.Element => {
  const classes = useStyles();
  const { timers } = props;
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState<number | null>(null);
  const [localTimers, setLocalTimers] = useState<NewWorkoutTimer[]>([]);

  useEffect(() => {
    if (timers.length === 0) {
      setActiveStep(null);
    } else if (timers.length === 1) {
      setActiveStep(1);
    } else {
      setActiveStep(timers.length - 1);
    }
    setLocalTimers(mapPropsToLocalTimer(timers));
  }, []);

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
      localTimers.map((timer, index) => {
        timer.order = index + 1;
      });
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
        <DialogContent className={classes.dialogContent}>
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
                  <NightfallStepper
                    activeStep={activeStep}
                    timers={localTimers}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <NightfallCountdownTimer
                  timers={localTimers}
                  nextStepHandler={handleNextStep}
                  closeHandler={handleClose}
                  resetStepperHandler={handleResetStepper}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <SaveButton
            closeHandler={() => {
              handleClose();
              props.doneHandler(mapBackToWorkoutTimer(localTimers));
            }}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

interface TimerDialogProps {
  timers: WorkoutTimer[];
  doneHandler: (timers: WorkoutTimer[]) => void;
}

interface PassedInProps {
  workoutExerciseId: string;
}

const mapStateToProps = (
  state: State,
  ownProps: PassedInProps
): TimerDialogProps => {
  let foundExercise: WorkoutExercise | undefined;
  state.routineBuilderState.selectedRoutine.phases.map((phase) => {
    phase.segments.map((segment) => {
      segment.exercises.find((exercise) => {
        if (exercise.id === ownProps.workoutExerciseId) {
          foundExercise = exercise;
        }
      });
    });
  });

  return {
    timers: foundExercise?.timers ? foundExercise.timers : [],
  } as unknown as TimerDialogProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): TimerDialogProps =>
  ({
    doneHandler: (timers: WorkoutTimer[]) => {
      dispatch(updateExerciseTimers(ownProps.workoutExerciseId, timers));
    },
  } as unknown as TimerDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(TimerDialog);
