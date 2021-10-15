import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import { NightfallTooltip } from 'workout-app-common-core';
import { addPhaseToRoutine } from '../../../../../creators/routine-builder/builder';

const RoutineInfoActionMenu = (
  props: RoutineInfoActionMenuProps & PassedInProps
): JSX.Element => {
  return (
    <>
      <NightfallTooltip
        component={
          <IconButton color={'inherit'} onClick={props.editClickHandler}>
            <EditIcon />
          </IconButton>
        }
        title={'Edit Routine Title'}
        placement={'bottom'}
      />

      <NightfallTooltip
        component={
          <IconButton color={'inherit'} onClick={props.addPhaseHandler}>
            <AddIcon />
          </IconButton>
        }
        title={'Add New Phase'}
        placement={'bottom'}
      />
    </>
  );
};

interface PassedInProps {
  editClickHandler: () => void;
}

interface RoutineInfoActionMenuProps {
  addPhaseHandler: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): RoutineInfoActionMenuProps =>
  ({
    addPhaseHandler: () => {
      dispatch(addPhaseToRoutine());
    },
  } as unknown as RoutineInfoActionMenuProps);

export default connect(null, mapDispatchToProps)(RoutineInfoActionMenu);
