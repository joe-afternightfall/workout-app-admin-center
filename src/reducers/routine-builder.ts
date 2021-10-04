import { ActionTypes, ApplicationActions } from '../creators/actions';
import { RoutineTemplateVO } from 'workout-app-common-core';

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
