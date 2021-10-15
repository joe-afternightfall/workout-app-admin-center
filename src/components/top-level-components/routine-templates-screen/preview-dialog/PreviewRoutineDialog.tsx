import React from 'react';
import {
  Dialog,
  Button,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PreviewList from './components/PreviewList';
import DialogAppBar from './components/DialogAppBar';
import { deepOrange } from '@material-ui/core/colors';
import { routerActions } from 'connected-react-router';
import { RoutineTemplateVO } from 'workout-app-common-core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ROUTINE_BUILDER_SCREEN_PATH } from '../../../../configs/constants/app';
import { viewSelectedRoutine } from '../../../../creators/routine-builder/builder';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editButton: {
      padding: '12px 40px',
      marginRight: 20,
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
  })
);

const PreviewRoutineDialog = (
  props: PreviewRoutineDialogProps & PassedInProps
) => {
  const { open, routineTemplate } = props;
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={props.closeHandler} maxWidth={'sm'} fullWidth>
      {routineTemplate && (
        <DialogAppBar
          name={routineTemplate.name}
          closeHandler={props.closeHandler}
        />
      )}
      <DialogContent>
        <PreviewList routineTemplate={routineTemplate} />
      </DialogContent>
      <DialogActions>
        <Button
          variant={'contained'}
          onClick={() => {
            props.editHandler();
            props.closeHandler();
          }}
          className={classes.editButton}
        >
          {'Edit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface PassedInProps {
  open: boolean;
  closeHandler: () => void;
  routineTemplate: RoutineTemplateVO | undefined;
}

interface PreviewRoutineDialogProps {
  editHandler: () => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): PreviewRoutineDialogProps =>
  ({
    editHandler: () => {
      if (ownProps.routineTemplate !== undefined) {
        dispatch(viewSelectedRoutine(ownProps.routineTemplate));
        dispatch(routerActions.push(ROUTINE_BUILDER_SCREEN_PATH));
      }
    },
  } as unknown as PreviewRoutineDialogProps);

export default connect(null, mapDispatchToProps)(PreviewRoutineDialog);
