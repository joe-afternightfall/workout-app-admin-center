import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { addPhaseToRoutine } from '../../../../../../creators/routine-builder/builder';
import BaseActionMenu from '../../../../routine-builder/form-view/base-components/BaseActionMenu';

const ActionMenu = ({
  addPhaseHandler,
  editClickHandler,
}: ActionMenuProps & PassedInProps): JSX.Element => {
  return (
    <BaseActionMenu
      id={'routine-title'}
      menuItems={[
        {
          title: 'Edit',
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

interface ActionMenuProps {
  addPhaseHandler: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): ActionMenuProps =>
  ({
    addPhaseHandler: () => {
      dispatch(addPhaseToRoutine());
    },
  } as unknown as ActionMenuProps);

export default connect(null, mapDispatchToProps)(ActionMenu);
