import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { State } from '../../../../../configs/redux/store';
import { updateExerciseIconId } from '../../../../../creators/exercise-form/exercise-form';

const ExerciseIconIdTextField = (
  props: ExerciseIconIdTextFieldProps
): JSX.Element => {
  const { iconId } = props;

  return (
    <TextField
      fullWidth
      value={iconId}
      id={'exercise-icon-id'}
      variant={'outlined'}
      label={'Icon ID'}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        props.iconIdChangeHandler(e.target.value);
      }}
    />
  );
};

interface ExerciseIconIdTextFieldProps {
  iconId: string;
  iconIdChangeHandler: (value: string) => void;
}

const mapStateToProps = (state: State): ExerciseIconIdTextFieldProps => {
  return {
    iconId: state.exerciseFormState.exerciseForm.iconId,
  } as unknown as ExerciseIconIdTextFieldProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ExerciseIconIdTextFieldProps =>
  ({
    iconIdChangeHandler: (value: string) => {
      dispatch(updateExerciseIconId(value));
    },
  } as unknown as ExerciseIconIdTextFieldProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExerciseIconIdTextField);
