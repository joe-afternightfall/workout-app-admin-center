import React from 'react';
import {
  Chip,
  Input,
  Select,
  Checkbox,
  MenuItem,
  InputLabel,
  FormControl,
  ListItemText,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import {
  Theme,
  useTheme,
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { WorkoutEquipmentVO } from 'workout-app-common-core';
import { State } from '../../../../../../../configs/redux/store';
import { updateExerciseEquipmentListIds } from '../../../../../../../creators/exercise-form/exercise-form';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      width: '100%',
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

const WorkoutEquipmentSelectMenu = (
  props: WorkoutEquipmentSelectMenuProps
): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  const { workoutEquipmentList, selectedEquipmentIds } = props;

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={'workout-equipment-label'}>
        {'Workout Equipment'}
      </InputLabel>
      <Select
        multiple
        labelId={'workout-equipment-label'}
        id={'workout-equipment-select'}
        value={selectedEquipmentIds}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: ITEM_HEIGHT * 6.5 + ITEM_PADDING_TOP,
              width: 250,
            },
          },
        }}
        onChange={props.selectEquipmentHandler}
        input={<Input id={'workout-equipment-chip'} />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {(selected as string[]).map((value: string) => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
      >
        <MenuItem disabled value={''}>
          <em>{'Equipment List'}</em>
        </MenuItem>
        {workoutEquipmentList.map((equipment) => (
          <MenuItem
            key={equipment.id}
            value={equipment.id}
            style={{
              fontWeight:
                selectedEquipmentIds.indexOf(equipment.name) === -1
                  ? theme.typography.fontWeightRegular
                  : theme.typography.fontWeightMedium,
            }}
          >
            <Checkbox
              checked={selectedEquipmentIds.indexOf(equipment.name) > -1}
            />
            <ListItemText primary={equipment.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

interface WorkoutEquipmentSelectMenuProps {
  selectedEquipmentIds: string[];
  workoutEquipmentList: WorkoutEquipmentVO[];
  selectEquipmentHandler: (
    event: React.ChangeEvent<{ value: unknown }>
  ) => void;
}

const mapStateToProps = (state: State): WorkoutEquipmentSelectMenuProps => {
  return {
    selectedEquipmentIds:
      state.exerciseFormState.exerciseForm.workoutEquipmentIds,
    workoutEquipmentList:
      state.applicationState.workoutConfigurations.workoutEquipment,
  } as unknown as WorkoutEquipmentSelectMenuProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch
): WorkoutEquipmentSelectMenuProps =>
  ({
    selectEquipmentHandler: (event: React.ChangeEvent<{ value: unknown }>) => {
      dispatch(updateExerciseEquipmentListIds(event.target.value as string[]));
    },
  } as unknown as WorkoutEquipmentSelectMenuProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutEquipmentSelectMenu);
