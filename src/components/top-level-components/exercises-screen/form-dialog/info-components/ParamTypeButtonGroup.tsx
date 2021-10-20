import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { ParameterType, parameterTypes } from 'workout-app-common-core';

export default function ParamTypeButtonGroup({
  changeHandler,
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
            paramType: ParameterType | null
          ) => {
            paramType && changeHandler(paramType);
          }}
        >
          {parameterTypes.map((type: ParameterType, index: number) => (
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

export interface ParamTypeButtonGroupProps {
  changeHandler: (paramType: ParameterType) => void;
  selectedParamType: ParameterType | null;
}
