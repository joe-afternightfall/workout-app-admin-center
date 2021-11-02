import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { State } from '../../../../../configs/redux/store';
import { updateExerciseName } from '../../../../../creators/exercise-form/exercise-form';

const ExerciseNameTextField = (
  props: ExerciseNameTextFieldProps
): JSX.Element => {
  const { exerciseName } = props;

  return (
    <TextField
      fullWidth
      value={exerciseName}
      id={'exercise-name'}
      variant={'outlined'}
      label={'Exercise Name'}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        props.nameChangeHandler(e.target.value);
      }}
    />
  );
};

interface ExerciseNameTextFieldProps {
  exerciseName: string;
  nameChangeHandler: (value: string) => void;
}

const mapStateToProps = (state: State): ExerciseNameTextFieldProps => {
  return {
    exerciseName: state.exerciseFormState.exerciseForm.name,
  } as unknown as ExerciseNameTextFieldProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ExerciseNameTextFieldProps =>
  ({
    nameChangeHandler: (value: string) => {
      dispatch(updateExerciseName(value));
    },
  } as unknown as ExerciseNameTextFieldProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExerciseNameTextField);
