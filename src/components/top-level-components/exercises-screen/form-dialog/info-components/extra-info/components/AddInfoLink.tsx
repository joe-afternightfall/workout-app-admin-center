import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from '@material-ui/core';
import { State } from '../../../../../../../configs/redux/store';
import { addInfoParagraph } from '../../../../../../../creators/exercise-form/exercise-form';

const AddInfoLink = (props: AddInfoLinkProps): JSX.Element => {
  const { message } = props;
  return (
    <Link
      component={'button'}
      variant={'body1'}
      onClick={props.addInfoClickHandler}
    >
      {message}
    </Link>
  );
};

interface AddInfoLinkProps {
  addInfoClickHandler: () => void;
  message: string;
}
const mapStateToProps = (state: State): AddInfoLinkProps => {
  const infoLength = state.exerciseFormState.exerciseForm.extraInfo
    ? state.exerciseFormState.exerciseForm.extraInfo.length + 1
    : 1;

  return {
    message: `${infoLength}. Click to add`,
  } as unknown as AddInfoLinkProps;
};

const mapDispatchToProps = (dispatch: Dispatch): AddInfoLinkProps =>
  ({
    addInfoClickHandler: () => {
      dispatch(addInfoParagraph());
    },
  } as unknown as AddInfoLinkProps);

export default connect(mapStateToProps, mapDispatchToProps)(AddInfoLink);
