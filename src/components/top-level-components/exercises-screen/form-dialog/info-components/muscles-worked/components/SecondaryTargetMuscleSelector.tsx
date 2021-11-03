import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import React, { ChangeEvent } from 'react';
import { Close } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { State } from '../../../../../../../configs/redux/store';
import {
  Link,
  Grid,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import {
  MuscleVO,
  MuscleInfo,
  MuscleTargetTypeVO,
} from 'workout-app-common-core';
import buildOptions from '../../../../../../../utils/build-muscle-selector-options';
import {
  addSecondaryMuscleTarget,
  deleteSecondaryMuscleTarget,
  selectSecondaryMuscle,
  selectSecondaryTargetType,
} from '../../../../../../../creators/exercise-form/exercise-form';

const SecondaryTargetMuscleSelector = (
  props: SecondaryTargetMuscleSelectorProps
): JSX.Element => {
  const { secondaryMuscles, muscles, muscleTargetTypes } = props;

  const options = muscles.map((muscle: MuscleVO) => {
    return buildOptions(muscle);
  });

  const secondaryMusclesLength = secondaryMuscles.length + 1;

  return (
    <Grid container spacing={3}>
      {secondaryMuscles.map((secondary: MuscleInfo, index) => {
        let defaultValue = null;

        muscles.find((muscle: MuscleVO) => {
          if (muscle.id === secondary.muscleId) {
            return (defaultValue = buildOptions(muscle));
          }
        });

        return (
          <Grid
            key={index}
            item
            xs={12}
            container
            alignItems={'center'}
            spacing={1}
          >
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id={`target-type-label-${index}`}>
                  {'Target Type'}
                </InputLabel>
                <Select
                  labelId={`target-type-label-${index}`}
                  id={`target-type-select-${index}`}
                  value={secondary.muscleTargetTypeId}
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    props.selectTargetTypeHandler(
                      secondary.id,
                      event.target.value as string
                    );
                  }}
                >
                  {muscleTargetTypes.map((type, index) => (
                    <MenuItem value={type.id} key={index}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={7}>
              <Autocomplete
                fullWidth
                value={defaultValue}
                id={`secondary-muscles-selector-${index}`}
                options={options.sort(
                  (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                )}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={'Secondary Muscle'}
                    variant={'outlined'}
                  />
                )}
                onChange={(e: ChangeEvent<Record<string, never>>, newValue) => {
                  newValue && props.changeHandler(secondary.id, newValue.id);
                }}
                getOptionSelected={(option, value) => option.id === value.id}
              />
            </Grid>

            <Grid item xs={1}>
              <IconButton onClick={() => props.deleteTargetHandler(secondary)}>
                <Close />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
      <Grid item xs={12}>
        <Link
          component={'button'}
          variant={'body1'}
          onClick={props.addSecondaryTargetHandler}
        >
          {`${secondaryMusclesLength}. Click to add`}
        </Link>
      </Grid>
    </Grid>
  );
};

interface SecondaryTargetMuscleSelectorProps {
  muscles: MuscleVO[];
  secondaryMuscles: MuscleInfo[];
  addSecondaryTargetHandler: () => void;
  muscleTargetTypes: MuscleTargetTypeVO[];
  changeHandler: (secondaryId: string, value: string) => void;
  deleteTargetHandler: (secondaryMuscle: MuscleInfo) => void;
  selectTargetTypeHandler: (secondaryId: string, value: string) => void;
}

const mapStateToProps = (state: State): SecondaryTargetMuscleSelectorProps => {
  return {
    muscles: state.applicationState.workoutConfigurations.muscles,
    muscleTargetTypes:
      state.applicationState.workoutConfigurations.muscleTargetTypes,
    secondaryMuscles:
      state.exerciseFormState.exerciseForm.musclesWorked.secondary,
  } as unknown as SecondaryTargetMuscleSelectorProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch
): SecondaryTargetMuscleSelectorProps =>
  ({
    changeHandler: (secondaryId: string, value: string) => {
      dispatch(selectSecondaryMuscle(secondaryId, value));
    },
    addSecondaryTargetHandler: () => {
      dispatch(addSecondaryMuscleTarget());
    },
    deleteTargetHandler: (secondaryMuscle: MuscleInfo) => {
      dispatch(deleteSecondaryMuscleTarget(secondaryMuscle));
    },
    selectTargetTypeHandler: (secondaryId: string, value: string) => {
      dispatch(selectSecondaryTargetType(secondaryId, value));
    },
  } as unknown as SecondaryTargetMuscleSelectorProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondaryTargetMuscleSelector);
