import * as ramda from 'ramda';
import { RoutineTemplateVO, sortEntireRoutine } from 'workout-app-common-core';
import { v4 as uuidv4 } from 'uuid';
import { ActionTypes, ApplicationActions } from '../creators/actions';

export default {
  reducer: (
    state: RoutineBuilderState = {} as unknown as RoutineBuilderState,
    action: ApplicationActions
  ): RoutineBuilderState => {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case ActionTypes.BUILD_NEW_ROUTINE:
        newState.newRoutine = action.newRoutine;
        newState.selectedRoutine = action.routine;
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
              secondsRestBetweenSets: 30,
              secondsRestBetweenNextSegment: 60,
              exercises: [],
            },
          ],
        });
        newState.selectedRoutine.phases = sortEntireRoutine(clonedPhases);
        break;
      }
      case ActionTypes.SELECT_PHASE: {
        const clonedPhases = ramda.clone(newState.selectedRoutine.phases);
        clonedPhases.map((phase) => {
          if (phase.id === action.workoutPhaseId) {
            phase.phaseId = action.phaseId;
          }
        });
        newState.selectedRoutine.phases = sortEntireRoutine(clonedPhases);
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
        newState.selectedRoutine.phases = sortEntireRoutine(clonedPhases);
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
        newState.selectedRoutine.phases = sortEntireRoutine(clonedPhases);
        break;
      }
      case ActionTypes.SELECTED_EXERCISE_SLOT_TO_FILL:
        newState.selectedExerciseSlotForSegment = {
          segmentId: action.segmentId,
          order: action.order,
        };
        break;
      case ActionTypes.UPDATE_REST_BETWEEN: {
        const clonedPhases = ramda.clone(newState.selectedRoutine.phases);
        clonedPhases.map((phase) => {
          phase.segments.map((segment) => {
            if (segment.id === action.segmentId) {
              if (action.restType === 'set') {
                segment.secondsRestBetweenSets = action.option;
              } else {
                segment.secondsRestBetweenNextSegment = action.option;
              }
            }
          });
        });
        newState.selectedRoutine.phases = sortEntireRoutine(clonedPhases);
        break;
      }
      case ActionTypes.ADD_EXERCISE_TO_SEGMENT: {
        const clonedPhases = ramda.clone(newState.selectedRoutine.phases);
        const segmentId = newState.selectedExerciseSlotForSegment.segmentId;
        const exerciseOrder = newState.selectedExerciseSlotForSegment.order;

        clonedPhases.map((phase) => {
          phase.segments.map((segment) => {
            if (segment.id === segmentId) {
              segment.exercises.push({
                id: uuidv4(),
                order: exerciseOrder,
                exerciseId: action.exerciseId,
                sets: [],
              });
            }
          });
        });

        newState.selectedExerciseSlotForSegment = {
          segmentId: '',
          order: -1,
        };
        newState.selectedRoutine.phases = sortEntireRoutine(clonedPhases);
        break;
      }
      case ActionTypes.DELETE_EXERCISE_FROM_SEGMENT: {
        const clonedPhases = ramda.clone(newState.selectedRoutine.phases);
        clonedPhases.map((phase) => {
          phase.segments.map((segment) => {
            if (segment.id === action.segmentId) {
              segment.exercises.map((exercise) => {
                if (exercise.exerciseId === action.exerciseId) {
                  const foundIndex = segment.exercises.indexOf(exercise);
                  segment.exercises.splice(foundIndex, 1);
                }
              });
            }
          });
        });
        newState.selectedRoutine.phases = sortEntireRoutine(clonedPhases);
        break;
      }
      case ActionTypes.RESET_SET_TYPE_AND_EXERCISE_INFO: {
        const clonedPhases = ramda.clone(newState.selectedRoutine.phases);
        clonedPhases.map((phase) => {
          phase.segments.map((segment) => {
            if (segment.id === action.segmentId) {
              segment.trainingSetTypeId = '';
              segment.exercises = [];
            }
          });
        });
        newState.selectedRoutine.phases = sortEntireRoutine(clonedPhases);
        break;
      }
      case ActionTypes.ADD_SET_TO_EACH_EXERCISE_IN_SEGMENT: {
        const clonedPhases = ramda.clone(newState.selectedRoutine.phases);
        clonedPhases.map((phase) => {
          phase.segments.map((segment) => {
            if (segment.id === action.segmentId) {
              segment.exercises.map((workoutExercise) => {
                const setNumber = workoutExercise.sets.length + 1;
                workoutExercise.sets.push({
                  id: uuidv4(),
                  markedDone: false,
                  setNumber: setNumber,
                  weight: 0,
                  reps: 0,
                });
              });
            }
          });
        });
        newState.selectedRoutine.phases = sortEntireRoutine(clonedPhases);
        break;
      }
      case ActionTypes.DELETE_SET_FROM_EACH_EXERCISE_IN_SEGMENT: {
        const clonedPhases = ramda.clone(newState.selectedRoutine.phases);
        clonedPhases.map((phase) => {
          phase.segments.map((segment) => {
            if (segment.id === action.segmentId) {
              segment.exercises.map((exercise) => {
                exercise.sets.splice(-1);
              });
            }
          });
        });
        newState.selectedRoutine.phases = sortEntireRoutine(clonedPhases);
        break;
      }
      case ActionTypes.DELETE_SEGMENT_FROM_PHASE: {
        const clonedPhases = ramda.clone(newState.selectedRoutine.phases);
        clonedPhases.map((phase) => {
          phase.segments.map((segment) => {
            if (segment.id === action.segmentId) {
              const foundIndex = phase.segments.indexOf(segment);
              phase.segments.splice(foundIndex, 1);
            }
          });
        });
        newState.selectedRoutine.phases = sortEntireRoutine(clonedPhases);
        break;
      }
      case ActionTypes.REORDER_ROUTINE_PHASES:
        newState.selectedRoutine.phases = action.phases;
        break;
      case ActionTypes.DELETE_PHASE_FROM_ROUTINE: {
        const clonedPhases = ramda.clone(newState.selectedRoutine.phases);
        clonedPhases.map((phase) => {
          if (phase.id === action.phaseId) {
            const foundIndex = clonedPhases.indexOf(phase);
            clonedPhases.splice(foundIndex, 1);
          }
        });
        newState.selectedRoutine.phases = sortEntireRoutine(clonedPhases);
        break;
      }
      case ActionTypes.REORDER_ROUTINE_SEGMENTS: {
        const clonedPhases = ramda.clone(newState.selectedRoutine.phases);
        clonedPhases.map((phase) => {
          if (phase.id === action.phaseId) {
            phase.segments = action.segments;
          }
        });
        newState.selectedRoutine.phases = sortEntireRoutine(clonedPhases);
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
  newRoutine: boolean;
  selectedRoutine: RoutineTemplateVO;
  selectedExerciseSlotForSegment: {
    segmentId: string;
    order: number;
  };
}
