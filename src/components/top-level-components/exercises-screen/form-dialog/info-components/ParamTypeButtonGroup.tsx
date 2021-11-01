import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { ParameterTypeVO } from 'workout-app-common-core';

export default function ParamTypeButtonGroup({
  changeHandler,
  parameterTypes,
  selectedParamType,
}: ParamTypeButtonGroupProps): JSX.Element {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography color={'textPrimary'}>
          {'Parameters / Exercise type'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ToggleButtonGroup
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
            <ToggleButton value={type} key={index}>
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
}

interface ParamTypeButtonGroupProps {
  changeHandler: (paramType: ParameterTypeVO) => void;
  selectedParamType: ParameterTypeVO | null;
  parameterTypes: ParameterTypeVO[];
}
