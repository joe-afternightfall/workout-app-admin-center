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
import { DocumentFullScreen } from '@chiragrupani/fullscreen-react';
import AppBar from './components/app-shell/AppBar';
import ResponsiveSideDrawer from './components/app-shell/side-drawer/ResponsiveSideDrawer';
import AppSnackbar from './components/app-shell/AppSnackbar';

const styles: Styles<Theme, StyledComponentProps> = (theme: Theme) => ({
  root: {
    display: 'flex',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class App extends Component<AppProps> {
  state = {
    isFullScreen: false,
  };

  render(): JSX.Element {
    const { classes, displayAppBar } = this.props;

    const handleFullScreenClick = (open: boolean) => {
      this.setState({
        isFullScreen: open,
      });
    };

    return (
      <DocumentFullScreen
        isFullScreen={this.state.isFullScreen}
        onChange={(isFullScreen: boolean) => {
          handleFullScreenClick(isFullScreen);
        }}
      >
        <MuiThemeProvider theme={getLightTheme()}>
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              isFullScreen={this.state.isFullScreen}
              fullScreenClickHandler={handleFullScreenClick}
            />
            <AppSnackbar />
            <ResponsiveSideDrawer />

            <main className={classes.content}>
              {displayAppBar && <div className={classes.toolbar} />}
              <div>{this.props.children}</div>
            </main>
          </div>
        </MuiThemeProvider>
      </DocumentFullScreen>
    );
  }
}

export interface AppProps extends WithStyles<typeof styles> {
  children: JSX.Element;
  displayAppBar: boolean;
}

export default withStyles(styles, { withTheme: true })(App);
