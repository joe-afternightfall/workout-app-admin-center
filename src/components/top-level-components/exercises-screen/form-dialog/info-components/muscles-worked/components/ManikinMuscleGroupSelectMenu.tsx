import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ManikinMuscleGroupVO } from 'workout-app-common-core';
import { State } from '../../../../../../../configs/redux/store';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { updateExerciseManikinMuscleGroup } from '../../../../../../../creators/exercise-form/exercise-form';

const ManikinMuscleGroupSelectMenu = (
  props: ManikinMuscleGroupSelectMenuProps
): JSX.Element => {
  const { selectedGroupIds, manikinMuscleGroups } = props;

  return (
    <FormControl fullWidth>
      <InputLabel id={'manikin-muscle-group-label'}>
        {'Manikin Muscle Group'}
      </InputLabel>
      <Select
        labelId={'manikin-muscle-group-label'}
        id={'manikin-muscle-group-select'}
        value={selectedGroupIds[0]}
        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
          props.selectHandler(event.target.value as string);
        }}
      >
        {manikinMuscleGroups.map(
          (group: ManikinMuscleGroupVO, index: number) => (
            <MenuItem value={group.id} key={index}>
              {group.name}
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
};

interface ManikinMuscleGroupSelectMenuProps {
  selectedGroupIds: ManikinMuscleGroupVO[];
  manikinMuscleGroups: ManikinMuscleGroupVO[];
  selectHandler: (muscleId: string) => void;
}

const mapStateToProps = (state: State): ManikinMuscleGroupSelectMenuProps => {
  return {
    manikinMuscleGroups:
      state.applicationState.workoutConfigurations.manikinMuscleGroups,
    selectedGroupIds:
      state.exerciseFormState.exerciseForm.manikinMuscleGroupIds,
  } as unknown as ManikinMuscleGroupSelectMenuProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch
): ManikinMuscleGroupSelectMenuProps =>
  ({
    selectHandler: (muscleId: string) => {
      dispatch(updateExerciseManikinMuscleGroup(muscleId));
    },
  } as unknown as ManikinMuscleGroupSelectMenuProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManikinMuscleGroupSelectMenu);
