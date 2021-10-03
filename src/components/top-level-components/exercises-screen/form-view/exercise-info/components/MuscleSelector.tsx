import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import muscleGroups, {
  MuscleGroup,
} from '../../../../../../configs/models/workout-configurations/MuscleGroups';

export default function MuscleSelector({
  selectedMuscleId,
  changeHandler,
}: MuscleSelectorProps): JSX.Element {
  const options = muscleGroups.map((group: MuscleGroup) => {
    const firstLetter = group.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...group,
    };
  });

  return (
    <Autocomplete
      fullWidth
      id={'grouped-muscles'}
      options={options.sort(
        (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
      )}
      // groupBy={(option) => option.bodySection}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField {...params} label={'Target Muscle'} variant={'outlined'} />
      )}
      inputValue={selectedMuscleId}
      onChange={(e: ChangeEvent<Record<string, never>>, newValue) => {
        newValue && changeHandler(newValue.id);
      }}
    />
  );
}

interface MuscleSelectorProps {
  selectedMuscleId: string | undefined;
  changeHandler: (value: string) => void;
}
