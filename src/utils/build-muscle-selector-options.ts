import { MuscleVO } from 'workout-app-common-core';

export default function buildOptions(muscle: MuscleVO): {
  firebaseId: string;
  id: string;
  name: string;
  manikinMuscleGroupId: string;
  active: boolean;
  firstLetter: string;
} {
  const firstLetter = muscle.name[0].toUpperCase();
  return {
    firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
    ...muscle,
  };
}
