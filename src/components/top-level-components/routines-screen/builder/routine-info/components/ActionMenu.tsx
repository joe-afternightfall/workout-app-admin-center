import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { addPhaseToRoutine } from '../../../../../../creators/routine-builder/builder';
import BaseActionMenu from '../../../../routine-builder/form-view/base-components/BaseActionMenu';

const ActionMenu = ({ addPhaseHandler }: ActionMenuProps): JSX.Element => {
  return (
    <BaseActionMenu
      id={'routine-title'}
      menuItems={[
        {
          title: 'Edit',
          clickHandler: () => alert('edit clicked'),
        },
        {
          title: 'Add Phase',
          clickHandler: addPhaseHandler,
        },
      ]}
    />
  );
};

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
