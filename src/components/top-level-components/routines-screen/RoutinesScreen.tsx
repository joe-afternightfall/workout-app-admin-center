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

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class RoutinesScreen extends Component<RoutinesScreenProps> {
  state = {
    activeTab: 0,
  };

  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Grid xs={12} item container>
        <Grid item xs={7}>
          <RoutineBuilder />
        </Grid>
      </Grid>
    );
  }
}

export interface RoutinesScreenProps extends WithStyles<typeof styles> {
  DELETE_ME?: undefined;
}

export default withStyles(styles, { withTheme: true })(RoutinesScreen);
