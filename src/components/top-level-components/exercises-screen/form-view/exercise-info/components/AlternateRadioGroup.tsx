import React from 'react';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function AlternateRadioGroup({
  changeHandler,
  selectedOption,
}: AlternateRadioGroupProps): JSX.Element {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    if (value === 'yes') {
      changeHandler(true);
    } else {
      changeHandler(false);
    }
  };
  let radioValue = '';
  if (selectedOption === true) {
    radioValue = 'yes';
  } else if (selectedOption === false) {
    radioValue = 'no';
  }

  return (
    <FormControl component={'fieldset'}>
      <FormLabel component={'legend'}>{'Alternate Sides'}</FormLabel>
      <RadioGroup
        value={radioValue}
        name={'alternate-sides-group'}
        onChange={handleRadioChange}
      >
        <FormControlLabel value={'yes'} control={<Radio />} label={'Yes'} />
        <FormControlLabel value={'no'} control={<Radio />} label={'No'} />
      </RadioGroup>
    </FormControl>
  );
}

interface AlternateRadioGroupProps {
  selectedOption: boolean | null;
  changeHandler: (value: boolean) => void;
}
