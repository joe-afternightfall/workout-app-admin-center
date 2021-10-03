import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import RoutineFormView from './form-view/RoutineFormView';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class RoutineBuilderScreen extends Component<RoutineBuilderScreenProps> {
  state = {
    activeTab: 0,
  };

  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <SwipeableViews
        index={this.state.activeTab}
        containerStyle={{
          transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s',
          height: '85vh',
        }}
      >
        <Grid xs={12} item container>
          <RoutineFormView />
        </Grid>
      </SwipeableViews>
    );
  }
}

export interface RoutineBuilderScreenProps extends WithStyles<typeof styles> {
  DELETE_ME?: undefined;
}

export default withStyles(styles, { withTheme: true })(RoutineBuilderScreen);
