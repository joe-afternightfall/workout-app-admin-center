import { Store } from 'redux';
import firebase from 'firebase';
import {
  WORKOUTS_ROUTE,
  EXERCISES_DB_ROUTE,
  EXERCISE_TYPES_ROUTE,
  ROUTINE_TEMPLATES_DB_ROUTE,
} from '../configs/constants/firebase-routes';
import {
  updateExercises,
  updateUserWorkouts,
  updateExerciseTypes,
  updateRoutineTemplates,
} from './update-methods';

const firebaseConfig = {
  apiKey: 'AIzaSyCxpOEet-ONYFVLUNdagd7o0McN3F2fFRc',
  authDomain: 'workout-app-d4f5d.firebaseapp.com',
  databaseURL: 'https://workout-app-d4f5d-default-rtdb.firebaseio.com',
  projectId: 'workout-app-d4f5d',
  storageBucket: 'workout-app-d4f5d.appspot.com',
  messagingSenderId: '1035531799240',
  appId: '1:1035531799240:web:f36aacaa51f6a5b76eb3fd',
  measurementId: 'G-HFR42VTJKC',
};

export class Initializer {
  store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  initializeFirebase(): void {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    const exerciseTypes = firebase.database().ref(EXERCISE_TYPES_ROUTE);
    const workouts = firebase.database().ref(WORKOUTS_ROUTE);
    const exercises = firebase.database().ref(EXERCISES_DB_ROUTE);
    const templates = firebase.database().ref(ROUTINE_TEMPLATES_DB_ROUTE);

    templates.on('child_added', async () => {
      await updateRoutineTemplates(this.store);
    });

    templates.on('child_changed', async () => {
      await updateRoutineTemplates(this.store);
    });

    templates.on('child_removed', async () => {
      await updateRoutineTemplates(this.store);
    });

    exercises.on('child_added', async () => {
      await updateExercises(this.store);
    });

    exercises.on('child_changed', async () => {
      await updateExercises(this.store);
    });

    exercises.on('child_removed', async () => {
      await updateExercises(this.store);
    });

    exerciseTypes.on('child_added', async () => {
      await updateExerciseTypes(this.store);
    });

    exerciseTypes.on('child_changed', async () => {
      await updateExerciseTypes(this.store);
    });

    exerciseTypes.on('child_removed', async () => {
      await updateExerciseTypes(this.store);
    });

    workouts.on('child_added', async () => {
      await updateUserWorkouts(this.store);
    });

    workouts.on('child_changed', async () => {
      await updateUserWorkouts(this.store);
    });

    workouts.on('child_removed', async () => {
      await updateUserWorkouts(this.store);
    });
  }
}
