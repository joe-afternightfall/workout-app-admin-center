import React from 'react';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Connector from './Connector';
import Icon from './Icon';
import { WorkoutTimer } from 'workout-app-common-core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
  })
);

export default function CustomStepper({
  activeStep,
  timers,
}: CustomStepperProps): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<Connector />}
      >
        {timers.map((timer: WorkoutTimer, index: number) => (
          <Step key={index}>
            <StepLabel StepIconComponent={Icon}>{timer.stepperTitle}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export interface CustomStepperProps {
  timers: WorkoutTimer[];
  activeStep: number;
}
