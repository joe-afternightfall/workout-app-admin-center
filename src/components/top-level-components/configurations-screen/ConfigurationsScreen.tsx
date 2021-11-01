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
import GripTypesTable from './components/tables/grip-types/GripTypesTable';
import GripWidthsTable from './components/tables/grip-widths/GripWidthsTable';
import ManikinMuscleGroupsTable from './components/tables/manikin-muscle-groups/ManikinMuscleGroupsTable';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class ConfigurationsScreen extends Component<ConfigurationsScreenProps> {
  // todo: manikin-muscle-group
  // todo: muscle
  // todo: muscle-target-type
  // todo: parameter-type
  // todo: phase
  // todo: training-set-type
  // todo: workout-category
  // todo: workout-equipment

  render(): JSX.Element {
    const accordionElements = [
      {
        title: 'Grip Types',
        secondary: 'click to view grip types',
        element: <GripTypesTable />,
      },
      {
        title: 'Grip Widths',
        secondary: 'click to view grip widths',
        element: <GripWidthsTable />,
      },
      {
        title: 'Manikin Muscle Groups',
        secondary: 'click to view manikin muscle groups',
        element: <ManikinMuscleGroupsTable />,
      },
    ];
    return (
      <Grid item xs={12}>
        <ConfigsAccordion accordionElements={accordionElements} />
      </Grid>
    );
  }
}

export type ConfigurationsScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(ConfigurationsScreen);
