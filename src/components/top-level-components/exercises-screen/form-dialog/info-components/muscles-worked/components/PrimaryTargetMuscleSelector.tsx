import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid, IconButton, Link, Typography } from '@material-ui/core';
import { State } from '../../../../../../../configs/redux/store';
import {
  selectPrimaryMuscle,
  addPrimaryMuscleTarget,
  deletePrimaryMuscleTarget,
} from '../../../../../../../creators/exercise-form/exercise-form';
import {
  MuscleInfo,
  MuscleTargetTypeVO,
  MuscleVO,
} from 'workout-app-common-core';
import { Close } from '@material-ui/icons';
import buildOptions from '../../../../../../../utils/build-muscle-selector-options';

const PrimaryTargetMuscleSelector = (
  props: PrimaryTargetMuscleSelectorProps
) => {
  const { primaryMuscles, muscles, muscleTargetTypes } = props;

  const options = muscles.map((muscle: MuscleVO) => {
    return buildOptions(muscle);
  });

  const primaryMusclesLength = primaryMuscles.length + 1;
  return (
    <Grid container spacing={3}>
      {primaryMuscles.map((primary, index) => {
        const foundTargetType = muscleTargetTypes.find(
          (targetType) => targetType.id === primary.muscleTargetTypeId
        );

        let defaultValue = null;

        muscles.find((muscle: MuscleVO) => {
          if (muscle.id === primary.muscleId) {
            return (defaultValue = buildOptions(muscle));
          }
        });

        const title =
          foundTargetType &&
          `${primary.order}. ${foundTargetType.name} Muscle:`;
        return (
          foundTargetType && (
            <Grid key={index} item xs={12} container alignItems={'center'}>
              <Grid item xs={4}>
                <Typography>{title}</Typography>
              </Grid>

              <Grid item xs={7}>
                <Autocomplete
                  fullWidth
                  value={defaultValue}
                  id={`primary-muscles-selector-${index}`}
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

              <Grid item xs={1}>
                <IconButton
                  onClick={() => props.deletePrimaryTargetHandler(primary)}
                >
                  <Close />
                </IconButton>
              </Grid>
            </Grid>
          )
        );
      })}
      <Grid item xs={12}>
        <Link
          component={'button'}
          variant={'body1'}
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
  primaryMuscles: MuscleInfo[];
  addPrimaryTargetHandler: () => void;
  muscleTargetTypes: MuscleTargetTypeVO[];
  changeHandler: (primaryId: string, value: string) => void;
  deletePrimaryTargetHandler: (primaryMuscle: MuscleInfo) => void;
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
    deletePrimaryTargetHandler: (primaryMuscle: MuscleInfo) => {
      dispatch(deletePrimaryMuscleTarget(primaryMuscle));
    },
  } as unknown as PrimaryTargetMuscleSelectorProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrimaryTargetMuscleSelector);
