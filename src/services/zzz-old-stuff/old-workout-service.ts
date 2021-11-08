import firebase from 'firebase/app';
import 'firebase/database';
import { ExerciseTypeVO } from '../../configs/zzz-old-stuff/old-models/ExerciseTypeVO';
import { CircuitTypeVO } from '../../configs/zzz-old-stuff/old-models/CircuitTypeVO';
import { CircuitTypeDAO } from '../../configs/zzz-old-stuff/old-models/CircuitTypeDAO';
import { ThunkAction } from 'redux-thunk';
import { State } from '../../configs/redux/store';
import { AnyAction, Dispatch } from 'redux';
import {
  clearWorkoutScreen,
  stopStopwatch,
} from '../../creators/zzz-old-stuff/old-creators';
import { WorkoutDAO } from '../../configs/zzz-old-stuff/old-models/WorkoutDAO';
import { WorkoutVO } from '../../configs/zzz-old-stuff/old-models/WorkoutVO';
import { routerActions } from 'react-router-redux';
import { v4 as uuidv4 } from 'uuid';

import { DASHBOARD_SCREEN_PATH } from '../../configs/constants/app';
import { CircuitTemplateDAO } from '../../configs/zzz-old-stuff/old-models/CircuitTemplateDAO';
import { CircuitTemplateVO } from '../../configs/zzz-old-stuff/old-models/CircuitTemplateVO';
import {
  ExerciseTypeDAO,
  SetType,
} from '../../configs/zzz-old-stuff/old-models/ExerciseTypeDAO';

export const WORKOUTS_ROUTE = '/workouts';
const BASE_CONFIG_ROUTE = '/workout-configurations';
export const CIRCUIT_TYPES_ROUTE = `${BASE_CONFIG_ROUTE}/circuit-types`;
export const CIRCUIT_TEMPLATES_ROUTE = `${BASE_CONFIG_ROUTE}/circuit-templates`;
export const EXERCISE_TYPES_ROUTE = `${BASE_CONFIG_ROUTE}/exercise-types`;

export const saveWorkout =
  (): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    if (getState().oldApplicationState.stopwatch.running) {
      dispatch(stopStopwatch());
    }
    const username = getState().applicationState.userEmail;
    const circuits = getState().oldApplicationState.workout.circuits;
    const workoutDate = getState().oldApplicationState.workout.date;
    const workoutTime = {
      currentTimeMs: getState().oldApplicationState.stopwatch.currentTimeMs,
      currentTimeSec: getState().oldApplicationState.stopwatch.currentTimeSec,
      currentTimeMin: getState().oldApplicationState.stopwatch.currentTimeMin,
    };

    const ref = firebase.database().ref(WORKOUTS_ROUTE);
    const newRef = ref.push();

    const workoutDAO = new WorkoutDAO(
      uuidv4(),
      username,
      circuits,
      workoutDate.toLocaleDateString(),
      workoutTime
    );

    return await newRef.set(workoutDAO, (error: Error | null) => {
      if (error) {
        return Promise.reject();
      } else {
        dispatch(routerActions.push(DASHBOARD_SCREEN_PATH));
        dispatch(clearWorkoutScreen());
        return Promise.resolve();
      }
    });
  };

export const getWorkoutsForUser = async (
  email: string
): Promise<WorkoutVO[]> => {
  return await firebase
    .database()
    .ref(WORKOUTS_ROUTE)
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then((snapshot) => {
      if (snapshot.val()) {
        return workoutsSnapToVO(snapshot.val());
      } else {
        return [];
      }
    });
};

export const createNewExerciseType = async (
  name: string,
  muscleGroupIds: string[],
  setType: SetType
): Promise<void> => {
  const ref = firebase.database().ref(EXERCISE_TYPES_ROUTE);
  const newRef = ref.push();
  const exerciseTypeDAO = new ExerciseTypeDAO(
    uuidv4(),
    name,
    muscleGroupIds,
    setType
  );

  return await newRef.set(exerciseTypeDAO, (error: Error | null) => {
    if (error) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  });
};

export const getAllExerciseTypes = async (): Promise<ExerciseTypeVO[]> => {
  return await firebase
    .database()
    .ref(EXERCISE_TYPES_ROUTE)
    .once('value')
    .then((snapshot) => {
      if (snapshot.val()) {
        return exerciseTypeSnapToVO(snapshot.val());
      } else {
        return [];
      }
    });
};

export const updateExerciseType = async (
  firebaseId: string,
  exerciseName: string,
  muscleGroupIds: string[],
  setType: SetType
): Promise<void> => {
  return await firebase
    .database()
    .ref(EXERCISE_TYPES_ROUTE)
    .child(firebaseId)
    .update(
      {
        name: exerciseName,
        muscleGroupIds: muscleGroupIds,
        setType: setType,
      },
      (error: Error | null) => {
        if (error) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      }
    );
};

export const deleteExerciseType = async (firebaseId: string): Promise<void> => {
  return await firebase
    .database()
    .ref(EXERCISE_TYPES_ROUTE)
    .child(firebaseId)
    .remove((error) => {
      if (error) {
        return Promise.reject();
      } else {
        return Promise.resolve();
      }
    });
};

export const getCircuitTemplates = async (): Promise<CircuitTemplateVO[]> => {
  return await firebase
    .database()
    .ref(CIRCUIT_TEMPLATES_ROUTE)
    .once('value')
    .then((snapshot) => {
      if (snapshot.val()) {
        return circuitTemplateSnapToVO(snapshot.val());
      } else {
        return [];
      }
    });
};

export const getAllCircuitTypes = async (): Promise<CircuitTypeVO[]> => {
  return await firebase
    .database()
    .ref(CIRCUIT_TYPES_ROUTE)
    .once('value')
    .then((snapshot) => {
      if (snapshot.val()) {
        return circuitTypeSnapToVO(snapshot.val());
      } else {
        return [];
      }
    });
};

export interface CircuitTypeSnapshot {
  [key: string]: CircuitTypeDAO;
}

export const circuitTypeSnapToVO = (
  snap: CircuitTypeSnapshot
): CircuitTypeVO[] => {
  return Object.keys(snap).map((key: string) => {
    return {
      firebaseId: key,
      id: snap[key].id,
      name: snap[key].name,
    };
  });
};

export interface WorkoutsSnapshot {
  [key: string]: WorkoutDAO;
}

export const workoutsSnapToVO = (snap: WorkoutsSnapshot): WorkoutVO[] => {
  return Object.keys(snap).map((key: string) => {
    return {
      firebaseId: key,
      id: snap[key].id,
      email: snap[key].email,
      circuits: snap[key].circuits,
      date: snap[key].date,
      time: snap[key].time,
    };
  });
};

export interface ExerciseTypeSnapshot {
  [key: string]: ExerciseTypeDAO;
}
export const exerciseTypeSnapToVO = (
  snap: ExerciseTypeSnapshot
): ExerciseTypeVO[] => {
  return Object.keys(snap).map((key: string): ExerciseTypeVO => {
    return {
      firebaseId: key,
      id: snap[key].id,
      name: snap[key].name,
      muscleGroupIds: snap[key].muscleGroupIds,
      setType: snap[key].setType,
    };
  });
};

export interface CircuitTemplateSnapshot {
  [key: string]: CircuitTemplateDAO;
}

export const circuitTemplateSnapToVO = (
  snap: CircuitTemplateSnapshot
): CircuitTemplateVO[] => {
  return Object.keys(snap).map((key: string) => {
    return {
      firebaseId: key,
      id: snap[key].id,
      circuitId: snap[key].circuitId,
      circuitNickname: snap[key].circuitNickname,
      exercises: snap[key].exercises,
    };
  });
};
