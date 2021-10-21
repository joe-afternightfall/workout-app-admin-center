import React from 'react';
import { DialogTitle } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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

export default function BaseDialogTitle(
  props: BaseDialogTitleProps
): JSX.Element {
  const classes = useStyles();
  const { title } = props;

  return (
    <DialogTitle disableTypography className={classes.root}>
      <Typography variant={'h6'}>{title}</Typography>

      <IconButton
        className={classes.closeButton}
        onClick={props.closeClickHandler}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
}

export interface BaseDialogTitleProps {
  title: string;
  closeClickHandler: () => void;
}
