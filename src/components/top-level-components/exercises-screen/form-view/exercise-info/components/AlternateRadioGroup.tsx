import React from 'react';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({}));

export default function AlternateRadioGroup(): JSX.Element {
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component={'fieldset'}>
      <FormLabel component={'legend'}>{'Alternate Sides'}</FormLabel>
      <RadioGroup
        value={value}
        name={'alternate-sides-group'}
        onChange={handleRadioChange}
      >
        <FormControlLabel value={'yes'} control={<Radio />} label={'Yes'} />
        <FormControlLabel value={'no'} control={<Radio />} label={'No'} />
      </RadioGroup>
    </FormControl>
  );
}
