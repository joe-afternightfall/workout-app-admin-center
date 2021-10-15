import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

export default function DialogAppBar({
  name,
  closeHandler,
}: DialogAppBarProps): JSX.Element {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography variant={'h6'} className={classes.title}>
          {`${name} Template`}
        </Typography>
        <IconButton edge={'start'} color={'inherit'} onClick={closeHandler}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

interface DialogAppBarProps {
  name: string;
  closeHandler: () => void;
}
