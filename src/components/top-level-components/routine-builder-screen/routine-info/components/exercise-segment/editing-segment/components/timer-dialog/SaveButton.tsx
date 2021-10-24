import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { addTimerToWorkoutExercise } from '../../../../../../../../../creators/routine-builder/builder';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginLeft: 'auto',
    },
  })
);

const SaveButton = (props: SaveButtonProps & PassedInProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Button className={classes.root} onClick={props.saveHandler}>
      {'Save'}
    </Button>
  );
};

interface SaveButtonProps {
  saveHandler: () => void;
}

interface PassedInProps {
  workoutExerciseId: string;
  closeHandler: () => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): SaveButtonProps =>
  ({
    saveHandler: () => {
      dispatch(addTimerToWorkoutExercise(ownProps.workoutExerciseId));
      ownProps.closeHandler();
    },
  } as unknown as SaveButtonProps);

export default connect(null, mapDispatchToProps)(SaveButton);
