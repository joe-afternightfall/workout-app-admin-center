import React from 'react';
import {
  Radio,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../../../../configs/redux/store';
import { selectAlternateSidesOption } from '../../../../../creators/exercise-form/exercise-form';

const AlternateRadioGroup = ({
  changeHandler,
  selectedOption,
}: AlternateRadioGroupProps): JSX.Element => {
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
};

interface AlternateRadioGroupProps {
  selectedOption: boolean | null;
  changeHandler: (value: boolean) => void;
}

const mapStateToProps = (state: State): AlternateRadioGroupProps => {
  return {
    selectedOption: state.exerciseFormState.exerciseForm.alternateSides,
  } as unknown as AlternateRadioGroupProps;
};

const mapDispatchToProps = (dispatch: Dispatch): AlternateRadioGroupProps =>
  ({
    changeHandler: (value: boolean) => {
      dispatch(selectAlternateSidesOption(value));
    },
  } as unknown as AlternateRadioGroupProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlternateRadioGroup);
