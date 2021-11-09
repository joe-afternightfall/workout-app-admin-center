import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  ManikinMuscleGroupVO,
  getManikinMuscleName,
} from 'workout-app-common-core';
import { State } from '../../../../../../../configs/redux/store';
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Input,
  Chip,
  Checkbox,
  ListItemText,
} from '@material-ui/core';
import { updateExerciseManikinMuscleGroupIds } from '../../../../../../../creators/exercise-form/exercise-form';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
  })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const ManikinMuscleGroupSelectMenu = (
  props: ManikinMuscleGroupSelectMenuProps
): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  const { selectedGroupIds, manikinMuscleGroups } = props;

  return (
    <FormControl fullWidth className={classes.formControl}>
      <InputLabel id={'manikin-muscle-group-label'}>
        {'Manikin Muscle Group'}
      </InputLabel>
      <Select
        multiple
        labelId={'manikin-muscle-group-label'}
        id={'manikin-muscle-group-select'}
        value={selectedGroupIds}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: ITEM_HEIGHT * 6.5 + ITEM_PADDING_TOP,
              width: 250,
            },
          },
        }}
        onChange={props.selectHandler}
        input={<Input id={'manikin-muscle-group-chip'} />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {(selected as string[]).map((value: string) => {
              const name = getManikinMuscleName(manikinMuscleGroups, value);
              return (
                name && (
                  <Chip key={value} label={name} className={classes.chip} />
                )
              );
            })}
          </div>
        )}
      >
        <MenuItem disabled value={''}>
          <em>{'Manikin Muscle Groups'}</em>
        </MenuItem>
        {manikinMuscleGroups.map((muscle) => (
          <MenuItem
            key={muscle.id}
            value={muscle.id}
            style={{
              fontWeight:
                selectedGroupIds.indexOf(muscle.id) === -1
                  ? theme.typography.fontWeightRegular
                  : theme.typography.fontWeightMedium,
            }}
          >
            <Checkbox checked={selectedGroupIds.indexOf(muscle.id) > -1} />
            <ListItemText primary={muscle.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

interface ManikinMuscleGroupSelectMenuProps {
  selectedGroupIds: string[];
  manikinMuscleGroups: ManikinMuscleGroupVO[];
  selectHandler: (event: React.ChangeEvent<{ value: unknown }>) => void;
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
    selectHandler: (event: React.ChangeEvent<{ value: unknown }>) => {
      dispatch(
        updateExerciseManikinMuscleGroupIds(event.target.value as string[])
      );
    },
  } as unknown as ManikinMuscleGroupSelectMenuProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManikinMuscleGroupSelectMenu);
