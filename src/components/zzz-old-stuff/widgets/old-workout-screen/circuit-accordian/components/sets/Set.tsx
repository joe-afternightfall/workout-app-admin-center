import RepsSet from './types/RepsSet';
import TimedSet from './types/TimedSet';
import React, { ChangeEvent } from 'react';
import { WeightsSet } from './types/WeightsSet';
import SetActionButtons from './SetActionButtons';
import TimeAndRepsSet from './types/TimeAndRepsSet';
import { Grid, Typography } from '@material-ui/core';
import TimeAndDistanceSet from './types/TimeAndDistanceSet';
import { CircuitExerciseSet } from '../../../WorkoutScreen';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { SetType } from '../../../../../../../configs/zzz-old-stuff/old-models/ExerciseTypeDAO';
import { ExerciseTypeVO } from '../../../../../../../configs/zzz-old-stuff/old-models/ExerciseTypeVO';
import {
  UpdateDistanceSetFieldProps,
  UpdateTimeSetFieldProps,
  UpdateWorkoutSetFieldProps,
} from '../../../../../../../creators/zzz-old-stuff/old-creators';

const useStyles = makeStyles(() =>
  createStyles({
    completedRow: {
      background: '#E4F3EC',
    },
  })
);

const REG_EXP = new RegExp('^[0-9]*$');

export default function Set(props: SetProps): JSX.Element {
  const classes = useStyles();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (REG_EXP.test(event.target.value)) {
      const targetName = event.target.name;
      if (targetName === 'weight' || targetName === 'reps') {
        props.updateWorkoutSetFieldHandler({
          circuitId: props.circuitId,
          exerciseId: props.exerciseId,
          setId: props.set.id,
          name: targetName,
          value: event.target.value,
        });
      }
    }
  };

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (REG_EXP.test(event.target.value)) {
      const targetName = event.target.name;

      if (
        targetName === 'hours' ||
        targetName === 'minutes' ||
        targetName === 'seconds'
      ) {
        props.updateTimeSetFieldHandler({
          circuitId: props.circuitId,
          exerciseId: props.exerciseId,
          setId: props.set.id,
          name: targetName,
          value: event.target.value,
        });
      }
    }
  };

  const handleDistanceChange = (name: string, value: string) => {
    if (REG_EXP.test(value) || name === 'unit') {
      if (name === 'value' || name === 'unit') {
        props.updateDistanceSetFieldHandler({
          circuitId: props.circuitId,
          exerciseId: props.exerciseId,
          setId: props.set.id,
          name: name,
          value: value,
        });
      }
    }
  };

  let setComponent: JSX.Element = <div />;

  switch (props.exercise.setType) {
    case SetType.TIME_AND_REPS:
      setComponent = (
        <TimeAndRepsSet
          set={props.set}
          changeHandler={handleChange}
          timeChangeHandler={handleTimeChange}
        />
      );
      break;
    case SetType.TIME:
      setComponent = (
        <TimedSet
          set={props.set}
          changeHandler={handleTimeChange}
          timeChangeHandler={handleTimeChange}
        />
      );
      break;
    case SetType.TIME_AND_DISTANCE:
      setComponent = (
        <TimeAndDistanceSet
          set={props.set}
          changeHandler={handleChange}
          timeChangeHandler={handleTimeChange}
          distanceChangeHandler={handleDistanceChange}
        />
      );
      break;
    case SetType.WEIGHTS:
      setComponent = (
        <WeightsSet set={props.set} changeHandler={handleChange} />
      );
      break;
    case SetType.REPS:
      setComponent = <RepsSet set={props.set} changeHandler={handleChange} />;
      break;
    default:
      break;
  }

  return (
    <Grid
      item
      xs={12}
      container
      alignItems={'center'}
      spacing={2}
      className={props.set.markedDone ? classes.completedRow : ''}
    >
      <Grid item xs={2}>
        <Typography>{props.set.setNumber}</Typography>
      </Grid>

      {setComponent}

      <Grid item xs={4}>
        <SetActionButtons
          deleteSetClickHandler={props.deleteClickHandler}
          toggleExerciseSetHandler={props.toggleExerciseSetHandler}
        />
      </Grid>
    </Grid>
  );
}

interface SetProps {
  circuitId: string;
  exerciseId: string;
  exercise: ExerciseTypeVO;
  set: CircuitExerciseSet;
  deleteClickHandler: () => void;
  toggleExerciseSetHandler: () => void;
  updateWorkoutSetFieldHandler: (props: UpdateWorkoutSetFieldProps) => void;
  updateTimeSetFieldHandler: (props: UpdateTimeSetFieldProps) => void;
  updateDistanceSetFieldHandler: (props: UpdateDistanceSetFieldProps) => void;
}
