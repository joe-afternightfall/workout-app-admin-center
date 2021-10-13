import App from './App';
import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { State } from './configs/redux/store';
import {
  PageProps,
  appNavigationRoutes,
} from './configs/constants/app-navigation-routes';
import SignInScreen from './components/top-level-components/sign-in-screen/SignInScreen';

const AppRouter = (props: AppRouterProps): JSX.Element => {
  return props.isValidated ? (
    <App displayAppBar={props.displayAppBar}>
      <div className={'route'}>
        {Object.keys(appNavigationRoutes).map((value: string) => {
          return appNavigationRoutes[value].pageProps.map(
            (page: PageProps, index: number) => {
              return (
                <Route
                  key={index}
                  exact
                  path={page.path}
                  component={page.routerComponent}
                />
              );
            }
          );
        })}
      </div>
    </App>
  ) : (
    <SignInScreen />
  );
};

interface AppRouterProps {
  isValidated: boolean;
  displayAppBar: boolean;
}

const mapStateToProps = (state: State): AppRouterProps => {
  return {
    isValidated: state.applicationState.userIsValidated,
    displayAppBar: state.applicationState.displayAppBar,
  } as unknown as AppRouterProps;
};

export default connect(mapStateToProps)(AppRouter);
