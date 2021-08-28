import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { circuitTypeSnapToVO } from '../../utils/vo-builder';
import { CIRCUIT_TYPES_ROUTE } from '../../configs/constants/firebase-routes';
import { CircuitTypeDAO } from '../../configs/models/workout-configurations/circuit-type/CircuitTypeDAO';
import { CircuitTypeVO } from '../../configs/models/workout-configurations/circuit-type/CircuitTypeVO';

export const createNewCircuitType = async (name: string): Promise<void> => {
  const ref = firebase.database().ref(CIRCUIT_TYPES_ROUTE);
  const newRef = ref.push();

  const circuitDAO = new CircuitTypeDAO(uuidv4(), name);

  return await newRef.set(circuitDAO, (error: Error | null) => {
    if (error) {
      return Promise.reject();
    } else {
      return Promise.resolve();
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

export const updateCircuitType = async (
  firebaseId: string,
  name: string
): Promise<void> => {
  return await firebase
    .database()
    .ref(CIRCUIT_TYPES_ROUTE)
    .child(firebaseId)
    .update(
      {
        name: name,
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

export const deleteCircuitType = async (firebaseId: string): Promise<void> => {
  return await firebase
    .database()
    .ref(CIRCUIT_TYPES_ROUTE)
    .child(firebaseId)
    .remove((error: Error | null) => {
      if (error) {
        return Promise.reject();
      } else {
        return Promise.resolve();
      }
    });
};
