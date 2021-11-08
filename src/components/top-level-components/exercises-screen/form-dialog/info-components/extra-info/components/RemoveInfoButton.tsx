import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { Grid, IconButton } from '@material-ui/core';
import { removeInfo } from '../../../../../../../creators/exercise-form/exercise-form';

const RemoveInfoButton = (
  props: RemoveInfoButtonProps & PassedInProps
): JSX.Element => {
  return (
    <Grid item xs={2} container justify={'center'} alignItems={'center'}>
      <IconButton onClick={props.removeInfoClickHandler}>
        <CloseIcon />
      </IconButton>
    </Grid>
  );
};

interface PassedInProps {
  infoId: string;
}

interface RemoveInfoButtonProps {
  removeInfoClickHandler: () => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): RemoveInfoButtonProps =>
  ({
    removeInfoClickHandler: () => {
      dispatch(removeInfo(ownProps.infoId));
    },
  } as unknown as RemoveInfoButtonProps);

export default connect(null, mapDispatchToProps)(RemoveInfoButton);
