import {
  Muscles,
  SideOfBody,
  BodySection,
  MuscleGroup,
  muscleGroups,
} from 'workout-app-common-core';
import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

function buildOptions(group: MuscleGroup): {
  id: string;
  sideOfBody: SideOfBody;
  bodySection: BodySection;
  name: Muscles;
  firstLetter: string;
} {
  const firstLetter = group.name[0].toUpperCase();
  return {
    firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
    ...group,
  };
}

export default function MuscleSelector({
  selectedMuscleId,
  changeHandler,
}: MuscleSelectorProps): JSX.Element {
  const options = muscleGroups.map((group: MuscleGroup) => {
    return buildOptions(group);
  });

  let defaultValue = null;

  muscleGroups.find((group) => {
    if (group.id === selectedMuscleId) {
      return (defaultValue = buildOptions(group));
    }
  });

  return (
    <Autocomplete
      fullWidth
      value={defaultValue}
      id={'grouped-muscles'}
      options={options.sort(
        (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
      )}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField {...params} label={'Target Muscle'} variant={'outlined'} />
      )}
      onChange={(e: ChangeEvent<Record<string, never>>, newValue) => {
        newValue && changeHandler(newValue.id);
      }}
      getOptionSelected={(option, value) => option.id === value.id}
    />
  );
}

interface MuscleSelectorProps {
  selectedMuscleId: string | null;
  changeHandler: (value: string) => void;
}
