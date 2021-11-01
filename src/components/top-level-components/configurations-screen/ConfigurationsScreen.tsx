import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import ConfigsAccordion from './components/ConfigsAccordion';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class ConfigurationsScreen extends Component<ConfigurationsScreenProps> {
  render(): JSX.Element {
    return (
      <Grid>
        <ConfigsAccordion />
      </Grid>
    );
  }
}

export type ConfigurationsScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(ConfigurationsScreen);
