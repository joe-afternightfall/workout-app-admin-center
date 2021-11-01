import { Store } from 'redux';
import firebase from 'firebase';
import { EXERCISE_TYPES_ROUTE } from '../configs/constants/firebase-routes';
import {
  updateExercises,
  updateExerciseTypes,
  updateGripTypes,
  updateGripWidths,
  updateManikinMuscleGroups,
  updateMuscles,
  updateMuscleTargetTypes,
  updateParameterTypes,
  updatePhases,
  updateRoutineTemplates,
  updateTrainingSetTypes,
  updateWorkoutCategories,
  updateWorkoutEquipment,
} from './update-methods';
import {
  FIREBASE_DB_EXERCISES_ROUTE,
  FIREBASE_DB_GRIP_TYPES_ROUTE,
  FIREBASE_DB_GRIP_WIDTHS_ROUTE,
  FIREBASE_DB_MANIKIN_MUSCLE_GROUPS_ROUTE,
  FIREBASE_DB_MUSCLE_TARGET_TYPES_ROUTE,
  FIREBASE_DB_MUSCLES_ROUTE,
  FIREBASE_DB_PARAMETER_TYPES_ROUTE,
  FIREBASE_DB_PHASES_ROUTE,
  FIREBASE_DB_ROUTINE_TEMPLATES_ROUTE,
  FIREBASE_DB_TRAINING_SET_TYPES_ROUTE,
  FIREBASE_DB_WORKOUT_CATEGORIES_ROUTE,
  FIREBASE_DB_WORKOUT_EQUIPMENT_ROUTE,
} from 'workout-app-common-core';

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

  // todo: manikin-muscle-group
  // todo: muscle
  // todo: muscle-target-type
  // todo: parameter-type
  // todo: phase
  // todo: training-set-type
  // todo: workout-category
  // todo: workout-equipment
  initializeFirebase(): void {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    const refArray = [
      {
        ref: firebase.database().ref(EXERCISE_TYPES_ROUTE),
        updateMethod: () => updateExerciseTypes(this.store),
      },
      {
        ref: firebase.database().ref(FIREBASE_DB_EXERCISES_ROUTE),
        updateMethod: () => updateExercises(this.store),
      },
      {
        ref: firebase.database().ref(FIREBASE_DB_ROUTINE_TEMPLATES_ROUTE),
        updateMethod: () => updateRoutineTemplates(this.store),
      },
      {
        ref: firebase.database().ref(FIREBASE_DB_GRIP_TYPES_ROUTE),
        updateMethod: () => updateGripTypes(this.store),
      },
      {
        ref: firebase.database().ref(FIREBASE_DB_GRIP_WIDTHS_ROUTE),
        updateMethod: () => updateGripWidths(this.store),
      },
      {
        ref: firebase.database().ref(FIREBASE_DB_MANIKIN_MUSCLE_GROUPS_ROUTE),
        updateMethod: () => updateManikinMuscleGroups(this.store),
      },
      {
        ref: firebase.database().ref(FIREBASE_DB_MUSCLES_ROUTE),
        updateMethod: () => updateMuscles(this.store),
      },
      {
        ref: firebase.database().ref(FIREBASE_DB_MUSCLE_TARGET_TYPES_ROUTE),
        updateMethod: () => updateMuscleTargetTypes(this.store),
      },
      {
        ref: firebase.database().ref(FIREBASE_DB_PARAMETER_TYPES_ROUTE),
        updateMethod: () => updateParameterTypes(this.store),
      },
      {
        ref: firebase.database().ref(FIREBASE_DB_PHASES_ROUTE),
        updateMethod: () => updatePhases(this.store),
      },
      {
        ref: firebase.database().ref(FIREBASE_DB_TRAINING_SET_TYPES_ROUTE),
        updateMethod: () => updateTrainingSetTypes(this.store),
      },
      {
        ref: firebase.database().ref(FIREBASE_DB_WORKOUT_CATEGORIES_ROUTE),
        updateMethod: () => updateWorkoutCategories(this.store),
      },
      {
        ref: firebase.database().ref(FIREBASE_DB_WORKOUT_EQUIPMENT_ROUTE),
        updateMethod: () => updateWorkoutEquipment(this.store),
      },
    ];

    refArray.map((entry) => {
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
