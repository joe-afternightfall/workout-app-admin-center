import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core';

export default function AlternateCheckboxes(): JSX.Element {
  const [checked, setChecked] = React.useState<'yes' | 'no' | null>(null);

  const handleChange = (selection: 'yes' | 'no') => {
    setChecked(selection);
  };

  return (
    <Grid container alignItems={'center'}>
      <Grid item>
        <Typography>{'Alternate sides:'}</Typography>
      </Grid>
      <Grid item>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked === 'yes'}
                onChange={() => {
                  handleChange('yes');
                }}
                name={'yes-option'}
              />
            }
            label={'Yes'}
            labelPlacement={'bottom'}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checked === 'no'}
                onChange={() => {
                  handleChange('no');
                }}
                name={'no-option'}
              />
            }
            label={'No'}
            labelPlacement={'bottom'}
            color={'textSecondary'}
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
}
