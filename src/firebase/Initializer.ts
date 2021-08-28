import { Store } from 'redux';
import firebase from 'firebase';
import {
  EXERCISE_TYPES_ROUTE,
  CIRCUIT_TYPES_ROUTE,
  WORKOUTS_ROUTE,
  CIRCUIT_TEMPLATES_ROUTE,
} from '../configs/constants/firebase-routes';

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
  }
}
