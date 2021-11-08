import React from 'react';
import MuscleGroupsList from './MuscleGroupsList';
import ExerciseSwipeableView from './ExerciseSwipeableView';
import { Button, Dialog, DialogContent, Grid } from '@material-ui/core';

export default function AddExerciseDialog(
  props: AddExerciseDialogProps
): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewChange = (index: number) => {
    setActiveTab(index);
  };

  const handleChangeIndex = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <Button onClick={handleOpen}>{'Add Exercise'}</Button>

      <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'lg'}>
        <DialogContent style={{ padding: '24px 16px 24px 0' }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <MuscleGroupsList
                activeTab={activeTab}
                clickHandler={handleViewChange}
              />
            </Grid>

            <Grid item xs={9}>
              <ExerciseSwipeableView
                workoutCircuitId={props.circuitId}
                closeClickHandler={handleClose}
                selectedIndex={activeTab}
                viewChangeHandler={handleChangeIndex}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface AddExerciseDialogProps {
  circuitId: string;
}
