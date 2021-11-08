import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { NightfallTooltip } from 'workout-app-common-core';
import CheckIcon from '@material-ui/icons/CheckCircleOutlined';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';

const useStyles = makeStyles(() =>
  createStyles({
    confirmButton: {
      background: '#C9F0DE',
      color: '#008E62',
      '&:hover': {
        background: '#A2EAC9',
      },
    },
    deleteButton: {
      background: '#F5DADB',
      color: '#D41417',
      '&:hover': {
        background: '#F4C3C3',
      },
    },
  })
);

export default function SetActionButtons(
  props: SetActionButtonsProps
): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container alignItems={'center'} justify={'center'} spacing={2}>
      <Grid item>
        <NightfallTooltip
          component={
            <Button
              className={classes.deleteButton}
              onClick={() => {
                props.deleteSetClickHandler();
              }}
            >
              <RemoveIcon />
            </Button>
          }
          title={'Delete Set'}
          placement={'left'}
        />
      </Grid>

      <Grid item>
        <NightfallTooltip
          component={
            <Button
              className={classes.confirmButton}
              onClick={props.toggleExerciseSetHandler}
            >
              <CheckIcon />
            </Button>
          }
          title={'Mark Done'}
          placement={'right'}
        />
      </Grid>
    </Grid>
  );
}

interface SetActionButtonsProps {
  deleteSetClickHandler: () => void;
  toggleExerciseSetHandler: () => void;
}
