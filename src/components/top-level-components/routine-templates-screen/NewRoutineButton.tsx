import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { routerActions } from 'connected-react-router';
import { hideAppBar } from '../../../creators/application';
import { buildNewRoutine } from '../../../creators/routine-builder/builder';
import {
  MIN_DRAWER_WIDTH,
  ROUTINE_BUILDER_SCREEN_PATH,
} from '../../../configs/constants/app';
import {
  setDrawerSize,
  userClickedCloseDrawer,
  userClickedOpenDrawer,
} from '../../../creators/side-drawer';

const NewRoutineButton = (props: NewRoutineButtonProps): JSX.Element => {
  return (
    <Button variant={'contained'} onClick={props.newRoutineHandler}>
      {'New Routine'}
    </Button>
  );
};

export interface NewRoutineButtonProps {
  newRoutineHandler: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): NewRoutineButtonProps =>
  ({
    newRoutineHandler: () => {
      dispatch(buildNewRoutine());
      dispatch(hideAppBar());
      dispatch(userClickedCloseDrawer());
      // dispatch(setDrawerSize(MIN_DRAWER_WIDTH));
      // dispatch(userClickedCloseDrawer());
      dispatch(routerActions.push(ROUTINE_BUILDER_SCREEN_PATH));
    },
  } as unknown as NewRoutineButtonProps);

export default connect(null, mapDispatchToProps)(NewRoutineButton);
