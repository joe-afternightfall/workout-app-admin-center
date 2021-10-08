import React from 'react';
import ActionMenuDialog from './ActionMenuDialog';
import BaseMoreVertMenu from '../../../../../../../shared/BaseMoreVertMenu';

export default function ExerciseActionMenu({
  segmentId,
}: ExerciseActionMenuProps): JSX.Element {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [dialogType, setDialogType] = React.useState<string>('');

  const handleOpen = (type: 'reset' | 'delete') => {
    setOpenDialog(true);
    setDialogType(type);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <ActionMenuDialog
        open={openDialog}
        dialogType={dialogType}
        segmentId={segmentId}
        closeHandler={handleClose}
      />
      <BaseMoreVertMenu
        id={segmentId}
        menuItems={[
          {
            title: 'Reset',
            clickHandler: () => {
              handleOpen('reset');
            },
          },
          {
            title: 'Delete',
            clickHandler: () => {
              handleOpen('delete');
            },
          },
        ]}
      />
    </>
  );
}

export interface ExerciseActionMenuProps {
  segmentId: string;
}
