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
import FormDialog from './form-dialog/ExerciseFormDialog';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class ExercisesScreen extends Component {
  render(): JSX.Element {
    return (
      <Grid container>
        <FormDialog />
        <Grid item xs={12}>
          <ExerciseListTable />
        </Grid>
      </Grid>
    );
  }
}

export type ExercisesScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(ExercisesScreen);
