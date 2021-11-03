import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid, Link, Typography } from '@material-ui/core';
import { State } from '../../../../../../../configs/redux/store';
import {
  selectPrimaryMuscle,
  addPrimaryMuscleTarget,
} from '../../../../../../../creators/exercise-form/exercise-form';
import { MuscleTargetTypeVO, MuscleVO } from 'workout-app-common-core';

function buildOptions(muscle: MuscleVO): {
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

const PrimaryTargetMuscleSelector = (
  props: PrimaryTargetMuscleSelectorProps
) => {
  const { primaryMuscles, muscles } = props;

  const options = muscles.map((muscle: MuscleVO) => {
    return buildOptions(muscle);
  });

  const primaryMusclesLength = props.primaryMuscles.length + 1;
  return (
    <Grid container spacing={3}>
      {primaryMuscles.map((primary, index) => {
        const foundTargetType = props.muscleTargetTypes.find(
          (targetType) => targetType.id === primary.muscleTargetTypeId
        );

        let defaultValue = null;

        muscles.find((muscle: MuscleVO) => {
          if (muscle.id === primary.muscleId) {
            return (defaultValue = buildOptions(muscle));
          }
        });

        return (
          foundTargetType && (
            <Grid key={index} item xs={12} container>
              <Grid item xs={5}>
                <Typography>{`${foundTargetType.name} Muscle:`}</Typography>
              </Grid>
              <Grid item xs={7}>
                <Autocomplete
                  fullWidth
                  value={defaultValue}
                  id={'grouped-muscles'}
                  options={options.sort(
                    (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                  )}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={'Target Muscle'}
                      variant={'outlined'}
                    />
                  )}
                  onChange={(
                    e: ChangeEvent<Record<string, never>>,
                    newValue
                  ) => {
                    newValue && props.changeHandler(primary.id, newValue.id);
                  }}
                  getOptionSelected={(option, value) => option.id === value.id}
                />
              </Grid>
            </Grid>
          )
        );
      })}
      <Grid item xs={12}>
        <Link
          component={'button'}
          variant={'body2'}
          onClick={props.addPrimaryTargetHandler}
        >
          {`${primaryMusclesLength}. Click to add`}
        </Link>
      </Grid>
    </Grid>
  );
};

interface PrimaryTargetMuscleSelectorProps {
  muscles: MuscleVO[];
  primaryMuscles: {
    id: string;
    muscleTargetTypeId: string;
    muscleId: string;
  }[];
  addPrimaryTargetHandler: () => void;
  muscleTargetTypes: MuscleTargetTypeVO[];
  changeHandler: (primaryId: string, value: string) => void;
}

const mapStateToProps = (state: State): PrimaryTargetMuscleSelectorProps => {
  return {
    muscles: state.applicationState.workoutConfigurations.muscles,
    muscleTargetTypes:
      state.applicationState.workoutConfigurations.muscleTargetTypes,
    primaryMuscles: state.exerciseFormState.exerciseForm.musclesWorked.primary,
  } as unknown as PrimaryTargetMuscleSelectorProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch
): PrimaryTargetMuscleSelectorProps =>
  ({
    changeHandler: (primaryId: string, value: string) => {
      dispatch(selectPrimaryMuscle(primaryId, value));
    },
    addPrimaryTargetHandler: () => {
      dispatch(addPrimaryMuscleTarget());
    },
  } as unknown as PrimaryTargetMuscleSelectorProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrimaryTargetMuscleSelector);
