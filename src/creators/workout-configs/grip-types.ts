import { ActionTypes } from '../actions';
import { GripTypeVO } from 'workout-app-common-core';

export interface LoadGripTypesAction {
  type: ActionTypes.LOAD_GRIP_TYPES;
  gripTypes: GripTypeVO[];
}

export const loadGripTypes = (gripTypes: GripTypeVO[]): LoadGripTypesAction => {
  return {
    type: ActionTypes.LOAD_GRIP_TYPES,
    gripTypes: gripTypes,
  };
};
