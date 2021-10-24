import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Delete } from '@material-ui/icons';
import { Dialog, IconButton } from '@material-ui/core';
import { NightfallTooltip } from 'workout-app-common-core';
import { deletePhaseFromRoutine } from '../../../../../../../creators/routine-builder/builder';
import BaseDeleteDialogContent from '../../../../../../shared/BaseDeleteDialogContent';

const DeletePhaseDialog = (props: DeletePhaseDialogProps & PassedInProps) => {
  const { phaseName } = props;
  const [open, setOpen] = React.useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <div>
      <NightfallTooltip
        title={'Delete Phase'}
        placement={'top'}
        component={
          <IconButton onClick={openDialog}>
            <Delete />
          </IconButton>
        }
      />
      <Dialog open={open} onClose={closeDialog}>
        <BaseDeleteDialogContent
          highlight={phaseName}
          closeHandler={closeDialog}
          deleteHandler={() => {
            props.deletePhaseHandler();
            closeDialog();
          }}
        />
      </Dialog>
    </div>
  );
};

interface PassedInProps {
  phaseId: string;
  phaseName: string;
}

interface DeletePhaseDialogProps {
  deletePhaseHandler: () => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): DeletePhaseDialogProps =>
  ({
    deletePhaseHandler: () => {
      dispatch(deletePhaseFromRoutine(ownProps.phaseId));
    },
  } as unknown as DeletePhaseDialogProps);

export default connect(null, mapDispatchToProps)(DeletePhaseDialog);
