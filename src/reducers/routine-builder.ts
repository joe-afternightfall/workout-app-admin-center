import { ActionTypes, ApplicationActions } from '../creators/actions';
import { RoutineTemplateVO } from 'workout-app-common-core';
import { v4 as uuidv4 } from 'uuid';
import * as ramda from 'ramda';

export default {
  reducer: (
    state: RoutineBuilderState = {} as unknown as RoutineBuilderState,
    action: ApplicationActions
  ): RoutineBuilderState => {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case ActionTypes.BUILD_NEW_ROUTINE:
        newState.selectedRoutine = action.routine;
        break;
      case ActionTypes.SELECT_ACTIVE_CARD:
        newState.activeCardId = action.activeCardId;
        break;
      case ActionTypes.UPDATE_SELECTED_CATEGORY_ID:
        newState.selectedRoutine.workoutCategoryId = action.id;
        break;
      case ActionTypes.UPDATE_ROUTINE_TITLE:
        newState.selectedRoutine.name = action.value;
        break;
      case ActionTypes.ADD_PHASE_TO_ROUTINE: {
        const order = newState.selectedRoutine.phases.length + 1;
        const clonedPhases = ramda.clone(newState.selectedRoutine.phases);
        clonedPhases.push({
          id: uuidv4(),
          phaseId: '',
          order: order,
          segments: [],
        });
        newState.selectedRoutine.phases = clonedPhases;
        break;
      }
      case ActionTypes.SELECT_PHASE: {
        const clonedPhases = ramda.clone(newState.selectedRoutine.phases);
        clonedPhases.map((phase) => {
          if (phase.id === action.workoutPhaseId) {
            phase.phaseId = action.phaseId;
          }
        });
        newState.selectedRoutine.phases = clonedPhases;
        break;
      }
      case ActionTypes.SELECT_SET_TYPE: {
        const clonedPhases = ramda.clone(newState.selectedRoutine.phases);
        clonedPhases.map((phase) => {
          phase.segments.map((segment) => {
            if (segment.id === action.segmentId) {
              segment.trainingSetTypeId = action.setTypeId;
            }
          });
        });
        newState.selectedRoutine.phases = clonedPhases;
        break;
      }
      case ActionTypes.ADD_SEGMENT_TO_PHASE: {
        const clonedPhases = ramda.clone(newState.selectedRoutine.phases);
        clonedPhases.map((phase) => {
          if (phase.id === action.id) {
            const order = phase.segments.length + 1;
            phase.segments.push({
              id: uuidv4(),
              order: order,
              trainingSetTypeId: '',
              secondsRestBetweenSets: 30,
              secondsRestBetweenNextSegment: 60,
              exercises: [],
            });
          }
        });
        newState.selectedRoutine.phases = clonedPhases;
        break;
      }
      default:
        newState = state;
    }

    return newState;
  },
};

export interface RoutineBuilderState {
  activeCardId: string;
  selectedRoutine: RoutineTemplateVO;
}
