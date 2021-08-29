import firebase from 'firebase';
import { circuitTemplateSnapToVO } from '../utils/vo-builder';
import { CIRCUIT_TEMPLATES_ROUTE } from '../configs/constants/firebase-routes';
import { BuilderTemplate } from '../components/widgets/circuit-tool-builder/BuilderDialog';
import {
  CircuitTemplateDAO,
  CircuitTemplateVO,
} from 'workout-app-common-core/core/src';

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

export const createNewCircuitTemplate = async (
  builderTemplate: BuilderTemplate
): Promise<void> => {
  const ref = firebase.database().ref(CIRCUIT_TEMPLATES_ROUTE);
  const newRef = ref.push();

  const template = new CircuitTemplateDAO(
    builderTemplate.id,
    builderTemplate.circuitId,
    builderTemplate.circuitNickname,
    builderTemplate.exercises
  );

  return await newRef.set(template, (error: Error | null) => {
    if (error) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  });
};
