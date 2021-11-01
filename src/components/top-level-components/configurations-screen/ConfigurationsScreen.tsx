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
import PhasesTable from './components/tables/phases/PhasesTable';
import MusclesTable from './components/tables/muscles/MusclesTable';
import GripTypesTable from './components/tables/grip-types/GripTypesTable';
import GripWidthsTable from './components/tables/grip-widths/GripWidthsTable';
import ParameterTypesTable from './components/tables/parameter-types/ParameterTypesTable';
import TrainingSetTypesTable from './components/tables/training-set-types/TrainingSetTypesTable';
import MuscleTargetTypesTable from './components/tables/muscle-target-types/MuscleTargetTypesTable';
import ManikinMuscleGroupsTable from './components/tables/manikin-muscle-groups/ManikinMuscleGroupsTable';
import WorkoutEquipmentTable from './components/tables/workout-equipment/WorkoutEquipmentTable';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class ConfigurationsScreen extends Component<ConfigurationsScreenProps> {
  // todo: workout-category

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
      {
        title: 'Muscle Target Types',
        secondary: 'click to view muscle target types',
        element: <MuscleTargetTypesTable />,
      },
      {
        title: 'Muscles',
        secondary: 'click to view muscles',
        element: <MusclesTable />,
      },
      {
        title: 'Parameter Types',
        secondary: 'click to view parameter types',
        element: <ParameterTypesTable />,
      },
      {
        title: 'Phases',
        secondary: 'click to view phases',
        element: <PhasesTable />,
      },
      {
        title: 'Training Set Types',
        secondary: 'click to view training set types',
        element: <TrainingSetTypesTable />,
      },
      // {
      //   title: 'Workout Categories',
      //   secondary: 'click to view workout categories',
      //   element: <WorkoutCategoriesTable />,
      // },
      {
        title: 'Workout Equipment',
        secondary: 'click to view pieces of workout equipment',
        element: <WorkoutEquipmentTable />,
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
