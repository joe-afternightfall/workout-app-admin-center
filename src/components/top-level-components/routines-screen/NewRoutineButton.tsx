import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { hideAppBar } from '../../../creators/application';
import { userClickedCloseDrawer } from '../../../creators/side-drawer';
import { buildNewRoutine } from '../../../creators/routine-builder/builder';

const NewRoutineButton = (
  props: NewRoutineButtonProps & PassedInProps
): JSX.Element => {
  return (
    <Button variant={'contained'} onClick={props.newRoutineHandler}>
      {'New Routine'}
    </Button>
  );
};

interface PassedInProps {
  callback: () => void;
}

export interface NewRoutineButtonProps {
  newRoutineHandler: () => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): NewRoutineButtonProps =>
  ({
    newRoutineHandler: () => {
      dispatch(buildNewRoutine());
      ownProps.callback();
      dispatch(hideAppBar());
      dispatch(userClickedCloseDrawer());
    },
  } as unknown as NewRoutineButtonProps);

export default connect(null, mapDispatchToProps)(NewRoutineButton);
