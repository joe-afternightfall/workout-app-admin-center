import React from 'react';
import icon from '../../../../configs/icons/kick-flip-stego.svg';
import { ChevronLeft as ChevronLeftIcon } from '@material-ui/icons';
import { MIN_DRAWER_WIDTH } from '../../../../configs/constants/app';
import { AppBar, Grid, IconButton, Toolbar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      paddingLeft: 10,
      background: theme.palette.primary.main,
    },
    iconButton: {
      color: theme.palette.primary.contrastText,
    },
    icon: {
      height: 32,
    },
  })
);

export default function SideDrawerAppBar(
  props: SideDrawerAppBarProps
): JSX.Element {
  const classes = useStyles();

  return (
    <AppBar position={'relative'}>
      {props.logoClickHandler ? (
        <Toolbar className={classes.toolbar}>
          {props.drawerSize && props.drawerSize !== MIN_DRAWER_WIDTH ? (
            <Grid container alignItems={'center'} justify={'space-between'}>
              <Grid item>
                <img src={icon} alt={'app-logo'} className={classes.icon} />
              </Grid>

              <Grid item>
                <IconButton
                  edge={'end'}
                  className={classes.iconButton}
                  onClick={props.closeHandler}
                  data-testid={'chevron-left-toggle-button'}
                >
                  <ChevronLeftIcon data-testid={'chevron-left'} />
                </IconButton>
              </Grid>
            </Grid>
          ) : (
            <Grid container alignItems={'center'} justify={'space-between'}>
              <Grid item>
                <IconButton
                  edge={'start'}
                  data-testid={'logo-button'}
                  onClick={() => {
                    if (props.logoClickHandler) {
                      props.logoClickHandler();
                    }
                  }}
                >
                  <img alt={'min-logo'} src={icon} className={classes.icon} />
                </IconButton>
              </Grid>
            </Grid>
          )}
        </Toolbar>
      ) : (
        <Toolbar className={classes.toolbar}>
          <img alt={'app-logo'} className={classes.icon} src={icon} />
        </Toolbar>
      )}
    </AppBar>
  );
}

export interface SideDrawerAppBarProps {
  // username: string;
  closeHandler?: () => void;
  logoClickHandler?: () => void;
  drawerSize?: string;
}
