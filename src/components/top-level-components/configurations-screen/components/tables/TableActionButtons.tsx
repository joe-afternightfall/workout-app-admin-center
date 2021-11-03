import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeActivateDialog from './DeActivateDialog';
import { Grid, IconButton } from '@material-ui/core';

export default function TableActionButtons({
  deActivateHighlight,
  editClickHandler,
  deActivateClickHandler,
}: TableActionButtonsProps): JSX.Element {
  return (
    <Grid container>
      <Grid item xs={6}>
        <IconButton onClick={editClickHandler}>
          <EditIcon />
        </IconButton>
      </Grid>
      <Grid item xs={6}>
        <DeActivateDialog
          highlight={deActivateHighlight}
          deActivateClickHandler={deActivateClickHandler}
        />
      </Grid>
    </Grid>
  );
}

interface TableActionButtonsProps {
  deActivateHighlight: string;
  editClickHandler: () => void;
  deActivateClickHandler: () => void;
}
