import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import AppTooltip from './AppTooltip';
import MenuIcon from '@material-ui/icons/Menu';
import { State } from '../../configs/redux/store';
import icon from '../../configs/icons/rainbow-shades.svg';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import { openSideDrawer } from '../../creators/side-drawer';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { AppBar, Grid, IconButton, Toolbar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const drawerSize = (props: { size: string }) => props.size;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      background: '#fff',
      [theme.breakpoints.up('sm')]: {
        width: drawerSize,
      },
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    menuButton: {
      color: theme.palette.text.primary,
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    icon: {
      height: '40px',
    },
  })
);

interface HideOnScrollProps {
  children: JSX.Element;
}

function HideOnScroll(props: HideOnScrollProps) {
  const { children } = props;

  return (
    <Slide appear={false} direction="down" in={!useScrollTrigger()}>
      {children}
    </Slide>
  );
}

const TopAppBar = (props: AppBarProps & PassedInAppBarProps): JSX.Element => {
  const width = `calc(100% - ${props.drawerSize})`;
  const classes = useStyles({
    size: width,
  });

  return (
    <HideOnScroll {...props}>
      <AppBar position={'fixed'} className={classes.appBar}>
        <Toolbar>
          <Grid container alignItems={'center'} justify={'space-between'}>
            <Grid item>
              <IconButton
                edge={'start'}
                color={'inherit'}
                className={classes.menuButton}
                data-testid={'toggle-app-drawer-button'}
                onClick={props.openSideDrawerHandler}
              >
                <MenuIcon />
              </IconButton>
            </Grid>

            <Grid item>
              <Grid container spacing={2} alignItems={'center'}>
                <Grid item>
                  <AppTooltip
                    element={
                      <IconButton
                        onClick={() => {
                          props.fullScreenClickHandler(!props.isFullScreen);
                        }}
                      >
                        {props.isFullScreen ? (
                          <FullscreenExitIcon />
                        ) : (
                          <FullscreenIcon />
                        )}
                      </IconButton>
                    }
                    title={
                      props.isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'
                    }
                    placement={'bottom'}
                  />
                </Grid>
                <Grid item>
                  <img
                    alt={'cool-shades-icon'}
                    className={classes.icon}
                    src={icon}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

interface AppBarProps {
  drawerSize: string;
  openSideDrawerHandler: () => void;
}

interface PassedInAppBarProps {
  isFullScreen: boolean;
  fullScreenClickHandler: (open: boolean) => void;
}

const mapStateToProps = (state: State): AppBarProps => {
  return {
    drawerSize: state.applicationState.drawerSize,
  } as unknown as AppBarProps;
};

const mapDispatchToProps = (dispatch: Dispatch): AppBarProps =>
  ({
    openSideDrawerHandler: (): void => {
      dispatch(openSideDrawer());
    },
  } as unknown as AppBarProps);

export default connect(mapStateToProps, mapDispatchToProps)(TopAppBar);
