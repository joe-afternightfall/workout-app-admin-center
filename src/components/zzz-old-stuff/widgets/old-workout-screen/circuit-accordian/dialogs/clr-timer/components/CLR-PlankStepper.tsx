import React from 'react';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import CustomStepIcon from './stepper/CustomStepIcon';
import CustomStepConnector from './stepper/CustomStepConnector';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

function getSteps() {
  return ['Left Side', 'Rest', 'Center', 'Rest', 'Right Side'];
}

export default function PlankStepper(props: PlankStepperProps): JSX.Element {
  const classes = useStyles();
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={props.activeStep}
        connector={<CustomStepConnector />}
      >
        {steps.map((label: string, index: number) => (
          <Step key={index}>
            <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

interface PlankStepperProps {
  activeStep: number;
}
