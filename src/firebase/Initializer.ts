import { Store } from 'redux';
import firebase from 'firebase';
import {
  WORKOUTS_ROUTE,
  CIRCUIT_TYPES_ROUTE,
  EXERCISE_TYPES_ROUTE,
  CIRCUIT_TEMPLATES_ROUTE,
} from '../configs/constants/firebase-routes';
import {
  updateCircuitTemplates,
  updateCircuitTypes,
  updateExerciseTypes,
  updateUserWorkouts,
} from './update-methods';

const firebaseConfig = {
  apiKey: 'AIzaSyCxpOEet-ONYFVLUNdagd7o0McN3F2fFRc',
  authDomain: 'workout-app-d4f5d.firebaseapp.com',
  databaseURL: 'https://workout-app-d4f5d-default-rtdb.firebaseio.com',
  projectId: 'workout-app-d4f5d',
  storageBucket: 'workout-app-d4f5d.appspot.com',
  messagingSenderId: '1035531799240',
  appId: '1:1035531799240:web:edacdb6be2e4151f6eb3fd',
  measurementId: 'G-8ZHYM31TZ7',
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
    const circuitTypes = firebase.database().ref(CIRCUIT_TYPES_ROUTE);
    const workouts = firebase.database().ref(WORKOUTS_ROUTE);
    const circuitTemplates = firebase.database().ref(CIRCUIT_TEMPLATES_ROUTE);

    exerciseTypes.on('child_added', async () => {
      await updateExerciseTypes(this.store);
    });

    exerciseTypes.on('child_changed', async () => {
      await updateExerciseTypes(this.store);
    });

    exerciseTypes.on('child_removed', async () => {
      await updateExerciseTypes(this.store);
    });

    circuitTypes.on('child_added', async () => {
      await updateCircuitTypes(this.store);
    });

    circuitTypes.on('child_changed', async () => {
      await updateCircuitTypes(this.store);
    });

    circuitTypes.on('child_removed', async () => {
      await updateCircuitTypes(this.store);
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

    circuitTemplates.on('child_added', async () => {
      await updateCircuitTemplates(this.store);
    });

    circuitTemplates.on('child_changed', async () => {
      await updateCircuitTemplates(this.store);
    });

    circuitTemplates.on('child_removed', async () => {
      await updateCircuitTemplates(this.store);
    });
  }
}
