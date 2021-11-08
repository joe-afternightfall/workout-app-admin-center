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
import exerciseForm, { ExerciseFormState } from '../../reducers/exercise-form';
import oldApplication, {
  OldApplicationState,
} from '../../reducers/zzz-old-stuff/old-application';

export const createStore = (history: History): Store => {
  const createStoreFunc = applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history)
    )(originalCreateStore),
    allReducers = combineReducers({
      applicationState: application.reducer,
      routineBuilderState: builder.reducer,
      exerciseFormState: exerciseForm.reducer,
      oldApplicationState: oldApplication.reducer,
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
        exercises: [],
        routineTemplates: [],
        gripTypes: [],
        gripWidths: [],
        trainingSetTypes: [],
        phases: [],
        workoutCategories: [],
        manikinMuscleGroups: [],
        muscles: [],
        muscleTargetTypes: [],
        parameterTypes: [],
        workoutEquipment: [],
      },
      selectedMuscleGroupIds: [],
      applyHoverStylesToMuscleGroup: '',
    } as unknown as ApplicationState,
    routineBuilderState: {
      selectedExerciseSlotForSegment: {
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
    exerciseFormState: {} as unknown as ExerciseFormState,
    oldApplicationState: {
      workout: {
        date: new Date(),
        circuits: [],
        time: '',
      },
      exerciseTypes: [],
      circuitTemplates: [],
      categoryTypes: [],
      circuitTypes: [],
      expandedAccordion: '',
      selectedMuscleGroupIds: [],
      stopwatch: {
        running: false,
        currentTimeMs: 0,
        currentTimeSec: 0,
        currentTimeMin: 0,
        watch: 0,
      },
    } as unknown as OldApplicationState,
  });
};

export interface State {
  applicationState: ApplicationState;
  routineBuilderState: RoutineBuilderState;
  exerciseFormState: ExerciseFormState;
  oldApplicationState: OldApplicationState;
}
