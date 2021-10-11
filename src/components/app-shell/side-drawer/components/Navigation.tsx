import React from 'react';
import firebase from 'firebase';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { NavListItem } from './NavListItem';
import { routerActions } from 'connected-react-router';
import { State } from '../../../../configs/redux/store';
import {
  appNavigationRoutes,
  PageProps,
  RouteProp,
} from '../../../../configs/constants/app-navigation-routes';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import {
  MIN_DRAWER_WIDTH,
  SIGN_IN_SCREEN_PATH,
} from '../../../../configs/constants/app';
import { closeSideDrawer, logoutUser } from '../../../../creators/side-drawer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      // maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

const Navigation = (
  props: NavigationProps & PassedInNavigationProps
): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);

  const routeAndClose = (route: string) => {
    props.routeClickHandler(route);
    close();
  };

  const close = () => {
    if (props.isTempSideDrawerOpen) {
      setTimeout(() => {
        props.closeSideDrawerHandler();
      }, 300);
    }
  };

  const shouldDisplayText =
    props.drawerSize !== MIN_DRAWER_WIDTH || props.tempDrawer;

  return (
    <List
      component={'nav'}
      className={classes.root}
      aria-labelledby={'nested-list-subheader'}
    >
      {Object.keys(appNavigationRoutes).map((value: string, index: number) => {
        if (appNavigationRoutes[value].nested) {
          return (
            <>
              <ListItem
                button
                onClick={() => {
                  open ? setOpen(false) : setOpen(true);
                }}
              >
                <ListItemIcon>
                  {React.createElement(appNavigationRoutes[value].mainIcon)}
                </ListItemIcon>
                <ListItemText primary={appNavigationRoutes[value].mainTitle} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout={'auto'} unmountOnExit>
                <List
                  component={'div'}
                  disablePadding
                  className={classes.nested}
                >
                  {appNavigationRoutes[value].pageProps.map(
                    (page: PageProps, secondIndex: number) => {
                      return (
                        <NavListItem
                          key={secondIndex}
                          displayText={shouldDisplayText}
                          currentLocation={props.currentLocation}
                          pageInfo={
                            appNavigationRoutes[value].pageProps[secondIndex]
                          }
                          clickHandler={() => {
                            routeAndClose(
                              appNavigationRoutes[value].pageProps[secondIndex]
                                .path
                            );
                          }}
                        />
                      );
                    }
                  )}
                </List>
              </Collapse>
            </>
          );
        } else {
          return (
            <NavListItem
              key={index}
              displayText={shouldDisplayText}
              currentLocation={props.currentLocation}
              pageInfo={appNavigationRoutes[value].pageProps[0]}
              clickHandler={() => {
                routeAndClose(appNavigationRoutes[value].pageProps[0].path);
              }}
            />
          );
        }
      })}

      <ListItem
        button
        onClick={() => {
          props.signOutClickHandler();
          close();
        }}
        data-testid={'list-item-log-out-button'}
      >
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        {shouldDisplayText ? (
          <ListItemText data-testid={`list-item-log-out`} primary={'Log Out'} />
        ) : undefined}
      </ListItem>
    </List>
  );
};

export interface NavigationProps {
  activePage: RouteProp;
  currentLocation: string;
  isTempSideDrawerOpen: boolean;
  routeClickHandler: (path: string) => void;
  signOutClickHandler: () => void;
  closeSideDrawerHandler: () => void;
  drawerSize: string;
}

export interface PassedInNavigationProps {
  tempDrawer: boolean;
}

const mapStateToProps = (state: State): NavigationProps => {
  return {
    activePage: state.applicationState.activePage,
    currentLocation: state.applicationState.currentLocation,
    isTempSideDrawerOpen: state.applicationState.isTempSideDrawerOpen,
    drawerSize: state.applicationState.drawerSize,
  } as unknown as NavigationProps;
};

const mapDispatchToProps = (dispatch: Dispatch): NavigationProps =>
  ({
    routeClickHandler: (path: string) => {
      dispatch(routerActions.push(path));
    },
    closeSideDrawerHandler: (): void => {
      dispatch(closeSideDrawer());
    },
    signOutClickHandler: () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          dispatch(routerActions.push(SIGN_IN_SCREEN_PATH));
          dispatch(logoutUser());
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(
            'CAUGHT_FIREBASE_ERROR: ' + errorCode + ' message: ' + errorMessage
          );
        });
    },
  } as unknown as NavigationProps);

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
