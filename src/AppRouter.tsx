import App from './App';
import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { State } from './configs/redux/store';
import { PageProps, routes } from './configs/constants/routes';
import SignInScreen from './components/top-level-components/sign-in-screen/SignInScreen';
import { ROUTINE_BUILDER_SCREEN_PATH } from './configs/constants/app';
import RoutineBuilder from './components/top-level-components/routines-screen/builder/RoutineBuilder';

const AppRouter = (props: AppRouterProps): JSX.Element => {
  return props.isValidated ? (
    <App displayAppBar={props.displayAppBar}>
      <div className={'route'}>
        {Object.keys(routes).map((value: string) => {
          return routes[value].pageProps.map(
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
        <Route
          exact
          path={ROUTINE_BUILDER_SCREEN_PATH}
          component={RoutineBuilder}
        />
      </div>
    </App>
  ) : (
    <SignInScreen />
  );
};

export interface AppRouterProps {
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
