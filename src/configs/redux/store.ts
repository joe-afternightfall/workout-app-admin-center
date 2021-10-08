import {
  Store,
  combineReducers,
  applyMiddleware,
  createStore as originalCreateStore,
} from 'redux';
import { History } from 'history';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import application, { ApplicationState } from '../../reducers/application';
import builder, { RoutineBuilderState } from '../../reducers/routine-builder';

export const createStore = (history: History): Store => {
  const createStoreFunc = applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history)
    )(originalCreateStore),
    allReducers = combineReducers({
      applicationState: application.reducer,
      routineBuilderState: builder.reducer,
      router: connectRouter(history),
      routing: routerReducer,
    });

  return createStoreFunc(allReducers, {
    applicationState: {
      displayAppBar: true,
      displayAppSnackbar: false,
      snackbarProps: {
        text: '',
        severity: '',
        position: {
          vertical: '',
          horizontal: '',
        },
      },
      workoutConfigurations: {
        exerciseTypes: [],
        categoryTypes: [],
        circuitTypes: [],
        exercises: [],
      },
      selectedMuscleGroupIds: [],
      applyHoverStylesToMuscleGroup: '',
      circuitTemplates: [],
    } as unknown as ApplicationState,
    routineBuilderState: {
      selectExerciseForSegment: {
        segmentId: '',
        order: -1,
      },
      selectedRoutine: {
        id: '',
        firebaseId: '',
        name: '',
        workoutCategoryId: '',
        phases: [],
      },
    } as unknown as RoutineBuilderState,
  });
};

export interface State {
  applicationState: ApplicationState;
  routineBuilderState: RoutineBuilderState;
}
