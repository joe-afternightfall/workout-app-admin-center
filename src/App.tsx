import {
  Theme,
  withStyles,
  WithStyles,
  MuiThemeProvider,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { getLightTheme } from './configs/theme/light-theme';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class App extends Component<AppProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={getLightTheme()}>
        <div className={classes.root}>
          <CssBaseline />

          <main className={classes.content}>
            <div className={classes.toolbar} />
            <div>{this.props.children}</div>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export interface AppProps extends WithStyles<typeof styles> {
  children: JSX.Element;
}

export default withStyles(styles, { withTheme: true })(App);
