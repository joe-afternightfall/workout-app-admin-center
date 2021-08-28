import { ActionTypes } from './actions';
import { CircuitTemplateVO } from '../configs/models/CircuitTemplateVO';

export interface LoadCircuitTemplatesAction {
  type: ActionTypes.LOAD_CIRCUIT_TEMPLATES;
  templates: CircuitTemplateVO[];
}

export const loadCircuitTemplates = (
  templates: CircuitTemplateVO[]
): LoadCircuitTemplatesAction => {
  return {
    type: ActionTypes.LOAD_CIRCUIT_TEMPLATES,
    templates: templates,
  };
};
