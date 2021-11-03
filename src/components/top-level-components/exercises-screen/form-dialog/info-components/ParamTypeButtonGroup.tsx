import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { ParameterTypeVO } from 'workout-app-common-core';
import { State } from '../../../../../configs/redux/store';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { selectExerciseParamType } from '../../../../../creators/exercise-form/exercise-form';

const ParamTypeButtonGroup = ({
  changeHandler,
  parameterTypes,
  selectedParamType,
}: ParamTypeButtonGroupProps): JSX.Element => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography color={'textPrimary'} variant={'h6'}>
          {'Parameters / Exercise type'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ToggleButtonGroup
          style={{ width: '100%' }}
          exclusive
          value={selectedParamType}
          onChange={(
            event: React.MouseEvent<HTMLElement>,
            paramType: ParameterTypeVO | null
          ) => {
            paramType && changeHandler(paramType);
          }}
        >
          {parameterTypes.map((type: ParameterTypeVO, index: number) => (
            <ToggleButton value={type} key={index} style={{ width: '25%' }}>
              {type.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Grid>
      {selectedParamType && (
        <Grid item xs={12}>
          <Typography color={'textSecondary'}>
            {selectedParamType.description}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

interface ParamTypeButtonGroupProps {
  changeHandler: (paramType: ParameterTypeVO) => void;
  selectedParamType: ParameterTypeVO | null;
  parameterTypes: ParameterTypeVO[];
}

const mapStateToProps = (state: State): ParamTypeButtonGroupProps => {
  const exerciseForm = state.exerciseFormState.exerciseForm;

  const parameterTypes =
    state.applicationState.workoutConfigurations.parameterTypes;
  const selectedParamType = parameterTypes.find(
    (param) => param.id === exerciseForm.parameterTypeId
  );
  return {
    selectedParamType: selectedParamType,
    parameterTypes: parameterTypes,
  } as unknown as ParamTypeButtonGroupProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ParamTypeButtonGroupProps =>
  ({
    changeHandler: (paramType: ParameterTypeVO) => {
      dispatch(selectExerciseParamType(paramType));
    },
  } as unknown as ParamTypeButtonGroupProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParamTypeButtonGroup);
