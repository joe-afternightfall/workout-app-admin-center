import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import muscleGroups, {
  BodySection,
  MuscleGroup,
  Muscles,
  SideOfBody,
} from '../../../../../../configs/models/workout-configurations/MuscleGroups';

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

  // todo: use React.useEffect() to set default

  let defaultValue = null;

  muscleGroups.find((group) => {
    if (group.id === selectedMuscleId) {
      return (defaultValue = buildOptions(group));
    }
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
      value={defaultValue}
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
