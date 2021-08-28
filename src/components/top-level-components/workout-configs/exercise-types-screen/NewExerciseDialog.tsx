import React from 'react';
import {
  Grid,
  TextField,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import SetTypesMenu from './dialog/SetTypesMenu';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import SelectedMuscleGroupsBox from './dialog/SelectedMuscleGroupsBox';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ManikinFlippableSides from '../../../widgets/muscle-selector/ManikinFlippableSides';
import { SetType } from '../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeDAO';
import { createNewExerciseType } from '../../../../services/workout-configurations/exercise-types-service';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })
);

export default function NewExerciseDialog(
  props: NewExerciseDialogProps
): JSX.Element {
  const classes = useStyles();
  const [selectedMuscleIds, setSelectedMuscleIds] = React.useState<string[]>(
    []
  );
  const [textField, setTextField] = React.useState<string>('');
  const [setType, setSetType] = React.useState<string>('');

  React.useEffect(() => {
    setSelectedMuscleIds(props.selectedMuscleGroupIds);
  });

  const setTypesMenuChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSetType(event.target.value as SetType);
  };

  const textFieldChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextField(event.target.value);
  };

  return (
    <Dialog
      fullWidth
      maxWidth={'md'}
      open={props.open}
      onClose={props.closeClickHandler}
    >
      <DialogTitle disableTypography className={classes.root}>
        <Typography variant={'h6'}>{'New Exercise'}</Typography>

        <IconButton
          aria-label={'close'}
          onClick={props.closeClickHandler}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder={'Enter Name'}
                  onChange={textFieldChange}
                />
              </Grid>

              <Grid item xs={12}>
                <SetTypesMenu
                  value={setType}
                  onChangeHandler={setTypesMenuChange}
                />
              </Grid>

              <SelectedMuscleGroupsBox
                selectedIds={props.selectedMuscleGroupIds}
              />
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <ManikinFlippableSides />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.closeClickHandler}>{'Cancel'}</Button>
        <Button
          disabled={
            textField === '' || selectedMuscleIds.length === 0 || setType === ''
          }
          onClick={() => {
            if (
              setType === SetType.WEIGHTS ||
              setType === SetType.TIME ||
              setType === SetType.TIME_AND_DISTANCE ||
              setType === SetType.REPS ||
              setType === SetType.TIME_AND_REPS
            ) {
              createNewExerciseType(textField, selectedMuscleIds, setType).then(
                () => {
                  props.closeClickHandler();
                }
              );
            }
          }}
        >
          {'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export interface NewExerciseDialogProps {
  open: boolean;
  closeClickHandler: () => void;
  selectedMuscleGroupIds: string[];
}
