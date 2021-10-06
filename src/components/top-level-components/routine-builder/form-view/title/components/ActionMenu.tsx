import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import BaseActionMenu from '../../base-components/BaseActionMenu';
import { addPhaseToRoutine } from '../../../../../../creators/routine-builder/builder';

const ActionMenu = ({
  editHandler,
  addPhaseHandler,
}: ActionMenuProps & PassedInProps): JSX.Element => {
  return (
    <BaseActionMenu
      id={'routine-title'}
      menuItems={[
        {
          title: 'Edit',
          clickHandler: () => {
            editHandler(true);
          },
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
  editHandler: (isEditing: boolean) => void;
}

interface ActionMenuProps {
  addPhaseHandler: () => void;
}

const mapStateToProps = (): ActionMenuProps => {
  return {} as unknown as ActionMenuProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ActionMenuProps =>
  ({
    addPhaseHandler: () => {
      dispatch(addPhaseToRoutine());
    },
  } as unknown as ActionMenuProps);

export default connect(mapStateToProps, mapDispatchToProps)(ActionMenu);
