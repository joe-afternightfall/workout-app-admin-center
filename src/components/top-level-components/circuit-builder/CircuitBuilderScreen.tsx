import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import Templates from './Templates';
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Styles } from '@material-ui/styles';
import BuilderDialog from '../../widgets/circuit-tool-builder/BuilderDialog';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class CircuitBuilderScreen extends Component<CircuitBuilderScreenProps> {
  render(): JSX.Element {
    return (
      <Grid xs={12} item container>
        <Grid item xs={5}>
          <Templates />
        </Grid>
        <Grid item xs={7}>
          <BuilderDialog />
        </Grid>
      </Grid>
    );
  }
}

export type CircuitBuilderScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(CircuitBuilderScreen);
