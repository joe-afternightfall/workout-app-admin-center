import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { State } from '../../../../../configs/redux/store';
import { updateExerciseDescription } from '../../../../../creators/exercise-form/exercise-form';

const ExerciseDescriptionTextField = (
  props: ExerciseDescriptionTextFieldProps
): JSX.Element => {
  const { description } = props;

  return (
    <TextField
      fullWidth
      value={description}
      id={'exercise-description'}
      multiline
      rows={4}
      variant={'filled'}
      label={'Description'}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        props.descriptionChangeHandler(e.target.value);
      }}
    />
  );
};

interface ExerciseDescriptionTextFieldProps {
  description: string;
  descriptionChangeHandler: (value: string) => void;
}

const mapStateToProps = (state: State): ExerciseDescriptionTextFieldProps => {
  return {
    description: state.exerciseFormState.exerciseForm.description,
  } as unknown as ExerciseDescriptionTextFieldProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch
): ExerciseDescriptionTextFieldProps =>
  ({
    descriptionChangeHandler: (value: string) => {
      dispatch(updateExerciseDescription(value));
    },
  } as unknown as ExerciseDescriptionTextFieldProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExerciseDescriptionTextField);
