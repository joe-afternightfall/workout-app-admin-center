import React from 'react';
import { connect } from 'react-redux';
import { State } from '../../configs/redux/store';
import icon from '../../configs/icons/rainbow-shades.svg';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { AppBar, Grid, IconButton, Toolbar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { NightfallTooltip } from 'workout-app-common-core';
import { MIN_DRAWER_WIDTH } from '../../configs/constants/app';

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
  const width = `calc(100% - ${MIN_DRAWER_WIDTH})`;
  const classes = useStyles({
    size: width,
  });

  return props.displayAppBar ? (
    <HideOnScroll {...props}>
      <AppBar position={'fixed'} className={classes.appBar}>
        <Toolbar>
          <Grid container alignItems={'center'} justify={'flex-end'}>
            <Grid item>
              <NightfallTooltip
                component={
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
                title={props.isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
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
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  ) : (
    <React.Fragment />
  );
};

interface AppBarProps {
  displayAppBar: boolean;
  openSideDrawerHandler: () => void;
}

interface PassedInAppBarProps {
  isFullScreen: boolean;
  fullScreenClickHandler: (open: boolean) => void;
}

const mapStateToProps = (state: State): AppBarProps => {
  return {
    displayAppBar: state.applicationState.displayAppBar,
  } as unknown as AppBarProps;
};

const mapDispatchToProps = (): AppBarProps => ({} as unknown as AppBarProps);

export default connect(mapStateToProps, mapDispatchToProps)(TopAppBar);
