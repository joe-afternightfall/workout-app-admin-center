import { ActionTypes } from './actions';
import {
  ExerciseVO,
  GripTypeVO,
  GripWidthVO,
  ManikinMuscleGroupVO,
  MuscleTargetTypeVO,
  MuscleVO,
  ParameterTypeVO,
  PhaseVO,
  RoutineTemplateVO,
  TrainingSetTypeVO,
  WorkoutCategoryVO,
  WorkoutEquipmentVO,
} from 'workout-app-common-core';

export interface LoadExercisesAction {
  type: ActionTypes.LOAD_EXERCISES;
  exercises: ExerciseVO[];
}

export const loadExercises = (exercises: ExerciseVO[]): LoadExercisesAction => {
  return {
    type: ActionTypes.LOAD_EXERCISES,
    exercises: exercises,
  };
};

export interface LoadRoutineTemplatesAction {
  type: ActionTypes.LOAD_ROUTINE_TEMPLATES;
  routineTemplates: RoutineTemplateVO[];
}

export const loadRoutineTemplates = (
  routineTemplates: RoutineTemplateVO[]
): LoadRoutineTemplatesAction => {
  return {
    type: ActionTypes.LOAD_ROUTINE_TEMPLATES,
    routineTemplates: routineTemplates,
  };
};

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

export interface LoadGripWidthsAction {
  type: ActionTypes.LOAD_GRIP_WIDTHS;
  gripWidths: GripWidthVO[];
}

export const loadGripWidths = (
  gripWidths: GripWidthVO[]
): LoadGripWidthsAction => {
  return {
    type: ActionTypes.LOAD_GRIP_WIDTHS,
    gripWidths: gripWidths,
  };
};

export interface LoadManikinMuscleGroupsAction {
  type: ActionTypes.LOAD_MANIKIN_MUSCLE_GROUP;
  manikinMuscleGroups: ManikinMuscleGroupVO[];
}

export const loadManikinMuscleGroups = (
  manikinMuscleGroups: ManikinMuscleGroupVO[]
): LoadManikinMuscleGroupsAction => {
  return {
    type: ActionTypes.LOAD_MANIKIN_MUSCLE_GROUP,
    manikinMuscleGroups: manikinMuscleGroups,
  };
};

export interface LoadMusclesAction {
  type: ActionTypes.LOAD_MUSCLES;
  muscles: MuscleVO[];
}

export const loadMuscles = (muscles: MuscleVO[]): LoadMusclesAction => {
  return {
    type: ActionTypes.LOAD_MUSCLES,
    muscles: muscles,
  };
};

export interface LoadMuscleTargetTypesAction {
  type: ActionTypes.LOAD_MUSCLE_TARGET_TYPES;
  muscleTargetTypes: MuscleTargetTypeVO[];
}

export const loadMuscleTargetTypes = (
  muscleTargetTypes: MuscleTargetTypeVO[]
): LoadMuscleTargetTypesAction => {
  return {
    type: ActionTypes.LOAD_MUSCLE_TARGET_TYPES,
    muscleTargetTypes: muscleTargetTypes,
  };
};

export interface LoadParameterTypesAction {
  type: ActionTypes.LOAD_PARAMETER_TYPES;
  parameterTypes: ParameterTypeVO[];
}

export const loadParameterTypes = (
  parameterTypes: ParameterTypeVO[]
): LoadParameterTypesAction => {
  return {
    type: ActionTypes.LOAD_PARAMETER_TYPES,
    parameterTypes: parameterTypes,
  };
};

export interface LoadPhasesAction {
  type: ActionTypes.LOAD_PHASES;
  phases: PhaseVO[];
}

export const loadPhases = (phases: PhaseVO[]): LoadPhasesAction => {
  return {
    type: ActionTypes.LOAD_PHASES,
    phases: phases,
  };
};

export interface LoadTrainingSetTypesAction {
  type: ActionTypes.LOAD_TRAINING_SET_TYPES;
  trainingSetTypes: TrainingSetTypeVO[];
}

export const loadTrainingSetTypes = (
  trainingSetTypes: TrainingSetTypeVO[]
): LoadTrainingSetTypesAction => {
  return {
    type: ActionTypes.LOAD_TRAINING_SET_TYPES,
    trainingSetTypes: trainingSetTypes,
  };
};

export interface LoadWorkoutCategoriesAction {
  type: ActionTypes.LOAD_WORKOUT_CATEGORIES;
  workoutCategories: WorkoutCategoryVO[];
}

export const loadWorkoutCategories = (
  workoutCategories: WorkoutCategoryVO[]
): LoadWorkoutCategoriesAction => {
  return {
    type: ActionTypes.LOAD_WORKOUT_CATEGORIES,
    workoutCategories: workoutCategories,
  };
};

export interface LoadWorkoutEquipmentAction {
  type: ActionTypes.LOAD_WORKOUT_EQUIPMENT;
  workoutEquipment: WorkoutEquipmentVO[];
}

export const loadWorkoutEquipment = (
  workoutEquipment: WorkoutEquipmentVO[]
): LoadWorkoutEquipmentAction => {
  return {
    type: ActionTypes.LOAD_WORKOUT_EQUIPMENT,
    workoutEquipment: workoutEquipment,
  };
};
