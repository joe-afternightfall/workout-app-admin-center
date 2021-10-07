import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import RoutineBuilder from './builder/RoutineBuilder';
import NewRoutineButton from './NewRoutineButton';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class RoutinesScreen extends Component<RoutinesScreenProps> {
  state = {
    displayBuilder: false,
  };

  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Grid xs={12} item container>
        {this.state.displayBuilder ? (
          <Grid item xs={7}>
            <RoutineBuilder />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <NewRoutineButton
              callback={() => {
                this.setState({
                  displayBuilder: true,
                });
              }}
            />
          </Grid>
        )}
      </Grid>
    );
  }
}

export interface RoutinesScreenProps extends WithStyles<typeof styles> {
  DELETE_ME?: undefined;
}

export default withStyles(styles, { withTheme: true })(RoutinesScreen);
