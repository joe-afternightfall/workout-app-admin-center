import firebase from 'firebase/app';
import 'firebase/analytics';
import { Store } from 'redux';
import {
  updateCircuitTemplates,
  updateCircuitTypes,
  updateExerciseTypes,
  updateUserWorkouts,
} from './old-update-methods';
import {
  CIRCUIT_TEMPLATES_ROUTE,
  CIRCUIT_TYPES_ROUTE,
  EXERCISE_TYPES_ROUTE,
  WORKOUTS_ROUTE,
} from '../../services/zzz-old-stuff/old-workout-service';
import { firebaseConfig } from '../Initializer';

export class OldInitializer {
  store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  initializeOldFirebaseMethods(): void {
    // firebase.initializeApp(firebaseConfig);

    const oldRefArray = [
      {
        ref: firebase.database().ref(EXERCISE_TYPES_ROUTE),
        updateMethod: () => updateExerciseTypes(this.store),
      },
      {
        ref: firebase.database().ref(CIRCUIT_TYPES_ROUTE),
        updateMethod: () => updateCircuitTypes(this.store),
      },
      {
        ref: firebase.database().ref(WORKOUTS_ROUTE),
        updateMethod: () => updateUserWorkouts(this.store),
      },
      {
        ref: firebase.database().ref(CIRCUIT_TEMPLATES_ROUTE),
        updateMethod: () => updateCircuitTemplates(this.store),
      },
    ];

    oldRefArray.map((entry) => {
      entry.ref.on('child_added', async () => {
        await entry.updateMethod();
      });

      entry.ref.on('child_changed', async () => {
        await entry.updateMethod();
      });

      entry.ref.on('child_removed', async () => {
        await entry.updateMethod();
      });
    });
  }
}
