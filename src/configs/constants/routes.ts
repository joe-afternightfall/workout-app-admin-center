import {
  DASHBOARD_SCREEN_PATH,
  CIRCUIT_TYPES_SCREEN_PATH,
  EXERCISE_TYPES_SCREEN_PATH,
  CIRCUIT_BUILDER_SCREEN_PATH,
} from './app';
import {
  Settings,
  DashboardRounded as DashboardIcon,
  Build as BuilderIcon,
} from '@material-ui/icons';
import { ComponentType } from 'react';
import { SvgIconTypeMap } from '@material-ui/core';
import { StyledComponentProps } from '@material-ui/core/styles';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import DashboardScreen from '../../components/top-level-components/dashboard-screen/DashboardScreen';
import CircuitTypesTable from '../../components/top-level-components/workout-configs/circuit-types-screen/CircuitTypesTable';
import ExerciseTypesTable from '../../components/top-level-components/workout-configs/exercise-types-screen/ExerciseTypesTable';
import CircuitBuilderScreen from '../../components/top-level-components/circuit-builder/CircuitBuilderScreen';

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

export const routes: RoutesMap = {
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
  CIRCUIT_BUILDER_SCREEN: {
    nested: false,
    mainTitle: '',
    mainIcon: BuilderIcon,
    pageProps: [
      {
        path: CIRCUIT_BUILDER_SCREEN_PATH,
        drawerTitle: 'Circuit Builder',
        headerTitle: 'Circuit Builder',
        icon: BuilderIcon,
        testId: 'circuit-builder-nav',
        routerComponent: CircuitBuilderScreen,
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
      {
        path: CIRCUIT_TYPES_SCREEN_PATH,
        drawerTitle: 'Circuit Types',
        headerTitle: 'Circuit Types',
        icon: Settings,
        testId: 'circuit-types-nav',
        routerComponent: CircuitTypesTable,
      },
    ],
  },
};
