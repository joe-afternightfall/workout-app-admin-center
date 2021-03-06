import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../configs/redux/store';
import {
  hideAppSnackbar,
  SnackbarCreatorProps,
} from '../../creators/app-snackbar';

const AppSnackbar = (props: AppSnackbarProps): JSX.Element => {
  const { open, snackbarProps } = props;
  const closeHandler = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    props.handleClose();
  };

  return (
    <Snackbar
      onClose={closeHandler}
      autoHideDuration={3000}
      open={open}
      anchorOrigin={{
        vertical: snackbarProps.position.vertical,
        horizontal: snackbarProps.position.horizontal,
      }}
    >
      <Alert
        elevation={6}
        variant={'filled'}
        onClose={props.handleClose}
        severity={snackbarProps.severity}
      >
        {snackbarProps.text}
      </Alert>
    </Snackbar>
  );
};

interface AppSnackbarProps {
  open: boolean;
  snackbarProps: SnackbarCreatorProps;
  handleClose: () => void;
}

const mapStateToProps = (state: State): AppSnackbarProps => {
  return {
    open: state.applicationState.displayAppSnackbar,
    snackbarProps: state.applicationState.snackbarProps,
  } as unknown as AppSnackbarProps;
};

const mapDispatchToProps = (dispatch: Dispatch): AppSnackbarProps =>
  ({
    handleClose: () => {
      dispatch(hideAppSnackbar());
    },
  } as unknown as AppSnackbarProps);

export default connect(mapStateToProps, mapDispatchToProps)(AppSnackbar);
