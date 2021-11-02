import React from 'react';
import { Grid } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

export default function Color(props: ColorProps): JSX.Element {
  return (
    <Grid
      container
      justify={'center'}
      alignItems={'center'}
      style={{ height: '100%' }}
    >
      <CheckIcon
        data-testid={`color-box-${props.color}`}
        style={{ margin: 'auto', color: props.color }}
      />
    </Grid>
  );
}

export interface ColorProps {
  color: string;
}
