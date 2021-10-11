import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NightfallMoreVertMenu } from 'workout-app-common-core';
import { addPhaseToRoutine } from '../../../../../../creators/routine-builder/builder';

const RoutineInfoActionMenu = ({
  addPhaseHandler,
  editClickHandler,
}: RoutineInfoActionMenuProps & PassedInProps): JSX.Element => {
  return (
    <NightfallMoreVertMenu
      id={'routine-title'}
      menuItems={[
        {
          title: 'Edit Routine Title',
          clickHandler: editClickHandler,
        },
        {
          title: 'Add Phase',
          clickHandler: addPhaseHandler,
        },
      ]}
    />
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
