import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })
);

export default function BaseDialogContent(
  props: BaseDialogContentProps
): JSX.Element {
  const classes = useStyles();
  const { dialogContent, title, closeClickHandler, dialogActions } = props;

  return (
    <>
      <DialogTitle disableTypography className={classes.root}>
        <Typography variant={'h6'}>{title}</Typography>

        <IconButton
          aria-label={'close'}
          onClick={closeClickHandler}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>{dialogContent}</DialogContent>

      <DialogActions>{dialogActions}</DialogActions>
    </>
  );
}

export interface BaseDialogContentProps {
  title: string;
  dialogContent: JSX.Element;
  dialogActions: JSX.Element;
  closeClickHandler: () => void;
}
