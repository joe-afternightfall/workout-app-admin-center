import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import icon from '../../../../configs/icons/kick-flip-stego.svg';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    toolbar: {
      paddingLeft: 10,
    },
    icon: {
      height: 32,
    },
  })
);

export default function SideDrawerAppBar(): JSX.Element {
  const classes = useStyles();

  return (
    <AppBar position={'relative'}>
      <Toolbar className={classes.toolbar}>
        <img alt={'app-logo'} className={classes.icon} src={icon} />
      </Toolbar>
    </AppBar>
  );
}
