import React from 'react';
import firebase from 'firebase';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NavListItem } from './NavListItem';
import { routerActions } from 'connected-react-router';
import { State } from '../../../../configs/redux/store';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {
  RouteProp,
  appNavigationRoutes,
} from '../../../../configs/constants/app-navigation-routes';
import { logoutUser } from '../../../../creators/application';
import { List, ListItem, ListItemIcon } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { SIGN_IN_SCREEN_PATH } from '../../../../configs/constants/app';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const Navigation = (
  props: NavigationProps & PassedInNavigationProps
): JSX.Element => {
  const classes = useStyles();

  return (
    <List component={'nav'} className={classes.root}>
      {Object.keys(appNavigationRoutes).map((value: string, index: number) => {
        return (
          appNavigationRoutes[value].shouldDisplayInNav && (
            <NavListItem
              key={index}
              currentLocation={props.currentLocation}
              pageInfo={appNavigationRoutes[value].pageProps[0]}
              clickHandler={() => {
                props.routeClickHandler(
                  appNavigationRoutes[value].pageProps[0].path
                );
              }}
            />
          )
        );
      })}

      <ListItem
        button
        onClick={() => {
          props.signOutClickHandler();
        }}
        data-testid={'list-item-log-out-button'}
      >
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
      </ListItem>
    </List>
  );
};

interface NavigationProps {
  activePage: RouteProp;
  currentLocation: string;
  routeClickHandler: (path: string) => void;
  signOutClickHandler: () => void;
}

interface PassedInNavigationProps {
  tempDrawer: boolean;
}

const mapStateToProps = (state: State): NavigationProps => {
  return {
    activePage: state.applicationState.activePage,
    currentLocation: state.applicationState.currentLocation,
  } as unknown as NavigationProps;
};

const mapDispatchToProps = (dispatch: Dispatch): NavigationProps =>
  ({
    routeClickHandler: (path: string) => {
      dispatch(routerActions.push(path));
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
