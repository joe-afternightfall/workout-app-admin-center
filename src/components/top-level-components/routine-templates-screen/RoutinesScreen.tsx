import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import TemplatesList from './TemplatesList';
import { Styles } from '@material-ui/styles';
import NewRoutineButton from './NewRoutineButton';
import PageTitle from '../../shared/PageTitle';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class RoutinesScreen extends Component<RoutinesScreenProps> {
  render(): JSX.Element {
    return (
      <Grid xs={12} item container spacing={2}>
        <Grid item xs={12} container justify={'space-between'}>
          <Grid item>
            <PageTitle title={'Lists of Routine Templates'} />
          </Grid>
          <Grid item>
            <NewRoutineButton />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TemplatesList />
        </Grid>
      </Grid>
    );
  }
}

export type RoutinesScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(RoutinesScreen);
