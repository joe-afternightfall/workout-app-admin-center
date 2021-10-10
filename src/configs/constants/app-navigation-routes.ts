import {
  EXERCISES_SCREEN_PATH,
  DASHBOARD_SCREEN_PATH,
  EXERCISE_TYPES_SCREEN_PATH,
  ROUTINE_TEMPLATES_SCREEN_PATH,
} from './app';
import {
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
    mainTitle: 'Routine Builder',
    mainIcon: BuilderIcon,
    pageProps: [
      {
        path: ROUTINE_TEMPLATES_SCREEN_PATH,
        drawerTitle: 'Routine Templates',
        headerTitle: 'Routine Templates',
        icon: BuilderIcon,
        testId: 'routine-template-nav',
        routerComponent: RoutinesScreen,
      },
    ],
  },
  EXERCISES_SCREEN: {
    nested: false,
    mainTitle: 'Exercises',
    mainIcon: FitnessCenter,
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
  CONFIGURATIONS_SCREEN: {
    nested: true,
    mainTitle: 'Configurations',
    mainIcon: Settings,
    pageProps: [
      {
        path: EXERCISE_TYPES_SCREEN_PATH,
        drawerTitle: 'Exercise Types',
        headerTitle: 'Exercise Types',
        icon: Settings,
        testId: 'exercise-types-nav',
        routerComponent: ExerciseTypesTable,
      },
    ],
  },
};