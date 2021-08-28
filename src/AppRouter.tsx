import App from './App';
import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { State } from './configs/redux/store';
import { PageProps, routes } from './configs/constants/routes';
import SignInScreen from './components/top-level-components/sign-in-screen/SignInScreen';

const AppRouter = (props: AppRouterProps): JSX.Element => {
  return props.isValidated ? (
    <App>
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
      </div>
    </App>
  ) : (
    <SignInScreen />
  );
};

export interface AppRouterProps {
  isValidated: boolean;
}

const mapStateToProps = (state: State): AppRouterProps => {
  return {
    isValidated: state.applicationState.userIsValidated,
  } as unknown as AppRouterProps;
};

export default connect(mapStateToProps)(AppRouter);
