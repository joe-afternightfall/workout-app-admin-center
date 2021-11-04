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
import {
  Theme,
  useTheme,
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { ManikinMuscleGroupVO } from 'workout-app-common-core';
import { State } from '../../../../../../../configs/redux/store';
import { getManikinMuscleName } from '../../../../../../../utils/get-name';

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

const ManikinMuscleSelector = (
  props: ManikinMuscleSelectorProps & PassedInProps
): JSX.Element => {
  const { selectedMuscleIds, manikinMuscleGroups, selectMuscleHandler } = props;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={'manikin-muscle-label'}>{'Manikin Muscle'}</InputLabel>
      <Select
        multiple
        labelId={'manikin-muscle-label'}
        id={'manikin-muscle-select'}
        value={selectedMuscleIds}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: ITEM_HEIGHT * 6.5 + ITEM_PADDING_TOP,
              width: 250,
            },
          },
        }}
        onChange={selectMuscleHandler}
        input={<Input id={'manikin-muscle-chip'} />}
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
          <em>{'Muscle List'}</em>
        </MenuItem>
        {manikinMuscleGroups.map((group) => (
          <MenuItem
            key={group.id}
            value={group.id}
            style={{
              fontWeight:
                selectedMuscleIds.indexOf(group.id) === -1
                  ? theme.typography.fontWeightRegular
                  : theme.typography.fontWeightMedium,
            }}
          >
            <Checkbox checked={selectedMuscleIds.indexOf(group.id) > -1} />
            <ListItemText primary={group.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

interface PassedInProps {
  selectedMuscleIds: string[];
  selectMuscleHandler: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

interface ManikinMuscleSelectorProps {
  manikinMuscleGroups: ManikinMuscleGroupVO[];
}

const mapStateToProps = (state: State): ManikinMuscleSelectorProps => {
  return {
    manikinMuscleGroups:
      state.applicationState.workoutConfigurations.manikinMuscleGroups,
  } as unknown as ManikinMuscleSelectorProps;
};

export default connect(mapStateToProps)(ManikinMuscleSelector);
