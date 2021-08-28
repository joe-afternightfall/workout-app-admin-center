export type SideOfBody = 'front' | 'back' | 'other';

export type BodySection = 'arms' | 'back' | 'legs' | 'core' | 'other';

export type Muscles =
  | 'biceps'
  | 'deltoids'
  | 'forearms'
  | 'triceps'
  | 'trapezius'
  | 'lats'
  | 'abs'
  | 'obliques'
  | 'pectorals'
  | 'adductors'
  | 'calves'
  | 'hamstrings'
  | 'glutes'
  | 'quads'
  | 'cardio'
  | 'full-body';

export interface MuscleGroup {
  id: string;
  sideOfBody: SideOfBody;
  bodySection: BodySection;
  name: Muscles;
}

const muscleGroups: MuscleGroup[] = [
  // --------- Arms ---------
  {
    id: '1',
    sideOfBody: 'front',
    bodySection: 'arms',
    name: 'biceps',
  },
  {
    id: '2',
    sideOfBody: 'front',
    bodySection: 'arms',
    name: 'deltoids',
  },
  {
    id: '3',
    sideOfBody: 'back',
    bodySection: 'arms',
    name: 'forearms',
  },
  {
    id: '4',
    sideOfBody: 'back',
    bodySection: 'arms',
    name: 'triceps',
  },
  // --------- Back ---------
  {
    id: '5',
    sideOfBody: 'back',
    bodySection: 'back',
    name: 'trapezius',
  },
  {
    id: '6',
    sideOfBody: 'back',
    bodySection: 'back',
    name: 'lats',
  },
  // --------- Core ---------
  {
    id: '7',
    sideOfBody: 'front',
    bodySection: 'core',
    name: 'abs',
  },
  {
    id: '8',
    sideOfBody: 'front',
    bodySection: 'core',
    name: 'obliques',
  },
  {
    id: '9',
    sideOfBody: 'front',
    bodySection: 'core',
    name: 'pectorals',
  },
  // --------- Legs ---------
  {
    id: '10',
    sideOfBody: 'front',
    bodySection: 'legs',
    name: 'adductors',
  },
  {
    id: '11',
    sideOfBody: 'front',
    bodySection: 'legs',
    name: 'quads',
  },
  {
    id: '12',
    sideOfBody: 'back',
    bodySection: 'legs',
    name: 'calves',
  },
  {
    id: '13',
    sideOfBody: 'back',
    bodySection: 'legs',
    name: 'hamstrings',
  },
  {
    id: '14',
    sideOfBody: 'back',
    bodySection: 'legs',
    name: 'glutes',
  },
  // --------- Other ---------
  {
    id: '15',
    sideOfBody: 'other',
    bodySection: 'other',
    name: 'cardio',
  },
  {
    id: '16',
    sideOfBody: 'other',
    bodySection: 'other',
    name: 'full-body',
  },
];

export default muscleGroups;
