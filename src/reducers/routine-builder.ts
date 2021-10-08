import { ActionTypes, ApplicationActions } from '../creators/actions';
import { RoutineTemplateVO, WorkoutExercise } from 'workout-app-common-core';
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
        const phaseOrder = newState.selectedRoutine.phases.length + 1;
        const clonedPhases = ramda.clone(newState.selectedRoutine.phases);
        clonedPhases.push({
          id: uuidv4(),
          phaseId: '',
          order: phaseOrder,
          segments: [
            {
              id: uuidv4(),
              order: 1,
              trainingSetTypeId: '',
              secondsRestBetweenSets: -1,
              secondsRestBetweenNextSegment: -1,
              exercises: [],
            },
          ],
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
      case ActionTypes.UPDATE_SEGMENT_EXERCISE: {
        const clonedPhases = ramda.clone(newState.selectedRoutine.phases);
        clonedPhases.map((phase) => {
          phase.segments.map((segment) => {
            if (segment.id === action.segmentId) {
              const order = segment.exercises.length + 1;
              segment.exercises.push({
                id: uuidv4(),
                order: order,
                exerciseId: action.exerciseId,
                sets: [],
              });
            }
          });
        });
        newState.selectedRoutine.phases = clonedPhases;
        break;
      }
      case ActionTypes.ADD_SET_TO_EXERCISE: {
        const clonedPhases = ramda.clone(newState.selectedRoutine.phases);
        clonedPhases.map((phase) => {
          phase.segments.map((segment) => {
            segment.exercises.map((workoutExercise) => {
              if (workoutExercise.id === action.id) {
                const setNumber = workoutExercise.sets.length + 1;
                workoutExercise.sets.push({
                  id: uuidv4(),
                  markedDone: false,
                  setNumber: setNumber,
                  weight: 0,
                  reps: 0,
                });
              }
            });
          });
        });
        newState.selectedRoutine.phases = clonedPhases;
        break;
      }
      case ActionTypes.UPDATE_REST_BETWEEN: {
        const clonedPhases = ramda.clone(newState.selectedRoutine.phases);
        clonedPhases.map((phase) => {
          phase.segments.map((segment) => {
            if (segment.id === action.segmentId) {
              if (action.restType === 'Sets') {
                segment.secondsRestBetweenSets = action.option;
              } else {
                segment.secondsRestBetweenNextSegment = action.option;
              }
            }
          });
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
