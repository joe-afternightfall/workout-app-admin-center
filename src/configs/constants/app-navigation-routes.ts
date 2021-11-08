import {
  EXERCISES_SCREEN_PATH,
  DASHBOARD_SCREEN_PATH,
  EXERCISE_TYPES_SCREEN_PATH,
  ROUTINE_TEMPLATES_SCREEN_PATH,
  ROUTINE_BUILDER_SCREEN_PATH,
  APP_CONFIGS_SCREEN_PATH,
  OLD_WORKOUT_SCREEN_PATH,
} from './app';
import {
  ListAlt,
  Settings,
  FitnessCenter,
  Build as BuilderIcon,
  DashboardRounded as DashboardIcon,
} from '@material-ui/icons';
import { ComponentType } from 'react';
import { SvgIconTypeMap } from '@material-ui/core';
import { StyledComponentProps } from '@material-ui/core/styles';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import ExercisesScreen from '../../components/top-level-components/exercises-screen/ExercisesScreen';
import DashboardScreen from '../../components/top-level-components/dashboard-screen/DashboardScreen';
import RoutinesScreen from '../../components/top-level-components/routine-templates-screen/RoutinesScreen';
import ExerciseTypesTable from '../../components/top-level-components/workout-configs/exercise-types-screen/ExerciseTypesTable';
import RoutineBuilderScreen from '../../components/top-level-components/routine-builder-screen/RoutineBuilderScreen';
import ConfigurationsScreen from '../../components/top-level-components/configurations-screen/ConfigurationsScreen';
import OldWorkoutScreen from '../../components/zzz-old-stuff/widgets/old-workout-screen/WorkoutScreenConnector';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import AccessibleIcon from '@material-ui/icons/Accessible';

export interface PageProps {
  path: string;
  drawerTitle: string;
  headerTitle: string;
  icon: OverridableComponent<SvgIconTypeMap>;
  testId: string;
  routerComponent: ComponentType<
    Pick<{ classes: Record<string, string> }, never> & StyledComponentProps
  >;
}

export interface RouteProp {
  nested: boolean;
  mainTitle: string;
  mainIcon: OverridableComponent<SvgIconTypeMap>;
  pageProps: PageProps[];
  shouldDisplayInNav: boolean;
}

export type RoutesMap = {
  [key: string]: RouteProp;
  DASHBOARD: RouteProp;
};

export const appNavigationRoutes: RoutesMap = {
  DASHBOARD: {
    nested: false,
    mainTitle: '',
    mainIcon: DashboardIcon,
    shouldDisplayInNav: true,
    pageProps: [
      {
        path: DASHBOARD_SCREEN_PATH,
        drawerTitle: 'Dashboard',
        headerTitle: 'Dashboard',
        icon: DashboardIcon,
        testId: 'dashboard-nav',
        routerComponent: DashboardScreen,
      },
    ],
  },
  ROUTINE_TEMPLATES_SCREEN: {
    nested: false,
    mainTitle: 'Routine Templates',
    mainIcon: ListAlt,
    shouldDisplayInNav: true,
    pageProps: [
      {
        path: ROUTINE_TEMPLATES_SCREEN_PATH,
        drawerTitle: 'Routine Templates',
        headerTitle: 'Routine Templates',
        icon: ListAlt,
        testId: 'routine-template-nav',
        routerComponent: RoutinesScreen,
      },
    ],
  },
  ROUTINE_BUILDER_SCREEN: {
    nested: false,
    mainTitle: 'Routine Builder',
    mainIcon: BuilderIcon,
    shouldDisplayInNav: false,
    pageProps: [
      {
        path: ROUTINE_BUILDER_SCREEN_PATH,
        drawerTitle: 'Routine Builder',
        headerTitle: 'Routine Builder',
        icon: BuilderIcon,
        testId: 'routine-builder-nav',
        routerComponent: RoutineBuilderScreen,
      },
    ],
  },
  EXERCISES_SCREEN: {
    nested: false,
    mainTitle: 'Exercises',
    mainIcon: FitnessCenter,
    shouldDisplayInNav: true,
    pageProps: [
      {
        path: EXERCISES_SCREEN_PATH,
        drawerTitle: 'Exercises',
        headerTitle: 'Exercises',
        icon: FitnessCenter,
        testId: 'exercises-builder-nav',
        routerComponent: ExercisesScreen,
      },
    ],
  },
  ALL_CONFIGURATIONS_SCREEN: {
    nested: true,
    mainTitle: 'App Configs',
    mainIcon: Settings,
    shouldDisplayInNav: true,
    pageProps: [
      {
        path: APP_CONFIGS_SCREEN_PATH,
        drawerTitle: 'App Configs',
        headerTitle: 'App Configs',
        icon: Settings,
        testId: 'app-configs-nav',
        routerComponent: ConfigurationsScreen,
      },
    ],
  },
  OLD_EXERCISES_SCREEN: {
    nested: true,
    mainTitle: 'Old Exercises',
    mainIcon: AccessibleIcon,
    shouldDisplayInNav: true,
    pageProps: [
      {
        path: EXERCISE_TYPES_SCREEN_PATH,
        drawerTitle: 'Old Exercise Types',
        headerTitle: 'Old Exercise Types',
        icon: AccessibleIcon,
        testId: 'old-exercise-types-nav',
        routerComponent: ExerciseTypesTable,
      },
    ],
  },
  OLD_WORKOUT_SCREEN: {
    nested: false,
    mainTitle: 'Old Workout',
    mainIcon: FolderSpecialIcon,
    shouldDisplayInNav: true,
    pageProps: [
      {
        path: OLD_WORKOUT_SCREEN_PATH,
        drawerTitle: 'Old Workout Screen',
        headerTitle: 'Old Workout Screen',
        icon: FolderSpecialIcon,
        testId: 'old-workout-screen-nav',
        routerComponent: OldWorkoutScreen,
      },
    ],
  },
};
