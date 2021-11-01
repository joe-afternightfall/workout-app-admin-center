import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid, IconButton } from '@material-ui/core';

export default function TableActionButtons({
  editClickHandler,
  deleteClickHandler,
}: TableActionButtonsProps): JSX.Element {
  return (
    <Grid container>
      <Grid item xs={6}>
        <IconButton onClick={editClickHandler}>
          <EditIcon />
        </IconButton>
      </Grid>
      <Grid item xs={6}>
        <IconButton onClick={deleteClickHandler}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

interface TableActionButtonsProps {
  editClickHandler: () => void;
  deleteClickHandler: () => void;
}
