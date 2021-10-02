import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import ExerciseListTable from './ExerciseListTable';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class ExercisesScreen extends Component<ExercisesScreenProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Grid container>
        <Grid item xs={12}>
          <ExerciseListTable />
        </Grid>
      </Grid>
    );
  }
}

export interface ExercisesScreenProps extends WithStyles<typeof styles> {
  DELETE_ME?: undefined;
}

export default withStyles(styles, { withTheme: true })(ExercisesScreen);
